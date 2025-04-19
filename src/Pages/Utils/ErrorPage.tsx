import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-sm sm:max-w-md p-6 sm:p-8 bg-gray-800 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl sm:text-6xl font-bold text-white">404</h1>
        <p className="text-gray-300 text-sm sm:text-base mt-4">
          Oops! The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-blue-600 hover:bg-blue-500 text-white py-2 sm:py-3 px-4 rounded transition duration-300 cursor-pointer"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
