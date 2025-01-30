// backend/src/routes/analytics.route.js
import express from 'express';
import { trackEvent, getDashboardData } from '../controllers/analytics.controller.js';
import { protectAdminRoute } from '../middleware/auth.middleware.js';


const router = express.Router();

router.post('/track', trackEvent);

// In backend/src/routes/analytics.route.js
router.get('/dashboard', protectAdminRoute, getDashboardData);

export default router;