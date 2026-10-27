import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password },
      );
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };
  return (
    <div className="flex flex-col items-center h-screen justify-center bg-linear-to-b from-gray-900 via-slate-900 to-teal-950 text-white space-y-6">
      <h2 className="font-inter text-3xl text-teal-300 drop-shadow-md">
        Employee Managament System
      </h2>
      <div className="w-80 p-6 bg-slate-800/80 border border-slate-700/60 rounded-xl shadow-2xl backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-4 text-slate-100">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-slate-300">
            <label htmlFor="email" className="block text-slate-300 font-medium">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 bg-slate-900/60 border border-slate-700/80 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition"
              placeholder="you@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 text-slate-300">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 bg-slate-900/60 border border-slate-700/80 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition"
              placeholder="******"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 flex items-center justify-between text-slate-300 text-sm">
            <label className="inline-flex items-center text-slate-300 hover:text-teal-300 transition">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 rounded bg-slate-900 border-slate-700 text-teal-500 focus:ring-teal-400 focus:ring-offset-slate-900 transition cursor-pointer"
              />
              <span className="ml-2 text-slate-300 text-sm">Remember me</span>
            </label>
            <a
              href="#"
              className="text-teal-400 hover:text-teal-300 hover:underline transition"
            >
              Forgot Password?
            </a>
          </div>
          <div className="mb-4 text-slate-300">
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-500 text-white font-medium py-2 rounded-lg shadow-md hover:shadow-teal-900/30 transition duration-150 ease-in-out cursor-pointer"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
