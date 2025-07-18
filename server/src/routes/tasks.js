import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({ userId: 'tester' }).sort({ createdAt: -1 });
        res.json({
            success: true,
            tasks: tasks
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching tasks'
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, remTime, importance, urgency, priority, color } = req.body;
        
        if (!title || !remTime || !importance || !urgency || !priority) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        const task = new Task({
            title,
            remTime: new Date(remTime),
            importance,
            urgency,
            priority,
            color: color || '#2a2727',
            userId: 'tester'
        });

        const savedTask = await task.save();
        res.status(201).json({
            success: true,
            task: savedTask
        });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating task'
        });
    }
});

router.put('/:taskId', async (req, res) => {
    try {
        const { taskId } = req.params;
        const updates = req.body;
        
        if (updates.remTime) {
            updates.remTime = new Date(updates.remTime);
        }

        const task = await Task.findOneAndUpdate(
            { _id: taskId, userId: 'tester' },
            updates,
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        res.json({
            success: true,
            task: task
        });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating task'
        });
    }
});

router.delete('/:taskId', async (req, res) => {
    try {
        const { taskId } = req.params;
        
        const task = await Task.findOneAndDelete({ _id: taskId, userId: 'tester' });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        res.json({
            success: true,
            message: 'Task deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting task'
        });
    }
});

export default router;