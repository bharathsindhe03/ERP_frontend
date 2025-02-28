import axios from "axios";
import { toast } from "sonner";

export default async function handleVerifyOTP(
  email: string,
  otp: string,
  navigate: Function
) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_SERVER_URL}/auth/verify-otp`,
      { params: { email, otp } }
    );
    console.log(response);
    if (response.status === 200) {
      console.log(response.data);
      navigate("/resetpassword");
    } else {
      console.log("OTP verification failed. Please try again.");
      toast.error("OTP verification failed. Please try again.");
    }
  } catch (error) {
    console.error(error);
  }
}
