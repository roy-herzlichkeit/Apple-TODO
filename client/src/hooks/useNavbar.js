import { useLocation } from 'react-router-dom';

export const useHasNavbar = () => {
  const location = useLocation();
  const navbarPages = ['/user'];
  return navbarPages.includes(location.pathname);
};