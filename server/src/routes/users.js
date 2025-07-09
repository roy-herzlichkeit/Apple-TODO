import express from 'express';
import { verifyFirebaseToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/me', verifyFirebaseToken, (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
});

router.put('/profile', verifyFirebaseToken, (req, res) => {
    res.json({
        success: true,
        message: 'Profile update endpoint - to be implemented'
    });
});

export default router;