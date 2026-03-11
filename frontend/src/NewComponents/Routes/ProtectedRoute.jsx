import { Navigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const ProtectedRoute = ({ children }) => {
    const { userId } = useUser();
    if (!userId) return <Navigate to="/login" replace />;
    return children;
}

export default ProtectedRoute;