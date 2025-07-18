import express from 'express';

const router = express.Router();

router.get('/me', (req, res) => {
    res.json({
        success: true,
        user: { id: 'user123', name: 'User', email: 'user@example.com' }
    });
});

router.put('/profile', (req, res) => {
    res.json({
        success: true,
        message: 'Profile update endpoint - to be implemented'
    });
});

export default router;