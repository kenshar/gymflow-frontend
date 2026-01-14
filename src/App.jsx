import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Upcoming from "./components/Upcoming";
import Footer from "./components/Footer";

function App() {
  return (
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
  );
}

export default App;