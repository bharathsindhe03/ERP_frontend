import axios from "axios";
import { toast } from "sonner";

export const handleForgotPassword = async (username: string,navigate:Function) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_SERVER_URL}/auth/reset-password`,
      {
        username,
      }
    );
    console.log(response);
    if (response.status === 200) {
      toast.success(response.data);
      navigate("/verifyotp");
    } else {
      toast.error("Failed to send password reset link");
    }
  } catch (error) {
    console.error(error);
  }
};
