import { Navigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { store } from '../utils';

const ProtectedRoute = ({ children }) => {
    const snap = useSnapshot(store);
    
    // Check if user is authenticated
    if (!snap.signedIn) {
        return <Navigate to="/forbidden" replace />;
    }
    
    return children;
};

export default ProtectedRoute;
