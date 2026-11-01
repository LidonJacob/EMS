import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/dashboard/AdminSidebar";
import Navbar from "../components/dashboard/Navbar";
import { useAuth } from "../context/userContext";
import AdminSummary from "../components/dashboard/AdminSummary";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 bg-gray-100 h-screen">
        <Navbar />
       <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
