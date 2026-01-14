import Header from "./Header";
import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import Upcoming from "./Upcoming";
import Footer from "./Footer";

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