import logo from "@/assets/logo.jpeg";

const Index = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-brand-subtle opacity-50" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
      
      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 text-center animate-fade-in">
        {/* Logo */}
        <div className="mb-8 md:mb-12">
          <img 
            src={logo} 
            alt="Our Brand Logo" 
            className="h-48 w-auto md:h-64 lg:h-80 object-contain drop-shadow-2xl"
          />
        </div>
        
        {/* Coming Soon Text with gradient */}
        <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl xl:text-8xl">
          <span className="bg-gradient-brand bg-clip-text text-transparent">
            Coming Soon
          </span>
        </h1>
        
        {/* Tagline */}
        <p className="mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl lg:text-2xl">
          Something amazing is on the horizon. Stay tuned for the launch of our innovative platform.
        </p>
        
        {/* Decorative line */}
        <div className="h-1 w-24 rounded-full bg-gradient-brand animate-pulse-glow" />
      </main>
    </div>
  );
};

export default Index;
