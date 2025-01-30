// backend/src/models/analytics.model.js

import mongoose from 'mongoose';  // Add this line to import mongoose

const analyticsSchema = new mongoose.Schema({
    // ... existing fields ...
    location: {
      country: String,
      region: String,
      city: String,
      latitude: Number,
      longitude: Number,
      source: {
        type: String,
        enum: ['ip', 'browser', 'manual'],
        default: 'ip'
      }
    }
  });

  const Analytics = mongoose.model('Analytics', analyticsSchema);

export { Analytics };  // Named export