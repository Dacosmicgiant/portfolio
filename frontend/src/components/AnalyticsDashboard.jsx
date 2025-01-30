import React, { useState, useEffect } from 'react';
import { axiosInstance } from "../lib/axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Loader } from "lucide-react";

const AnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    pageViews: [],
    eventTypes: [],
    topPages: [],
    userActivity: []
  });

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/analytics/dashboard');
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <Loader className="animate-spin h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-8">Analytics Dashboard</h2>
      
      {/* Unique Page Views Chart */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Unique Visitors Over Time</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.pageViews}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="uniqueViews" 
                  stroke="#3b82f6" 
                  name="Unique Visitors"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Event Types */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Unique Users per Event Type</h2>
          <div className="space-y-2">
            {analytics.eventTypes.map((event, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-gray-100 rounded">
                <span className="font-medium">{event.type}</span>
                <span className="text-gray-600">{event.uniqueUsers} unique users</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Pages */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Pages by Unique Visitors</h2>
          <div className="space-y-2">
            {analytics.topPages.map((page, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-gray-100 rounded">
                <span className="font-medium">{page.page}</span>
                <span className="text-gray-600">{page.uniqueVisits} unique visitors</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Latest Activity per Unique Visitor</h2>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {analytics.userActivity.slice(0, 5).map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-100 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <div className="flex-1">
                  <p className="font-medium">{activity.eventType}</p>
                  <p className="text-sm text-gray-600">{activity.page}</p>
                </div>
                <time className="text-sm text-gray-500">
                  {new Date(activity.timestamp).toLocaleString()}
                </time>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
