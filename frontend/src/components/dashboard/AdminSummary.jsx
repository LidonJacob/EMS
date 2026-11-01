import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
  FaHourglassHalf,
} from "react-icons/fa";
import SummaryCard from "./SummaryCard";

const AdminSummary = () => {
  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard
          icon={<FaUsers />}
          text="Total Employees"
          number={15}
          color="bg-teal-600"
        />
        <SummaryCard
          icon={<FaBuilding />}
          text="Total Departments"
          number={5}
          color="bg-yellow-600"
        />
        <SummaryCard
          icon={<FaMoneyBillWave />}
          text="Monthly Salary"
          number="$2000"
          color="bg-red-600"
        />
      </div>
      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold">Leave Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SummaryCard
            icon={<FaFileAlt />}
            text="leave applied"
            number={3}
            color="bg-teal-600"
          />
          <SummaryCard
            icon={<FaCheckCircle />}
            text="leave approved"
            number={2}
            color="bg-green-600"
          />
          <SummaryCard
            icon={<FaTimesCircle />}
            text="leave rejected"
            number={1}
            color="bg-red-600"
          />
          <SummaryCard
            icon={<FaHourglassHalf />}
            text="leave pending"
            number={1}
            color="bg-yellow-600"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
