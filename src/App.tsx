import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
import { Toaster } from "sonner";
import PageLoader from "./Components/PageLoader";

const Login = lazy(() => import("./Pages/Login/Login"));
const Dashboard = lazy(() => import("./Pages/Dashboard/Dashboard"));
const ResetPassword = lazy(
  () => import("./Pages/forgot_password/ResetPassword")
);
const ForgotPassword = lazy(
  () => import("./Pages/forgot_password/ForgotPassword")
);
const SetPassword = lazy(() => import("./Pages/SetPassword/SetPassword"));
const VerifyOTP = lazy(() => import("./Pages/forgot_password/VerifyOTP"));
const ErrorPage = lazy(() => import("./Pages/Utils/ErrorPage"));
const ForbiddenPage = lazy(() => import("./Pages/Utils/ForbiddenPage"));

export default function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/verifyotp" element={<VerifyOTP />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/forbidden" element={<ForbiddenPage />} />
            <Route path="/set-password" element={<SetPassword />} />

            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}
