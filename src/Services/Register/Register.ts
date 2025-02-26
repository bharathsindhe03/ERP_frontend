import axios from "axios";
import { toast } from "sonner";

export const handleRegister = async (
  email: string,
  userName: string,
  password: string,
  navigate: Function
) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_SERVER_URL}/auth/register`,
      {
        userName,
        email,
        password,
        role: "ADMIN",
      }
    );
    console.log(response);
    if (response.status === 200) {
      toast.success(response.data);
      navigate("/");
    } else {
      toast.error("Registration failed. Please try again.");
    }
  } catch (error: any) {
    console.error(error);
  }
};
