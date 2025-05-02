export default function ForbiddenPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-6xl font-bold text-red-500">403</h1>
      <h2 className="text-2xl mt-2">Forbidden</h2>
      <p className="text-gray-400 mt-2">
        You don't have permission to access this page.
      </p>

      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => window.history.back()}
          className="bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Go Back
        </button>
        <a
          href="/"
          className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-500"
        >
          Home
        </a>
      </div>
    </div>
  );
}
