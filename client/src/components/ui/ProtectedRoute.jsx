import { Navigate, useLocation } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { store } from '../../utils';

const ProtectedRoute = ({ children }) => {
  const snap = useSnapshot(store);
  const location = useLocation();
  if (!snap.signedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;