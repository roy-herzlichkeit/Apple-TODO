import nodemailer from 'nodemailer';
import crypto from 'crypto';

class EmailService {
    constructor() {
    }
    
    initTransporter() {
        if (this.transporter) return this.transporter;
        
        console.log('=== EMAIL CONFIGURATION DEBUG ===');
        console.log('EMAIL_USER:', process.env.EMAIL_USER);
        console.log('EMAIL_PASS defined:', !!process.env.EMAIL_PASS);
        console.log('EMAIL_PASS length:', process.env.EMAIL_PASS?.length);
        console.log('EMAIL_PASS (first 4 chars):', process.env.EMAIL_PASS?.substring(0, 4) + '****');
        
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS?.replace(/\s/g, '') 
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        
        console.log('Transporter created successfully');
        console.log('=== END EMAIL DEBUG ===');
        
        return this.transporter;
    }

    generateOTP() {
        return crypto.randomInt(100000, 999999).toString(); 
    }

    async sendOTPEmail(email, username, otp) {
        try {
            const transporter = this.initTransporter();
            
            console.log('Attempting to send OTP email to:', email);
            console.log('Using email service:', process.env.EMAIL_USER);
            
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'AmarTasks - Email Verification',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #2a2727;">Welcome to আমার Tasks!</h2>
                        <p>Hi ${username},</p>
                        <p>Thank you for registering with AmarTasks. Please use the following OTP to verify your email address:</p>
                        
                        <div style="background-color: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
                            <h1 style="color: #2a2727; font-size: 32px; margin: 0; letter-spacing: 5px;">
                                ${otp}
                            </h1>
                        </div>
                        
                        <p><strong>This OTP will expire in 10 minutes.</strong></p>
                        <p>If you didn't request this verification, please ignore this email.</p>
                        
                        <hr style="margin: 30px 0;">
                        <p style="color: #666; font-size: 12px;">
                            This is an automated email from AmarTasks. Please do not reply to this email.
                        </p>
                    </div>
                `
            };

            const result = await transporter.sendMail(mailOptions);
            console.log('OTP email sent successfully:', result.messageId);
            return true;
        } catch (error) {
            console.error('Failed to send OTP email - Detailed error:', error);
            return false;
        }
    }

    async sendWelcomeEmail(email, username) {
        try {
            const transporter = this.initTransporter();
            
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Welcome to AmarTasks!',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #2a2727;">Welcome to আমার Tasks!</h2>
                        <p>Hi ${username},</p>
                        <p>Your email has been successfully verified! You can now start using AmarTasks to manage your tasks effectively.</p>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${process.env.CLIENT_URL}/login" 
                               style="background-color: #2a2727; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
                                Start Managing Tasks
                            </a>
                        </div>
                        
                        <p>Happy task managing!</p>
                        <p>Herzlichkeit</p>
                    </div>
                `
            };

            await transporter.sendMail(mailOptions);
            console.log('Welcome email sent successfully');
            return true;
        } catch (error) {
            console.error('Failed to send welcome email:', error);
            return false;
        }
    }
}

export const emailService = new EmailService();
