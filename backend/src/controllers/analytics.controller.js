// backend/src/controllers/analytics.controller.js
import Analytics from '../models/analytics.model.js';

export const trackEvent = async (req, res) => {
  try {
    const { eventType, page, element } = req.body;
    
    const analyticsEntry = new Analytics({
      userId: req.user?._id,
      eventType,
      page,
      element,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });

    await analyticsEntry.save();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};