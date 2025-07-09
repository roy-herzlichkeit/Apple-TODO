import { useParams } from 'react-router-dom';
import { signInWithGoogle, logOut } from '../firebase/auth';
import { useAuthContext } from '../context/AuthContext';

export const useUsername = () => {
  const { username } = useParams();
  const { user } = useAuthContext();
  return username || user?.displayName?.toLowerCase().replace(/\s+/g, '') || user?.email?.split('@')[0] || 'user';
};

export const useAuth = () => {
  const { user, loading, isAuthenticated } = useAuthContext();

  const login = async () => {
    try {
      const result = await signInWithGoogle();
      if (result.success) {
        return { success: true, user: result.user };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      const result = await logOut();
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    username: user?.displayName || user?.email?.split('@')[0] || 'user'
  };
};