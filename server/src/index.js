import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import userRoutes from './routes/users.js';
import taskRoutes from './routes/tasks.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '../.env');
console.log('Looking for .env file at:', envPath);
console.log('File exists:', fs.existsSync(envPath));

dotenv.config({ path: envPath });

console.log('Environment variables loaded:');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS defined:', !!process.env.EMAIL_PASS);

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