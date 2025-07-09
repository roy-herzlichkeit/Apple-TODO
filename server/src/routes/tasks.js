import express from 'express';
import { verifyFirebaseToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verifyFirebaseToken, (req, res) => {
    res.json({
        success: true,
        tasks: [],
        message: 'Tasks endpoint - to be implemented with database'
    });
});

router.post('/', verifyFirebaseToken, (req, res) => {
    res.json({
        success: true,
        message: 'Create task endpoint - to be implemented'
    });
});

router.put('/:taskId', verifyFirebaseToken, (req, res) => {
    res.json({
        success: true,
        message: 'Update task endpoint - to be implemented'
    });
});

router.delete('/:taskId', verifyFirebaseToken, (req, res) => {
    res.json({
        success: true,
        message: 'Delete task endpoint - to be implemented'
    });
});

export default router;