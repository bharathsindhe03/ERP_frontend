import Navbar from "../../Components/Navbar";
import Searchbar from "../../Components/Searchbar";
import Taskbar from "../../Components/Taskbar";

export default function Page1() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-col md:flex-row flex-grow h-full">
        <Taskbar />
        <div className="w-full flex-grow">
          <Navbar />
          <Searchbar />
          <div className="bg-gray-100 p-4 h-full overflow-auto">
            <div className="overflow-x-auto">
              <table className="w-full min-w-max border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="p-3 text-left text-sm md:text-base">Name</th>
                    <th className="p-3 text-left text-sm md:text-base">Role</th>
                    <th className="p-3 text-left text-sm md:text-base">
                      Username
                    </th>
                    <th className="p-3 text-left text-sm md:text-base">
                      Phone Number
                    </th>
                    <th className="p-3 text-left text-sm md:text-base">
                      Active / Not Active
                    </th>
                    <th className="p-3 text-left text-sm md:text-base">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-200">
                    <td className="p-3 text-sm md:text-base">John Doe</td>
                    <td className="p-3 text-sm md:text-base">Admin</td>
                    <td className="p-3 text-sm md:text-base">johndoe</td>
                    <td className="p-3 text-sm md:text-base">123-456-7890</td>
                    <td className="p-3 text-green-600 font-semibold text-sm md:text-base">
                      Active
                    </td>
                    <td className="p-3">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm md:text-base">
                        Reset
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-200">
                    <td className="p-3 text-sm md:text-base">Jane Smith</td>
                    <td className="p-3 text-sm md:text-base">User</td>
                    <td className="p-3 text-sm md:text-base">janesmith</td>
                    <td className="p-3 text-sm md:text-base">987-654-3210</td>
                    <td className="p-3 text-red-600 font-semibold text-sm md:text-base">
                      Not Active
                    </td>
                    <td className="p-3">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm md:text-base">
                        Reset
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
