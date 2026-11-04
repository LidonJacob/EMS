import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBasedRoute from "./utils/RoleBasedRoute";
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/departments/DepartmentList";
import AddDepartment from "./components/departments/AddDepartment";
import EditDepartment from "./components/departments/EditDepartment";
import List from "./components/employee/List";
import Add from "./components/employee/Add";
import View from "./components/employee/View";
import Edit from "./components/employee/Edit";

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
      >
        <Route index element={<AdminSummary />} />
        <Route path="departments" element={<DepartmentList />} />
        <Route path="add-department" element={<AddDepartment />} />
        <Route path="departments/:id" element={<EditDepartment />} />
        <Route path="employees" element={<List />} />
        <Route path="add-employee" element={<Add />} />
        <Route path="employees/:id" element={<View/>} />
        <Route path="employee/edit/:id" element={<Edit/>} />
      </Route>

      <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
    </Routes>
  );
}

export default App;
