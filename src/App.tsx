import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
import { Toaster } from "sonner";
import Loader from "./Components/Loader";

const Login = lazy(() => import("./Pages/login/Login"));
const AdminPage = lazy(() => import("./Pages/admin_page/AdminPage"));
const CRMPage = lazy(() => import("./Pages/crm_page/CRMPage"));
const BillingPage = lazy(() => import("./Pages/billing_page/BillingPage"));
const ResetPassword = lazy(() => import("./Pages/forgot_password/ResetPassword"));
const ForgotPassword = lazy(() => import("./Pages/forgot_password/ForgotPassword"));
const Register = lazy(() => import("./Pages/register/Register"));
const VerifyOTP = lazy(() => import("./Pages/forgot_password/VerifyOTP"));
const ErrorPage = lazy(() => import("./Pages/error_page/ErrorPage"));

export default function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/verifyotp" element={<VerifyOTP />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/crm" element={<CRMPage />} />
            <Route path="/billing" element={<BillingPage />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}