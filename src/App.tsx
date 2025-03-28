import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
import { Toaster } from "sonner";
import Loader from "./Components/Loader";
import ProtectedRoute from "./Pages/Utils/ProtectedRoute";

const Login = lazy(() => import("./Pages/login/Login"));
const AdminPage = lazy(() => import("./Pages/admin_page/AdminPage"));
const CRMPage = lazy(() => import("./Pages/crm_page/CRMPage"));
const BillingPage = lazy(() => import("./Pages/billing_page/BillingPage"));
const ResetPassword = lazy(() => import("./Pages/forgot_password/ResetPassword"));
const ForgotPassword = lazy(() => import("./Pages/forgot_password/ForgotPassword"));
const Register = lazy(() => import("./Pages/register/Register"));
const VerifyOTP = lazy(() => import("./Pages/forgot_password/VerifyOTP"));
const ErrorPage = lazy(() => import("./Pages/Utils/ErrorPage"));
const ForbiddenPage = lazy(() => import("./Pages/Utils/ForbiddenPage"));

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

            {/* Protected Routes */}
            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route path="/admin" element={<AdminPage />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["ADMIN", "CRM"]} />}>
              <Route path="/crm" element={<CRMPage />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["ADMIN", "BILLING"]} />}>
              <Route path="/billing" element={<BillingPage />} />
            </Route>

            {/* Forbidden Page */}
            <Route path="/forbidden" element={<ForbiddenPage />} />

            {/* Catch-All for 404 Errors */}
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}
