import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBasedRoute from "./utils/RoleBasedRoute";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin-dashboard" />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin-dashboard"
        element={
          <PrivateRoutes>
            <RoleBasedRoute requiredRole={["admin"]}>
            <AdminDashboard />
            </RoleBasedRoute>
          </PrivateRoutes>
        }
      />
      <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
    </Routes>
  );
}

export default App;
