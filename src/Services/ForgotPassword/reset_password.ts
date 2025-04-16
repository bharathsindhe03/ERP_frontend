
import { toast } from "sonner";
import api from "../../Utils/create_api";

export const handleUpdatePassword = async (
  newPassword: string,
  navigate: Function
) => {
  try {
    const email = localStorage.getItem("email");
   
    const response = await api.post("/auth/update-password", {
      email: email,
      new_password: newPassword,
    });
    console.log(response.data);
    if (response.status === 200) {
      toast.success("Password updated successfully");
      navigate("/");
    } else {
      toast.error("Failed to update password");
    }
  } catch (error) {
    console.error(error);
  }
};
