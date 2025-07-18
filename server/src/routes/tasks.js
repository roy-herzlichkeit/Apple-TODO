import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        success: true,
        tasks: [],
        message: 'Tasks endpoint - to be implemented with database'
    });
});

router.post('/', (req, res) => {
    res.json({
        success: true,
        message: 'Create task endpoint - to be implemented'
    });
});

router.put('/:taskId', (req, res) => {
    res.json({
        success: true,
        message: 'Update task endpoint - to be implemented'
    });
});

router.delete('/:taskId', (req, res) => {
    res.json({
        success: true,
        message: 'Delete task endpoint - to be implemented'
    });
});

export default router;