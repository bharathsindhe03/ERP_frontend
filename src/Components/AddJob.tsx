import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import handleCRMAddJob from "../Services/Jobs/AddJobs";


export default function AddJob({ setShowModal }: any) {
  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState("");
  const [sellingPrice, setSellingPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categoryOptions = [
    "Clearance",
    "Domestic Freight",
    "Export Freight",
    "Freight & Clearance",
    "Import Freight",
    "Service",
    "Storage",
    "Transportation",
    "DTA Movement",
    "Duty Payment",
  ];

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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
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
            <label htmlFor="customerName" className="block text-sm font-medium">
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
            <select
              id="category"
              className="w-full border p-2 rounded-md"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              {categoryOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="sellingPrice" className="block text-sm font-medium">
              Selling Price
            </label>
            <input
              id="sellingPrice"
              type="number"
              className="w-full border p-2 rounded-md"
              placeholder="Enter Selling Price"
              value={sellingPrice ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                setSellingPrice(value === "" ? null : Number(value));
              }}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 text-white rounded-md hover:bg-blue-500"
          >
            {loading ? "Loading" : "Add Job"}
          </button>
        </form>
      </div>
    </div>
  );
}
