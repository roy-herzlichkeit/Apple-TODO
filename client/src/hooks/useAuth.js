import { useParams } from 'react-router-dom';

export const useUsername = () => {
  const { username } = useParams();
  return username || 'user';
};

export const useAuth = () => {
  const login = () => {
    return { success: true };
  };

  const logout = () => {
    return { success: true };
  };

  return {
    user: null,
    loading: false,
    isAuthenticated: false,
    login,
    logout,
    username: 'user'
  };
};