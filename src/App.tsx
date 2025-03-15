import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
import { Toaster } from "sonner";
import Loader from "./Components/Loader";

const Login = lazy(() => import("./Pages/Login/Login"));
const AdminPage = lazy(() => import("./Pages/AdminPage/AdminPage"));
const CRMPage = lazy(() => import("./Pages/CRMPage/CRMPage"));
const BillingPage = lazy(() => import("./Pages/BillingPage/BillingPage"));
const ResetPassword = lazy(() => import("./Pages/ResetPassword/ResetPassword"));
const ForgotPassword = lazy(() => import("./Pages/ForgotPassword/ForgotPassword"));
const Register = lazy(() => import("./Pages/Register/Register"));
const VerifyOTP = lazy(() => import("./Pages/VerifyOTP/VerifyOTP"));
const ErrorPage = lazy(() => import("./Pages/ErrorPage/ErrorPage"));

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