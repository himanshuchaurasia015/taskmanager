import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    console.log("User is not authenticated, redirecting to signin.");
    return <Navigate to="/signin" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.log(
      "User does not have the required role, redirecting to not-authorized."
    );
    return <Navigate to="/not-authorized" />;
  }

  return children;
};

export default ProtectedRoute;
