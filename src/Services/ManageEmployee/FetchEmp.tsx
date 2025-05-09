import api from "../Utils/create_api";
import { toast } from "sonner";

export const fetchUsers = async (setUsers: React.Dispatch<React.SetStateAction<any[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  try {
    setLoading(true);
    const response = await api.get("admin/all-users");
    setUsers(response.data);
    setLoading(false);
  } catch (err) {
    setLoading(false);
    toast.error("Failed to fetch users. Please try again.");
    console.error("Error fetching users:", err);
  }
};
