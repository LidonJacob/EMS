import { Navigate } from "react-router-dom";
import { useAuth } from "../context/userContext"

const RoleBasedRoute = ({children, requiredRole}) => {
    const {user, loading} = useAuth();

    if (loading) {
       return <div>Loading...</div>
    }

    if (!requiredRole.includes(user.role)) {
        return <Navigate to="/unauthorized" />
    }

    return user ? children : <Navigate to="/login" />
  
}

export default RoleBasedRoute