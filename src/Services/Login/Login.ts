import axios from "axios";
import { toast } from "sonner";

export const handleLogin = async (username: string, password: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_SERVER_URL}/auth/login`,
      {
        username,
        password,
      }
    );
    console.log(response);
    if (response.status === 200) {
      toast.success(response.data);
    }else{
      toast.error("Login failed. Please try again.");
    }
  } catch (error) {
    console.error(error);
  }
};
