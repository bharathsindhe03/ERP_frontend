import axios from "axios";
import { toast } from "sonner";

export const handleUpdatePassword = async (
  email: string,
  newPassword: string
) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_SERVER_URL}/auth/update-password`,
      { params: { email, newPassword } }
    );
    console.log(response.data);
    toast.success("Password updated successfully");
  } catch (error) {
    console.error(error);
  }
};
