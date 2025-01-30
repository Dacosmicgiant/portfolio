// backend/src/models/analytics.model.js
import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  eventType: { type: String, required: true },
  page: String,
  element: String,
  ipAddress: String,
  userAgent: String,
  location: {
    country: String,
    region: String,
    city: String
  },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Analytics', analyticsSchema);