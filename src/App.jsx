import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "./lib/auth";
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

// Protected Route component
const ProtectedRoute = ({ children, user, loading }) => {
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <Router basename="/gymflow-frontend">
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
        <Route path="/admin" element={<ProtectedRoute user={user} loading={loading}><AdminPage /></ProtectedRoute>} />
        <Route path="/admin/workout-logging" element={<ProtectedRoute user={user} loading={loading}><WorkoutLogging /></ProtectedRoute>} />
        <Route path="/admin/member/:id" element={<ProtectedRoute user={user} loading={loading}><MemberProfile /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute user={user} loading={loading}><Dashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;