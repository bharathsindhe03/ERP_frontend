import axios from "axios";
import { toast } from "sonner";

export const handleUpdatePassword = async (
  newPassword: string,
  navigate: Function
) => {
  try {
    const email = localStorage.getItem("email");
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_SERVER_URL}/auth/update-password`,
      { params: { email, newPassword } }
    );
    console.log(response.data);
    if (response.status === 200) {
      toast.success("Password updated successfully");
      navigate("/");
    } else {
      toast.error("Failed to update password");
    }
  } catch (error) {
    console.error(error);
  }
};
