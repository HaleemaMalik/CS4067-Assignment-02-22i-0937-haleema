import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Events from "./pages/Events";
import Register from "./pages/Register";
import Booking from "./pages/Booking";
import Notifications from "./pages/Notifications";
import Navbar from "./components/Navbar";

function AppRouter() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/events" element={<Events />} />  {/* Ensure this exists */}
        <Route path="/booking" element={<Booking />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;