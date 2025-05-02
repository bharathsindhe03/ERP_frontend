import { toast } from "sonner";
import api from "../Utils/create_api";

export default async function handleVerifyOTP(otp: string, navigate: Function) {
  try {
    const email = localStorage.getItem("email");
    const response = await api.post("/auth/verify-otp", { email, otp });

    console.log(response);
    if (response.status === 200) {
      navigate("/resetpassword");
    } else {
      console.log("OTP verification failed. Please try again.");
      toast.error("OTP verification failed. Please try again.");
    }
  } catch (error) {
    console.error(error);
  }
}
