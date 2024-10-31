import React from 'react'
import { getAuth } from '../../Hooks/auth'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const index = () => {
    const navigate = useNavigate()
    const token = getAuth()
    if (!token) {
        return <Navigate to="/signin" replace />;
    }
    return (
        <Outlet />
    )
}

export default index