import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const AdminProtectedRoute = () => {
    const { isAdmin } = useAppContext();

    if (!isAdmin) {
        return <Navigate to="/admin" replace />;
    }

    return <Outlet />;
};

export default AdminProtectedRoute;