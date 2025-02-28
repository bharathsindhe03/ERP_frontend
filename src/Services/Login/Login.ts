import axios from "axios";
import { toast } from "sonner";

export const handleLogin = async (
  username: string,
  password: string,
  navigate: Function
) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_SERVER_URL}/auth/login`,
      {
        username,
        password,
      }
    );
    console.log(response);
    if (response.data[0] === "L") {
      toast.success(response.data);
      // localStorage.setItem("email", response.email);
      // localStorage.setItem("username", response.username);
      navigate("/page1");
    } else {
      toast.error(response.data);
    }
  } catch (error) {
    console.error(error);
  }
};
