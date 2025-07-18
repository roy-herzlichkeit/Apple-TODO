import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    status: {
        type: Boolean,
        default: true 
    },
    remTime: {
        type: Date,
        required: true
    },
    importance: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    urgency: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    priority: {
        type: Number,
        required: true,
        min: 1,
        max: 4
    },
    color: {
        type: String,
        required: true,
        default: '#2a2727'
    },
    userId: {
        type: String,
        required: true,
        default: 'tester' 
    }
}, {
    timestamps: true
});

taskSchema.index({ userId: 1, status: 1 });
taskSchema.index({ userId: 1, priority: 1 });

const Task = mongoose.model('Task', taskSchema);

export default Task;