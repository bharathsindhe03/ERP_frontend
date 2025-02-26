import { useState } from "react";
import { FaSearch, FaPlus, FaFilter, FaChevronDown } from "react-icons/fa";

export default function Searchbar() {
  const [jobId, setJobId] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");

  return (
    <div className="w-full bg-gray-800 text-white p-4 flex flex-col sm:flex-row items-center justify-between shadow-md gap-3">
      {/* Search Section */}
      <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
        <div className="flex items-center gap-2 relative">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-gray-700 p-2 rounded-md hover:bg-gray-600"
          >
            <FaFilter />
            <span>{selectedFilter}</span>
            <FaChevronDown />
          </button>

          {/* Filter Dropdown */}
          {showFilters && (
            <div className="absolute top-10 left-0 bg-gray-700 text-white shadow-lg rounded-md w-40 z-10">
              {["All", "Active", "Completed", "Pending"].map((filter) => (
                <button
                  key={filter}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                  onClick={() => {
                    setSelectedFilter(filter);
                    setShowFilters(false);
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded-md w-full sm:w-auto"
            placeholder="Job ID : Enter Job ID"
          />
          <button
            className="bg-gray-700 p-2 rounded-md hover:bg-gray-600"
            title="Search"
          >
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Add Job Button */}
      <button className="bg-blue-600 px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-500">
        <FaPlus />
        <span>Add Job</span>
      </button>
    </div>
  );
}
