import { toast } from "sonner";
import api from "../../Utils/create_api";

export const handleSetPassword = async (
  email: string,
  password: string,
  navigate: Function
) => {
  try {
    const response = await api.post("/auth/complete-register", {
      email,
      password,
    });

    console.log(response);
    if (response.status === 200) {
      toast.success(response.data);
      navigate("/");
    } else {
      toast.error("Setting password failed. Please try again.");
    }
  } catch (error: any) {
    console.error(error);
    if (error.response.status === 400) {
      toast.error(error.response.data);
    } else if (error.response.status === 403) {
      toast.error("Something went wrong.");
    }
  }
};
