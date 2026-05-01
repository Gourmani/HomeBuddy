import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MaidDashboard from "./pages/MaidDashboard";
import MaidList from "./pages/MaidList";
import ProtectedRoute from "./components/ProtectedRoute";
import MaidDetails from "./pages/maidDetails";
import UserDashboard from "./pages/UserDashboard";
import ChooseRole from "./pages/ChooseRole";
import UserProfile from "./pages/UserProfile";
import MaidProfile from "./pages/MaidProfile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Footer from "./components/Footer";
import Feedback from "./pages/Feedback";
import "./styles/responsive.css";

{/* 
import PhoneEntry from "./pages/PhoneEntry";
import VerifyPhoneOTP from "./pages/VerifyPhoneOTP";// this is different from email OTP verification, it's for phone-based login/signup
import SetPassword from "./pages/SetPassword";
 */}

// NEW IMPORTS
import VerifyOTP from "./pages/VerifyOTP"; 

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/choose-role" element={<ChooseRole />} />

        {/* OTP VERIFICATION ROUTE */}
        <Route path="/verify-otp" element={<VerifyOTP />} />

        {/* PROTECTED ROUTES */}

        {/* Only MAID can access */}
        <Route
          path="/maid-dashboard"
          element={
            <ProtectedRoute role="maid">
              <MaidDashboard />
            </ProtectedRoute>
          }
        />

        {/* Any logged-in user */}
        <Route
          path="/maids"
          element={
            <ProtectedRoute>
              <MaidList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/maids/:id"
          element={
            <ProtectedRoute>
              <MaidDetails />
            </ProtectedRoute>
          }
        />

        {/* Only USER */}
        <Route path="/user-dashboard"element={
            <ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>}/>

        {/* PROFILE ROUTES */}
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/maid-profile" element={<MaidProfile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/feedback" element={<Feedback />} />


        {/*<Route path="/phone-entry" element={<PhoneEntry />} />
        <Route path="/verify-phone-otp" element={<VerifyPhoneOTP />} />
        <Route path="/set-password" element={<SetPassword />} />*/}

      </Routes>
      <Footer />
    </>
  );
}

export default App;
