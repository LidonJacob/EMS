import { Link } from "react-router-dom"
import axios from "axios";
import { useState, useEffect } from "react";
import { EmployeeButtons } from "../../utils/DepartmentButtons";
import DataTable from "react-data-table-component";
import { columns } from "../../utils/EmployeeHelper";

const List = () => {
  const [employees, setEmployees] = useState([])
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);


   useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/employee",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        
        if (response.data.success) {
          let sno = 1;
          const data = await response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name: emp.userId.name,
            dob:new Date(emp.dob).toLocaleDateString(),
            profileImage:<img width={40} className="rounded-full" src={`http://localhost:3000/${emp.userId.profileImage}`} alt=""/>,
            action: (<EmployeeButtons _id={emp._id}/>

            ),
          }));
          setEmployees(data);
          setFilteredEmployees(data);
          
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        } else {
          alert(error.message);
        }
      } finally {
        setEmpLoading(false);
      }
    };
    fetchEmployees();
  }, []);
  const filterEmployees = (event) => {
  const query = event.target.value.toLowerCase();
  setFilteredEmployees(
    employees.filter((employee) =>
      employee.name.toLowerCase().includes(query),
    ),
  );
};
  return (
    <>
    {empLoading && <div>Loading...</div>}
    <div className="p-6">
      <div className="text-center">
          <h3 className="text-2xl font-bold">Manage Employees</h3>
        </div>
        <div className="flex justify-between items-center ">
          <input
            type="text"
            placeholder="Search Employee"
            className="px-4 py-0.5 border"
            onChange={filterEmployees}
            
          />
          <Link
            to="/admin-dashboard/add-employee"
            className="px-4 py-1 bg-teal-600 rounded text-white hover:cursor-pointer"
          >
            Add New Employee
          </Link>
        </div>
        <div>
          <input onChange={filterEmployees}/>
          <DataTable columns={columns} data={filteredEmployees} pagination/>
        </div>
    </div>
    </>
  )
}

export default List