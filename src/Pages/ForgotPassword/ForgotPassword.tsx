import { useState } from "react";
import { handleForgotPassword } from "../../Services/ForgotPassword/handleForgotPassword";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleForgotPassword(email,navigate);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-sm sm:max-w-md p-6 sm:p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-lg sm:text-2xl font-semibold text-white text-center">
          Forgot Password
        </h2>
        <p className="text-gray-400 text-center mt-2 text-sm sm:text-base">
          Enter your email, and we'll send you a link to reset your password.
        </p>

        <form className="mt-6" onSubmit={handleSubmit}>
          <div>
            <label className="text-gray-300 text-sm sm:text-base">Email</label>
            <input
              type="email"
              placeholder="your-email@example.com"
              className="w-full p-2 mt-1 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white py-2 sm:py-3 rounded transition duration-300 cursor-pointer"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
