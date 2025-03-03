import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
import { Toaster } from "sonner";
import Loader from "./Components/Loader";
const Login = lazy(() => import("./Pages/Login/Login"));
const Page1 = lazy(() => import("./Pages/Page1/Page1"));
const Page2 = lazy(() => import("./Pages/Page2/Page2"));
const Page3 = lazy(() => import("./Pages/Page3/Page3"));
const ResetPassword = lazy(() => import("./Pages/ResetPassword/ResetPassword"));
const ForgotPassword = lazy(
  () => import("./Pages/ForgotPassword/ForgotPassword")
);
const Register = lazy(() => import("./Pages/Register/Register"));
const VerifyOTP = lazy(() => import("./Pages/VerifyOTP/VerifyOTP"));

export default function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/verifyotp" element={<VerifyOTP />} />
            <Route path="/page1" element={<Page1 />} />
            <Route path="/page2" element={<Page2 />} />
            <Route path="/page3" element={<Page3 />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}
