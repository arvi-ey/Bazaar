import React, { useEffect, useState } from 'react';
import { getAuth } from '../../Hooks/auth';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
    role: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role }) => {
    const [authStatus, setAuthStatus] = useState<{ userId?: String | null; userType?: string | null }>({
        userId: null,
        userType: null,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        checkAuth();
    }, []);

    const checkAuth = async () => {
        const { userId, userType } = await getAuth();
        setAuthStatus({ userId, userType });
        setLoading(false);
    };
    // Check authentication and role
    if (loading) return null;

    if (authStatus.userId) {
        if (role && authStatus.userType === role) {
            return <Outlet />;
        } else {
            return <Navigate to="/unauthorized" />;
        }
    }

    // Not authenticated
    return <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
