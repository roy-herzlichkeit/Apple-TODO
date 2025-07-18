import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/users.js';
import taskRoutes from './routes/tasks.js';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'amarTasks'
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://amartasks.onrender.com',
        process.env.CLIENT_URL
    ].filter(Boolean),
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'AmarTasks Server is running!',
        timestamp: new Date().toISOString()
    });
});

app.get('/api', (req, res) => {
    res.json({ message: 'AmarTasks API v1.0' });
});

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.use('*', (req, res) => {
    res.status(404).json({ 
        error: 'Route not found',
        message: `${req.method} ${req.originalUrl} not found`
    });
});

app.use((error, req, res, next) => {
    console.error('Server Error:', error);
    res.status(500).json({ 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});