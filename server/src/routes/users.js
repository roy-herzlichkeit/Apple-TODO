import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';
import { emailService } from '../services/emailService.js';

const router = express.Router();

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5,
    message: {
        message: 'Too many login attempts, please try again in 15 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

router.post('/register', authLimiter, async (req, res) => {
    try {
        let { username, email, password } = req.body;

        username = username?.toString().trim();
        email = email?.toString().trim().toLowerCase();
        password = password?.toString();

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required' });
        }

        if (username.length < 3 || username.length > 20) {
            return res.status(400).json({ message: 'Username must be between 3 and 20 characters' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const existingUser = await User.findOne({ 
            $or: [{ email }, { username }] 
        });
        
        if (existingUser) {
            return res.status(400).json({ 
                message: 'User with this email or username already exists' 
            });
        }

        const user = new User({ username, email, password });
        const otp = emailService.generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); 
        user.emailVerificationOTP = otp;
        user.otpExpiry = otpExpiry;
        
        await user.save();

        const emailSent = await emailService.sendOTPEmail(email, username, otp);
        
        if (!emailSent) {
            await User.findByIdAndDelete(user._id);
            return res.status(500).json({ 
                message: 'Failed to send verification email. Please try again.' 
            });
        }

        res.status(201).json({
            message: 'Registration successful! Please check your email for verification code.',
            userId: user._id,
            email: user.email,
            requiresVerification: true
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// OTP Verification endpoint
router.post('/verify-otp', authLimiter, async (req, res) => {
    try {
        let { userId, otp } = req.body;
        
        // Sanitize inputs
        userId = userId?.toString().trim();
        otp = otp?.toString().trim();

        if (!userId || !otp) {
            return res.status(400).json({ 
                message: 'User ID and OTP are required' 
            });
        }

        if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
            return res.status(400).json({ 
                message: 'OTP must be a 6-digit number' 
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ 
                message: 'User not found' 
            });
        }

        if (user.isEmailVerified) {
            return res.status(400).json({ 
                message: 'Email already verified' 
            });
        }

        if (user.otpAttempts >= 5) {
            return res.status(429).json({ 
                message: 'Too many failed attempts. Please request a new OTP.' 
            });
        }

        if (!user.otpExpiry || new Date() > user.otpExpiry) {
            return res.status(400).json({ 
                message: 'OTP has expired. Please request a new one.' 
            });
        }

        if (user.emailVerificationOTP !== otp) {
            user.otpAttempts += 1;
            await user.save();
            
            return res.status(400).json({ 
                message: `Invalid OTP. ${5 - user.otpAttempts} attempts remaining.` 
            });
        }

        user.isEmailVerified = true;
        user.emailVerificationOTP = null;
        user.otpExpiry = null;
        user.otpAttempts = 0;
        await user.save();

        await emailService.sendWelcomeEmail(user.email, user.username);

        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Email verified successfully!',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                isEmailVerified: user.isEmailVerified
            }
        });

    } catch (error) {
        console.error('OTP verification error:', error);
        res.status(500).json({ message: 'Server error during verification' });
    }
});

router.post('/resend-otp', authLimiter, async (req, res) => {
    try {
        let { userId } = req.body;
        userId = userId?.toString().trim();

        if (!userId) {
            return res.status(400).json({ 
                message: 'User ID is required' 
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ 
                message: 'User not found' 
            });
        }

        if (user.isEmailVerified) {
            return res.status(400).json({ 
                message: 'Email already verified' 
            });
        }

        const otp = emailService.generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        
        user.emailVerificationOTP = otp;
        user.otpExpiry = otpExpiry;
        user.otpAttempts = 0; 
        await user.save();

        const emailSent = await emailService.sendOTPEmail(user.email, user.username, otp);
        
        if (!emailSent) {
            return res.status(500).json({ 
                message: 'Failed to send verification email. Please try again.' 
            });
        }

        res.json({
            message: 'New verification code sent to your email!'
        });

    } catch (error) {
        console.error('Resend OTP error:', error);
        res.status(500).json({ message: 'Server error during resend' });
    }
});

router.post('/login', authLimiter, async (req, res) => {
    try {
        let { username, password } = req.body;

        username = username?.toString().trim();
        password = password?.toString();

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        if (username.length < 3 || password.length < 6) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        if (!user.isEmailVerified) {
            return res.status(403).json({ 
                message: 'Please verify your email before logging in',
                requiresVerification: true,
                userId: user._id
            });
        }

        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json({
            id: user._id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({ message: 'Server error fetching profile' });
    }
});

export default router;