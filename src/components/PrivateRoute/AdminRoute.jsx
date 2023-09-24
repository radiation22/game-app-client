/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Loader from "../Loader/Loader";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const [role, setRole] = useState("admin"); // State to store the user's role

  useEffect(() => {
    // Fetch the user's role when the component mounts
    if (user) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://nirapode-server.vercel.app/validateAdminRole?email=${user?.email}`
          );
          const userData = await response.json();
          console.log(userData);
          setRole(userData.userRole); // Assuming the role is in the response
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      };

      fetchData();
    }
  }, [user]);

  if (loading) {
    return <Loader></Loader>;
  }

  if (!user || role !== "admin") {
    // Redirect to the login page or another appropriate route
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  // Allow access to the protected route for "driver" role
  return children;
};

export default AdminRoute;
