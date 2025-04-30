import { Navigate, Outlet } from 'react-router-dom';
import { useProfile } from '../api/userApi';

const ManagerProtectedRoute = () => {
    const { data: userProfile, isLoading } = useProfile();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (userProfile?.user.role !== "Manager") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ManagerProtectedRoute; 