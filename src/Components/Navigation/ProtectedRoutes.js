import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { checkAuth } from '../../Redux/features/Auth/AuthSlice';
import { useEffect } from 'react';


export const ProtectedRoute = () => {
    const isAuthenticated = useSelector(checkAuth);
    const profileName = JSON.parse(localStorage.getItem('auth')) ? JSON.parse(localStorage.getItem('auth')) : ''
    let location = useLocation();

    if (!isAuthenticated || profileName?.role=='user' || profileName?.role==undefined) {
        return <Navigate to="/login" state={{ from: location }} />
    }

    return (
        <Outlet />
    )
}