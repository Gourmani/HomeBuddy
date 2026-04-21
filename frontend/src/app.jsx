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

function App() {
  return (
  <>
      <Navbar /> 
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/*  Only MAID can access */}
      <Route
        path="/maid-dashboard"
        element={
          <ProtectedRoute role="maid">
            <MaidDashboard />
          </ProtectedRoute>
        }
      />

      {/*  Anyone logged in can see */}
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

      <Route
        path="/user-dashboard"
        element={
          <ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>}/>
     <Route path="/choose-role" element={<ChooseRole />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/maid-profile" element={<MaidProfile />} />
    </Routes>
    </>

        
  );
}

export default App;