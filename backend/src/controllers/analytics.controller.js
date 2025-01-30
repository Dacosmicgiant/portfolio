// backend/src/controllers/analytics.controller.js
import { Analytics } from '../models/analytics.model.js';

import geoip from 'geoip-lite';

// backend/src/controllers/analytics.controller.js
export const trackEvent = async (req, res) => {
    try {
      const { eventType, page, element, latitude, longitude } = req.body;
      let locationData = {};
      
      if (latitude && longitude) {
        // Use the provided coordinates
        locationData = {
          latitude,
          longitude,
          source: 'browser'
        };
      } else {
        // Fallback to IP-based location
        const ip = req.ip.replace('::ffff:', '');
        const geo = geoip.lookup(ip);
        locationData = {
          country: geo?.country || 'Unknown',
          region: geo?.region || 'Unknown',
          city: geo?.city || 'Unknown',
          source: 'ip'
        };
      }
      
      const analyticsEntry = new Analytics({
        userId: req.user?._id,
        eventType,
        page,
        element,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
        location: locationData
      });
  
      await analyticsEntry.save();
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

export const getDashboardData = async (req, res) => {
  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

    // Get unique page views over time
    const uniquePageViews = await Analytics.aggregate([
      {
        $match: {
          eventType: 'page_view',
          timestamp: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
            ipAddress: "$ipAddress"
          }
        }
      },
      {
        $group: {
          _id: "$_id.date",
          uniqueViews: { $sum: 1 },
        }
      },
      {
        $project: {
          date: "$_id",
          uniqueViews: 1,
          _id: 0
        }
      },
      { $sort: { date: 1 } }
    ]);

    // Get unique visitors per page
    const uniquePageVisitors = await Analytics.aggregate([
      {
        $match: {
          eventType: 'page_view'
        }
      },
      {
        $group: {
          _id: {
            page: "$page",
            ipAddress: "$ipAddress"
          }
        }
      },
      {
        $group: {
          _id: "$_id.page",
          uniqueVisits: { $sum: 1 }
        }
      },
      {
        $project: {
          page: "$_id",
          uniqueVisits: 1,
          _id: 0
        }
      },
      { $sort: { uniqueVisits: -1 } },
      { $limit: 5 }
    ]);

    // Get event type distribution (unique users per event type)
    const eventTypes = await Analytics.aggregate([
      {
        $group: {
          _id: {
            eventType: "$eventType",
            ipAddress: "$ipAddress"
          }
        }
      },
      {
        $group: {
          _id: "$_id.eventType",
          uniqueUsers: { $sum: 1 }
        }
      },
      {
        $project: {
          type: "$_id",
          uniqueUsers: 1,
          _id: 0
        }
      }
    ]);

    // Get visitors by country
    const visitorsByCountry = await Analytics.aggregate([
        {
          $group: {
            _id: {
              country: "$location.country",
              ipAddress: "$ipAddress"
            }
          }
        },
        {
          $group: {
            _id: "$_id.country",
            uniqueVisitors: { $sum: 1 }
          }
        },
        {
          $project: {
            country: "$_id",
            uniqueVisitors: 1,
            _id: 0
          }
        },
        { $sort: { uniqueVisitors: -1 } }
      ]);
  
      // Get visitors by city
      const visitorsByCity = await Analytics.aggregate([
        {
          $group: {
            _id: {
              country: "$location.country",
              region: "$location.region",
              city: "$location.city",
              ipAddress: "$ipAddress"
            }
          }
        },
        {
          $group: {
            _id: {
              country: "$_id.country",
              region: "$_id.region",
              city: "$_id.city"
            },
            uniqueVisitors: { $sum: 1 }
          }
        },
        {
          $project: {
            location: "$_id",
            uniqueVisitors: 1,
            _id: 0
          }
        },
        { $sort: { uniqueVisitors: -1 } },
        { $limit: 10 }
      ]);

      // Get recent unique user activity
    // Add location data to user activity
    const userActivity = await Analytics.aggregate([
        {
          $sort: { timestamp: -1 }
        },
        {
          $group: {
            _id: "$ipAddress",
            lastActivity: { $first: "$$ROOT" }
          }
        },
        {
          $replaceRoot: { newRoot: "$lastActivity" }
        },
        {
          $limit: 10
        }
      ]);

      res.json({
        pageViews: uniquePageViews, // from previous code
        eventTypes, // from previous code
        topPages: uniquePageVisitors, // from previous code
        userActivity,
        visitorsByCountry,
        visitorsByCity
      });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };