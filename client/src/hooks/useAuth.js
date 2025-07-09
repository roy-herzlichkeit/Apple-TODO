import { useParams } from 'react-router-dom';

export const useUsername = () => {
  const { username } = useParams();
  return username || 'tester';
};

export const useAuth = () => {
  return {
    isAuthenticated: true,
    username: 'tester'
  };
};