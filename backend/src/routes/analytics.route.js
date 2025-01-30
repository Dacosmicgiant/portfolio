// backend/src/routes/analytics.route.js
import express from 'express';
import { trackEvent } from '../controllers/analytics.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/track', authMiddleware, trackEvent);

export default router;