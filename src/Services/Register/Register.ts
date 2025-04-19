import { toast } from "sonner";
import api from "../../Utils/create_api";

export const handleRegister = async (
  email: string,
  userName: string,
  password: string,
  navigate: Function
) => {
  try {
    const response = await api.post("/auth/register", {
      email: email,
      userName: userName,
      password: password,
      role: "ADMIN",
    });

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
      toast.error(error.response.data);
    } else if (error.response.status === 403) {
      toast.error("User Already Exists");
    }
  }
};
