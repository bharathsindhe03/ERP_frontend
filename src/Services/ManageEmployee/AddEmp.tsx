import api from "../Utils/create_api";
import { toast } from "sonner";

const handleAddUser = async (userName: string, email: string, role: string) => {
  // Validate inputs
  if (!userName || !email || !role) {
    toast.error("Please fill in all fields.");
    return;
  }
  try {
    const response = await api.post("/admin/initiate-register", {
      userName,
      email,
      role,
    });
    if (response.status === 200) {
      toast.success("User added successfully");
    }
  } catch (error) {
    console.error("Error adding user:", error);
    toast.error("Failed to add user. Please try again.");
  }
};

export default handleAddUser;
