import admin from 'firebase-admin';

if (!admin.apps.length) {
    try {
        const firebaseConfig = {
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
        };

        if (!firebaseConfig.projectId || !firebaseConfig.clientEmail || !firebaseConfig.privateKey || firebaseConfig.privateKey.includes('TODO_ADD_YOUR_PRIVATE_KEY_HERE')) {
            console.warn('⚠️  Firebase Admin credentials not properly configured. Auth middleware will be disabled.');
            console.warn('📋 To enable authentication:');
            console.warn('   1. Go to Firebase Console > Project Settings > Service Accounts');
            console.warn('   2. Generate a new private key');
            console.warn('   3. Update server/.env with the credentials');
        } else {
            admin.initializeApp({
                credential: admin.credential.cert(firebaseConfig)
            });
            console.log('✅ Firebase Admin initialized successfully');
        }
    } catch (error) {
        console.warn('⚠️  Failed to initialize Firebase Admin:', error.message);
        console.warn('📋 Authentication middleware will be disabled until Firebase is properly configured.');
    }
}

export const verifyFirebaseToken = async (req, res, next) => {
    try {
        if (!admin.apps.length) {
            return res.status(500).json({ 
                error: 'Server Configuration Error',
                message: 'Firebase Admin not initialized. Please check server configuration.' 
            });
        }

        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                error: 'Unauthorized',
                message: 'No token provided' 
            });
        }

        const token = authHeader.split('Bearer ')[1];
        const decodedToken = await admin.auth().verifyIdToken(token);
        
        req.user = {
            uid: decodedToken.uid,
            email: decodedToken.email,
            name: decodedToken.name,
            picture: decodedToken.picture
        };
        
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ 
            error: 'Unauthorized',
            message: 'Invalid token' 
        });
    }
};

export const devAuthMiddleware = (req, res, next) => {
    if (process.env.NODE_ENV !== 'development') {
        return res.status(403).json({ 
            error: 'Forbidden',
            message: 'Development auth middleware only available in development mode' 
        });
    }
    
    console.log('🚧 Using development auth bypass - DO NOT use in production!');
    
    req.user = {
        uid: 'dev-user-123',
        email: 'dev@example.com',
        name: 'Development User',
        picture: null
    };
    
    next();
};

export default { verifyFirebaseToken, devAuthMiddleware };