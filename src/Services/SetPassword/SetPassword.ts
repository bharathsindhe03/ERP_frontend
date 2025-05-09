import { toast } from "sonner";
import api from "../Utils/create_api";
import { AxiosError } from "axios";

export const handleSetPassword = async (email: string, password: string, navigate: (path: string) => void) => {
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
  } catch (error: unknown) {
    console.error(error);

    // Check if the error is an AxiosError
    if (error instanceof AxiosError && error.response) {
      if (error.response.status === 400) {
        toast.error(error.response.data);
      } else if (error.response.status === 403) {
        toast.error("Something went wrong.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } else {
      toast.error("An unexpected error occurred.");
    }
  }
};
