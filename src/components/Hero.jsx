import react from "react";

const Hero = () => {
  return (
    <section
      id="hero"
      className="h-screen bg-hero-pattern bg-cover bg-center flex items-center"
    >
      <div className="container mx-auto px-6 text-center">
        <h1 className="font-display text-5xl md:text-7xl mb-6 text-white drop-shadow-lg">
          WELCOME TO <span className="gradient-text">GYMFLOW</span>
        </h1>
        <p className="font-body text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 drop-shadow-md">
          Your journey to a healthier, stronger you starts here. Join us and 
          transform your body and mind with world-class facilities and expert guidance.
        </p>
      </div>
    </section>
  );
};

export default Hero;