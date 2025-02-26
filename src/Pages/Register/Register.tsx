import { useState } from "react";
import { handleRegister } from "../../Services/Register/Register";
import { Link, useNavigate } from "react-router-dom";
import { validatePassword } from "../../Utils/validatePassword";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(""); // For live error display
  const [isPasswordValid, setIsPasswordValid] = useState(false); // Track valid password

  const navigate = useNavigate();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    // Validate password using the imported function
    const { isValid, errorMessage } = validatePassword(newPassword);
    setPasswordError(errorMessage);
    setIsPasswordValid(isValid);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPasswordValid) return; // Prevent submission if password is invalid

    await handleRegister(email, username, password, navigate);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-sm sm:max-w-md p-6 sm:p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-lg sm:text-2xl font-semibold text-white text-center">
          Register
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
            />
          </div>
          <div>
            <label className="text-gray-300 text-sm sm:text-base">Email</label>
            <input
              type="email"
              placeholder="someone@gmail.com"
              className="w-full p-2 mt-1 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={handlePasswordChange} // Live validation
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full mt-6 py-2 sm:py-3 rounded transition duration-300 ${
              isPasswordValid
                ? "bg-blue-600 hover:bg-blue-500 text-white"
                : "bg-gray-500 cursor-not-allowed"
            }`}
            disabled={!isPasswordValid} // Disable button if password is invalid
          >
            Register
          </button>
          <p className="text-gray-400 text-sm mt-4 text-center">
            Already have an account?{" "}
            <Link to="/" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
