import { useLocation } from 'react-router-dom';

export const useHasNavbar = () => {
  const location = useLocation();
  const navbarPages = ['/tester'];
  const isDynamicUserPage = /^\/[^\/]+$/.test(location.pathname) && location.pathname !== '/';
  return navbarPages.includes(location.pathname) || isDynamicUserPage;
};
