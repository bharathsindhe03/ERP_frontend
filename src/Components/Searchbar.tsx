import { useState } from "react";
import {
  FaSearch,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import handleCRMAddJob from "../Services/CRMPage/handleCRMAddJob";
import Loader from "./Loader";

export default function Searchbar() {
  const [jobId, setJobId] = useState("");
  
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  // Job form state
  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Default to today
  const [category, setCategory] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");

  // Loading & error state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Convert "yyyy-mm-dd" to "dd-mm-yyyy"
    const formattedDate = date.split("-").reverse().join("-");
  
    await handleCRMAddJob(
      customerName,
      formattedDate, // ✅ Send formatted date
      category,
      sellingPrice,
      setLoading,
      setError,
      setShowModal
    );
  };
  

  return (
    <div className="w-full bg-gray-800 text-white p-4 flex flex-col sm:flex-row items-center justify-between shadow-md gap-3">
      {/* Search Section */}
      <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
        

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label htmlFor="jobSearch" className="sr-only">
            Search by Job ID
          </label>
          <input
            id="jobSearch"
            type="text"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded-md w-full sm:w-auto"
            placeholder="Job ID : Enter Job ID"
          />
          <button
            className="bg-gray-700 p-2 rounded-md hover:bg-gray-600"
            title="Search Jobs"
          >
            <FaSearch aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Add Job Button */}
      <button
        onClick={() => setShowModal(true)}
        title="Add a new job"
        className="bg-blue-600 px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-500"
      >
        <FaPlus aria-hidden="true" />
        <span>Add Job</span>
      </button>

      {/* Add Job Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-gray-900 p-6 rounded-md shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add New Job</h2>
              <button
                onClick={() => setShowModal(false)}
                title="Close Modal"
                className="text-gray-600 hover:text-gray-900"
              >
                <FaTimes aria-hidden="true" />
              </button>
            </div>

            {/* Job Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="customerName"
                  className="block text-sm font-medium"
                >
                  Customer Name
                </label>
                <input
                  id="customerName"
                  type="text"
                  className="w-full border p-2 rounded-md"
                  placeholder="Enter Customer Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="date" className="block text-sm font-medium">
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  className="w-full border p-2 rounded-md"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="category" className="block text-sm font-medium">
                  Category
                </label>
                <input
                  id="category"
                  type="text"
                  className="w-full border p-2 rounded-md"
                  placeholder="Enter Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="sellingPrice"
                  className="block text-sm font-medium"
                >
                  Selling Price
                </label>
                <input
                  id="sellingPrice"
                  type="number"
                  className="w-full border p-2 rounded-md"
                  placeholder="Enter Selling Price"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice((e.target.value))}
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  title="Cancel Job Addition"
                  className="bg-gray-500 px-4 py-2 text-white rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  title="Submit New Job"
                  className="bg-blue-600 px-4 py-2 text-white rounded-md hover:bg-blue-500"
                >
                  {loading ? <Loader/> : "Add Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
