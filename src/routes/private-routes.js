import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

export const PrivateRoutes = () => {
    const location = useLocation();
    const { authState: { isAuth } } = useAuth();

    return(
        isAuth ? (
            <main>
                <Outlet />
            </main>
        ) : (
            <Navigate to="/login" state={{ from: location }} replace/>
        )
    );
}