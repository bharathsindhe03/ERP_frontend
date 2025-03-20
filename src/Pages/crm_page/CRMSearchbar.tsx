import { FaSearch, FaPlus, FaTimes } from "react-icons/fa";
import { useState } from "react";
import handleCRMAddJob from "../../Services/crm_page/crm_add_jobs";
import Loader from "../../Components/Loader";

interface SearchbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function CRMSearchbar({
  searchQuery,
  setSearchQuery,
}: SearchbarProps) {
  const [showModal, setShowModal] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState("");
  const [sellingPrice, setSellingPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedDate = date.split("-").reverse().join("-");

    await handleCRMAddJob(
      customerName,
      formattedDate,
      category,
      Number(sellingPrice),
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded-md w-full sm:w-auto"
            placeholder="Search Job ID..."
          />
          <FaSearch className="text-gray-400" />
        </div>
      </div>

      {/* Add Job Button */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-500"
      >
        <FaPlus />
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
                className="text-gray-600 hover:text-gray-900"
                title="Close Modal"
              >
                <FaTimes />
              </button>
            </div>
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
                  onChange={(e) => setSellingPrice(Number(e.target.value))}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 px-4 py-2 text-white rounded-md hover:bg-blue-500"
              >
                {loading ? <Loader /> : "Add Job"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
