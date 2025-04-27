import api from "../../Utils/create_api";
import { toast } from "sonner";
import { fetchUsers } from "../../Services/ManageEmployee/FetchEmp";

const handleAddUser = async (
  userName: string,
  // password: string,
  email: string,
  role: string,
  setUsers: any,
  setLoading: any,
  setOpen: any,
  setUserName: any,
  setPassword: any,
  setEmail: any,
  setRole: any
) => {
  try {
    console.log('adding..')
    const res = await api.post("/admin/initiate-register", {
      userName,
      // password,
      email,
      role,
    });
    if (res.status === 200) {
      toast.success("User added successfully");
      setOpen(false);
      setUserName("");  // Now passed correctly
      setPassword("");
      setEmail("");
      setRole("ADMIN");
      fetchUsers(setUsers, setLoading);
    }
  } catch (err) {
    toast.error("Failed to add user");
  }
};

export default handleAddUser;
