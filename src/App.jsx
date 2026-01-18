import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Upcoming from "./components/Upcoming";
import Footer from "./components/Footer";
import AdminPage from "./pages/AdminPage";
import WorkoutLogging from "./pages/WorkoutLogging";
import MemberProfile from "./pages/MemberProfile";
import Dashboard from "./pages/Dashboard";

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
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/workout-logging" element={<WorkoutLogging />} />
        <Route path="/admin/member/:id" element={<MemberProfile />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
