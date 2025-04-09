import { toast } from "sonner";
import api from "../../Utils/create_api";
import axios from "axios";

export const handleRegister = async (
  email: string,
  userName: string,
  password: string,
  navigate: Function
) => {
  try {
    console.log("type 1");
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_SERVER_URL}/auth/register`,
      {
        email: email,
        username: userName,
        password: password,
        role: "ADMIN",
      }
    );
    // console.log("type 2");

    // const response = await api.post("/auth/register", {
    //   email: email,
    //   username: userName,
    //   password: password,
    //   role: "ADMIN",
    // });

    console.log(response);
    if (response.status === 200) {
      toast.success(response.data);
      navigate("/");
    } else {
      toast.error("Registration failed. Please try again.");
    }
  } catch (error: any) {
    console.error(error);
    if (error.response.status === 400) {
      toast.error(error.response.data); //existing user - username
    } else if (error.response.status === 403) {
      toast.error("User Already Exists"); //existing user - email
    }
  }
};
