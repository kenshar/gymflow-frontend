import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Upcoming from "./components/Upcoming";
import Footer from "./components/Footer";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import WorkoutLogging from "./pages/WorkoutLogging";
import MemberProfile from "./pages/MemberProfile";
import Dashboard from "./pages/Dashboard";
import { isAuthenticated } from "./lib/api";

// Protected Route component
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-background">
              <Header />
              <main>
                <Hero />
                <About />
                <Services />
                <Upcoming />
              </main>
              <Footer />
            </div>
          }
        />

        {/* Auth Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
        <Route path="/admin/workout-logging" element={<ProtectedRoute><WorkoutLogging /></ProtectedRoute>} />
        <Route path="/admin/member/:id" element={<ProtectedRoute><MemberProfile /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;