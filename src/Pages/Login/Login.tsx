import { useState } from "react";
import handleLogIn from "../../Services/Login/log_in";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogIn(username, password, navigate);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-sm sm:max-w-md p-6 sm:p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-lg sm:text-2xl font-semibold text-white text-center">
          Login
        </h2>

        <form className="mt-6" onSubmit={handleSubmit}>
          <div>
            <label className="text-gray-300 text-sm sm:text-base">
              Username
            </label>
            <input
              type="text"
              placeholder="username"
              className="w-full p-2 mt-1 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="mt-4">
            <label className="text-gray-300 text-sm sm:text-base">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              className="w-full p-2 mt-1 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <div className="text-right mt-1">
              <Link
                to="/forgotpassword"
                className="text-blue-400 text-sm hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white py-2 sm:py-3 rounded transition duration-300 cursor-pointer"
          >
            Login
          </button>

          <p className="text-gray-400 text-sm mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:underline">
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
