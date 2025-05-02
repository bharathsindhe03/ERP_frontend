import api from "../Utils/create_api";
import { toast } from "sonner";

export const deleteUser = async (
  userName: string,
  fetchUsers: (
    setUsers: React.Dispatch<React.SetStateAction<any[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => void,
  setUsers: React.Dispatch<React.SetStateAction<any[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const response = await api.delete(`/admin/delete-user/${userName}`);
    console.log(response);
    if (response.status === 200) {
      toast.success("User deleted successfully");
      fetchUsers(setUsers, setLoading);
    } else {
      toast.error("Failed to delete user. Please try again.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete user. Please try again.");
  }
};
