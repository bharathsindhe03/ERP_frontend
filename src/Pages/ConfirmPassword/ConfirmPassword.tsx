import { useState } from "react";
import { handleUpdatePassword } from "../../Services/ConfirmPassword/ConfirmPassword";

export default function ConfirmPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !newPassword) {
      setError("All fields are required");
      return;
    }
    await handleUpdatePassword(email, newPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-sm sm:max-w-md p-6 sm:p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-lg sm:text-2xl font-semibold text-white text-center">
          Update Password
        </h2>

        <form className="mt-6" onSubmit={handleSubmit}>
          <div>
            <label className="text-gray-300 text-sm sm:text-base">Email</label>
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full p-2 mt-1 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <label className="text-gray-300 text-sm sm:text-base">
              New Password
            </label>
            <input
              type="password"
              placeholder="********"
              className="w-full p-2 mt-1 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-400 text-sm mt-1">{error}</p>}

          <button
            type="submit"
            className={`w-full mt-6 py-2 sm:py-3 rounded transition duration-300 bg-blue-600 hover:bg-blue-500 text-white`}
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
