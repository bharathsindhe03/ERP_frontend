import { toast } from "sonner";
import api from "../../Utils/create_api";

export default async function handleLogOut(navigator: Function) {
  try {
    const response = await api.post("/auth/logout");
    console.log("Logout response: ", response);
    if (response.status === 200) {
      console.log("Logout successful");
      toast.success("Logout successful");
      localStorage.clear();
      navigator("/");
    } else {
      toast.error("Somethoing went wrong, please try again later");
    }
  } catch (error) {
    console.log(error);
    toast.error("Somethoing went wrong, please try again later");
  }
}
