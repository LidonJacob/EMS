import { useNavigate } from "react-router-dom";
import axios from "axios";

export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const comfirm = window.confirm("Are you sure you want to delete?");
    if (comfirm) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (response.data.success) {
          onDepartmentDelete(id);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        } else {
          alert(error.message);
        }
      }
    }
  };
  return (
    <div className="flex space-x-3 ">
      <button
        className="px-3 py-1 bg-teal-600 text-white hover:cursor-pointer"
        onClick={() => navigate(`/admin-dashboard/departments/${_id}`)}
      >
        {" "}
        Edit{" "}
      </button>
      <button
        className="px-3 py-1 bg-red-500 text-white hover:cursor-pointer"
        onClick={() => handleDelete(_id)}
      >
        {" "}
        Delete{" "}
      </button>
    </div>
  );
};

export const EmployeeButtons = ({ _id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-3 ">
      <button
        className="px-3 py-1 bg-teal-600 text-white hover:cursor-pointer"
        onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}
      >
        {" "}
        View{" "}
      </button>
      <button
        className="px-3 py-1 bg-green-500 text-white hover:cursor-pointer"
        onClick={() => navigate(`/admin-dashboard/employee/edit/${_id}`)}
      >
        {" "}
        Edit{" "}
      </button>
      <button className="px-3 py-1 bg-blue-500 text-white hover:cursor-pointer">
        {" "}
        leave{" "}
      </button>
      <button className="px-3 py-1 bg-red-500 text-white hover:cursor-pointer">
        {" "}
        salary{" "}
      </button>
    </div>
  );
};
