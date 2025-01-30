// backend/src/models/analytics.model.js
import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  eventType: { type: String, required: true }, // e.g., 'page_view', 'button_click'
  page: String,
  element: String,
  ipAddress: String,
  userAgent: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Analytics', analyticsSchema);