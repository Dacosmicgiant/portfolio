import React, { useState, useEffect } from 'react';
import { axiosInstance } from "../lib/axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Loader } from "lucide-react";
import { Globe, MapPin } from "lucide-react";

const AnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    pageViews: [],
    eventTypes: [],
    topPages: [],
    userActivity: [],
    visitorsByCountry: [],
    visitorsByCity: []
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
    <div className="space-y-6 p-6">
      <h2 className="text-3xl font-bold mb-8">Analytics Dashboard</h2>
      
      {/* Unique Page Views Chart */}
      <div className="card bg-base-100 shadow-md p-4">
        <h3 className="text-lg font-semibold mb-2">Unique Visitors Over Time</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analytics.pageViews}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="uniqueViews" stroke="#3b82f6" name="Unique Visitors" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Visitors by Country */}
      <div className="card bg-base-100 shadow-md p-4">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
          <Globe className="h-5 w-5" /> Visitors by Country
        </h3>
        <div className="space-y-2">
          {analytics.visitorsByCountry.map((country, index) => (
            <div key={index} className="flex justify-between p-2 bg-gray-100 rounded">
              <span className="font-medium">{country.country}</span>
              <span className="text-gray-600">{country.uniqueVisitors} unique visitors</span>
            </div>
          ))}
        </div>
      </div>

      {/* Visitors by City */}
      <div className="card bg-base-100 shadow-md p-4">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
          <MapPin className="h-5 w-5" /> Top Cities
        </h3>
        <div className="space-y-2">
          {analytics.visitorsByCity.map((city, index) => (
            <div key={index} className="flex justify-between p-2 bg-gray-100 rounded">
              <div className="flex flex-col">
                <span className="font-medium">{city.location.city}</span>
                <span className="text-sm text-gray-500">{city.location.region}, {city.location.country}</span>
              </div>
              <span className="text-gray-600">{city.uniqueVisitors} unique visitors</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
