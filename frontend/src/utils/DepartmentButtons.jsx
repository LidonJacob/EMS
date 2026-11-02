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
        className="px-3 py-1 bg-teal-600 text-white"
        onClick={() => navigate(`/admin-dashboard/departments/${_id}`)}
      >
        {" "}
        Edit{" "}
      </button>
      <button
        className="px-3 py-1 bg-red-500 text-white "
        onClick={() => handleDelete(_id)}
      >
        {" "}
        Delete{" "}
      </button>
    </div>
  );
};
