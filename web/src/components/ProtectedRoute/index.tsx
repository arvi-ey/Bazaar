import React, { useEffect, useState } from 'react';
import { getAuth } from '../../Hooks/auth';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { GetUserInfo } from "../../../../Redux/Slice/userSlicer"
import { RootState, AppDispatch } from "../../../../Redux/Store/index"

interface ProtectedRouteProps {
    role: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [authStatus, setAuthStatus] = useState<{ userId?: String | null; userType?: string | null }>({
        userId: null,
        userType: null,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);


    useEffect(() => {
        if (authStatus.userId && typeof authStatus.userId === "string") {
            dispatch(GetUserInfo(authStatus.userId))
        }
    }, [authStatus.userId, dispatch])

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
