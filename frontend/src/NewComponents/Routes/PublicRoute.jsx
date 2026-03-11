import { Navigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const PublicRoute = ({ children }) => {
    const { userId } = useUser();
    if (userId) return <Navigate to="/home" replace />;
    return children;
}

export default PublicRoute;