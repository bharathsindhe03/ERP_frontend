import { toast } from "sonner";
import api from "../Utils/create_api";

export default async function handleLogIn(username: string, password: string, navigate: Function) {
  try {
    const response = await api.post("/auth/login", { username, password });
    console.log(response);
    if (response.status === 200) {
      toast.success("Login Successful");

      navigate("/dashboard");

      localStorage.setItem("email", response.data.email);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("username", username);
    }
  } catch (error: any) {
    console.error(error);
    if (error.response.status === 404) {
      toast.error(error.response.data);
    }
    if (error.response.status === 401) {
      toast.error(error.response.data);
    }
  }
}
