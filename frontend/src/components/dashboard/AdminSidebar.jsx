import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <div className="fixed left-0 top-0 bottom-0 h-screen w-64 space-y-2 bg-gray-900 border-r border-gray-800 text-white">
      <div className="bg-teal-600 h-12 flex items-center justify-center">
        <h3>Employee Ms</h3>
      </div>
      <div>
        <NavLink to="/admin-dashboard">
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/admin-dashboard">
          <FaUsers />
          <span>Employees</span>
        </NavLink>
        <NavLink to="/admin-dashboard">
          <FaBuilding />
          <span>Departments</span>
        </NavLink>
        <NavLink to="/admin-dashboard">
          <FaCalendarAlt />
          <span>Leaves</span>
        </NavLink>
        <NavLink to="/admin-dashboard">
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>
        <NavLink to="/admin-dashboard">
          <FaCogs />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
