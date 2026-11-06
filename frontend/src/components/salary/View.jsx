import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const View = () => {
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    const fetchSalaries = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:3000/api/salary/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (isMounted && response?.data?.success) {
          const salaryData = Array.isArray(response.data.salary)
            ? response.data.salary
            : [];

          setSalaries(salaryData);
        } else if (isMounted) {
          alert(response?.data?.error || "Failed to load salary records.");
        }
      } catch (error) {
        if (isMounted) {
          alert(error.response?.data?.error || error.message || "Something went wrong.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchSalaries();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return <div className="text-center p-5">Loading...</div>;
  }

  return (
    <div className="overflow-x-auto p-5">
      <div className="text-center ">
        <h2 className="text-2xl font-bold">Salary History</h2>
      </div>

      {salaries.length > 0 ? (
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
            <tr>
              <th className="px-6 py-3">S.No</th>
              <th className="px-6 py-3">Emp ID</th>
              <th className="px-6 py-3">Salary</th>
              <th className="px-6 py-3">Allowances</th>
              <th className="px-6 py-3">Deductions</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Pay Date</th>
            </tr>
          </thead>

          <tbody>
            {salaries.map((salary, index) => (
              <tr
                key={salary?._id || index}
                className="bg-white border-b dark:bg-gray-300 dark:border-gray-700"
              >
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">
                  {salary?.employeeId?.employeeId ?? "N/A"}
                </td>
                <td className="px-6 py-3">{salary?.basicSalary ?? 0}</td>
                <td className="px-6 py-3">{salary?.allowances ?? 0}</td>
                <td className="px-6 py-3">{salary?.deductions ?? 0}</td>
                <td className="px-6 py-3">{salary?.netSalary ?? 0}</td>
                <td className="px-6 py-4">
                  {salary?.payDate ? new Date(salary.payDate).toLocaleDateString() : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-500 py-5">No salary records found for this employee.</div>
      )}
    </div>
  );
};

export default View;