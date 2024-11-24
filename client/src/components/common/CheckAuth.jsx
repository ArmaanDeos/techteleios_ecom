import { Navigate, useLocation } from "react-router-dom";

// Component to check authentication and authorization before rendering children or redirecting.
const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation(); // Gets the current location object from React Router.

  // If the user is not authenticated and is not on the login or register pages, redirect to login.
  if (
    (!isAuthenticated && !location.pathname.includes("/login")) || // Ensures unauthenticated users cannot access restricted routes.
    location.pathname.includes("/register") // Redirect users to login even if they try accessing the register page.
  ) {
    return <>{children}</>; // Redirect to login page.
  }

  // If the user is authenticated and tries to access the login page:
  if (isAuthenticated && location.pathname.includes("login")) {
    // Redirect admin users to the admin dashboard.
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    }
    // Redirect regular users to the shop homepage.
    else {
      return <Navigate to="/shop/home" />;
    }
  }

  // If an authenticated non-admin user tries to access an admin route, redirect to "unauthorized."
  if (
    isAuthenticated &&
    user?.role !== "admin" && // Ensures only admins can access admin routes.
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauthorized" />; // Redirect to unauthorized access page.
  }

  // If an admin user tries to access shop routes, redirect them to the admin dashboard.
  if (
    isAuthenticated &&
    user?.role === "admin" && // Ensures admins stay in admin-related routes.
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />; // Redirect to admin dashboard.
  }

  // Render the child components if no redirection is needed.
  return <>{children}</>;
};

export default CheckAuth;
