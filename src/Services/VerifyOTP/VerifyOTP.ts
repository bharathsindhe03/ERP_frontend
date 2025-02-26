import axios from "axios";

export default async function handleVerifyOTP(email: string, otp: string) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_SERVER_URL}/auth/verify-otp`,
      { params: { email, otp } }
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
