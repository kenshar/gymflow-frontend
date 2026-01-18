const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video background */}
      <video 
        autoPlay 
        loop 
        muted 
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/gym-background.mp4" type="video/mp4" />
      </video>
      
      {/* Fallback background for browsers that don't support video */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary" />
      
      {/* Gradient overlay from left for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 via-40% to-transparent" />
      
      {/* Content - Left aligned */}
      <div className="container mx-auto px-6 relative z-10 pt-32 pb-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 text-left">
            <span className="text-blue-500">TRANSFORM YOUR</span>
            <span className="block gradient-text">BODY & MIND</span>
          </h2>
          <p className="font-body text-lg md:text-xl text-white max-w-xl mb-10 text-left">
            Join GymFlow and experience the ultimate fitness journey. 
            State-of-the-art equipment, expert trainers, and a community that motivates.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
