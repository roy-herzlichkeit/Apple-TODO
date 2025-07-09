import { 
    signInWithPopup, 
    signOut, 
    onAuthStateChanged 
} from "firebase/auth";
import { auth, googleProvider } from "./config";

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return {
            success: true,
            user: result.user,
            error: null
        };
    } catch (error) {
        console.error("Authentication error:", error);
        return {
            success: false,
            user: null,
            error: error.message
        };
    }
};

export const logOut = async () => {
    try {
        await signOut(auth);
        return { success: true, error: null };
    } catch (error) {
        console.error("Sign out error:", error);
        return { success: false, error: error.message };
    }
};

export const onAuthStateChange = (callback) => {
    return onAuthStateChanged(auth, callback);
};

export const getCurrentUser = () => {
    return auth.currentUser;
};

export default {
    signInWithGoogle,
    logOut,
    onAuthStateChange,
    getCurrentUser
};