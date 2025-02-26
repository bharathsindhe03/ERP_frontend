import { useState } from "react";
import Navbar from "../../Components/Navbar";
import Searchbar from "../../Components/Searchbar";
import Taskbar from "../../Components/Taskbar";

interface User {
  id: number;
  name: string;
  role: string;
  username: string;
  phone: string;
  active: boolean;
}

export default function Page2() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "John Doe",
      role: "Admin",
      username: "johndoe",
      phone: "123-456-7890",
      active: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "User",
      username: "janesmith",
      phone: "987-654-3210",
      active: false,
    },
  ]);

  const [editableRow, setEditableRow] = useState<number | null>(null);

  const handleInputChange = (id: number, field: keyof User, value: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, [field]: value } : user
      )
    );
  };

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
                    <th className="p-2 md:p-3 text-left text-sm md:text-base">
                      Name
                    </th>
                    <th className="p-2 md:p-3 text-left text-sm md:text-base">
                      Role
                    </th>
                    <th className="p-2 md:p-3 text-left text-sm md:text-base">
                      Username
                    </th>
                    <th className="p-2 md:p-3 text-left text-sm md:text-base">
                      Phone Number
                    </th>
                    <th className="p-2 md:p-3 text-left text-sm md:text-base">
                      Active / Not Active
                    </th>
                    <th className="p-2 md:p-3 text-left text-sm md:text-base">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-200">
                      <td className="p-2 md:p-3">
                        {editableRow === user.id ? (
                          <input
                            type="text"
                            value={user.name}
                            placeholder="Name"
                            onChange={(e) =>
                              handleInputChange(user.id, "name", e.target.value)
                            }
                            className="border rounded p-1 w-full text-sm md:text-base"
                          />
                        ) : (
                          user.name
                        )}
                      </td>
                      <td className="p-2 md:p-3">
                        {editableRow === user.id ? (
                          <input
                            type="text"
                            value={user.role}
                            placeholder="Role"
                            onChange={(e) =>
                              handleInputChange(user.id, "role", e.target.value)
                            }
                            className="border rounded p-1 w-full text-sm md:text-base"
                          />
                        ) : (
                          user.role
                        )}
                      </td>
                      <td className="p-2 md:p-3 text-sm md:text-base">
                        {user.username}
                      </td>
                      <td className="p-2 md:p-3">
                        {editableRow === user.id ? (
                          <input
                            type="text"
                            value={user.phone}
                            placeholder="Phone Number"
                            onChange={(e) =>
                              handleInputChange(
                                user.id,
                                "phone",
                                e.target.value
                              )
                            }
                            className="border rounded p-1 w-full text-sm md:text-base"
                          />
                        ) : (
                          user.phone
                        )}
                      </td>
                      <td
                        className={`p-2 md:p-3 font-semibold ${
                          user.active ? "text-green-600" : "text-red-600"
                        } text-sm md:text-base`}
                      >
                        {user.active ? "Active" : "Not Active"}
                      </td>
                      <td className="p-2 md:p-3">
                        {editableRow === user.id ? (
                          <button
                            onClick={() => setEditableRow(null)}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm md:text-base"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() => setEditableRow(user.id)}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm md:text-base"
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
