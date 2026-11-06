import { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [salary, setSalary] = useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: null,
  });

  // 1. Load Departments on mount
  useEffect(() => {
    const loadDepartments = async () => {
      const fetchedDepartments = await fetchDepartments();
      setDepartments(fetchedDepartments ?? []);
      setLoading(false);
    };
    loadDepartments();
  }, []);

  // 2. Fetch Employee details by ID

  const handleDepartment = async (e) => {
    const departmentId = e.target.value;
    setEmployees([]);

    if (!departmentId) return;

    const emps = await getEmployees(departmentId);
    setEmployees(emps ?? []);
  };

  // 3. Handle input changes properly
  const handleChange = (e) => {
    const { name, value } = e.target;

    setSalary((prevData) => ({ ...prevData, [name]: value }));
  };

  // 4. Submit updated data to the edit/update endpoint
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3000/api/salary/add/`,
        salary,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            // Use "multipart/form-data" if you are handling file uploads here
          },
        },
      );

      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      console.log(
        "Update employee failed:",
        error.response?.status,
        error.response?.data,
      );
      alert(JSON.stringify(error.response?.data) || error.message);
    }
  };

  return (
    <>
    {loading ? <div>Loading...</div> : 
      <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-6">Add Salary</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <select
                name="department"
                onChange={handleDepartment}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Department</option>
                {departments.map((dep) => (
                  <option key={dep._id} value={dep._id}>
                    {dep.dep_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Employee */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee
              </label>
              <select
                name="employeeId"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.employeeId}
                  </option>
                ))}
              </select>
            </div>

            {/* Basic Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Basic Salary
              </label>
              <input
                type="number"
                name="basicSalary"
                onChange={handleChange}
                placeholder="Basic Salary"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Allowances */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Allowances
              </label>
              <input
                type="number"
                name="allowances"
                onChange={handleChange}
                placeholder="Allowances"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Deductions */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Deductions
              </label>
              <input
                type="number"
                name="deductions"
                onChange={handleChange}
                placeholder="Deductions"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Pay Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pay Date
              </label>
              <input
                type="date"
                name="payDate"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Salary
          </button>
        </form>
      </div>
    }
    </>
  );
};

export default Add;
