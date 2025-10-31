import logo from "@/assets/logo.jpeg";

const Index = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-brand-subtle opacity-70" />
      
      {/* Animated gradient orbs - larger and more prominent */}
      <div className="absolute top-0 left-0 h-[600px] w-[600px] rounded-full bg-primary/30 blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-accent/30 blur-[120px] animate-pulse-glow" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-secondary/20 blur-[100px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
      
      {/* Grid pattern overlay for depth */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />
      
      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 text-center animate-fade-in">
        {/* Logo with enhanced styling */}
        <div className="mb-12 md:mb-16 animate-float">
          <div className="relative">
            {/* Glow effect behind logo */}
            <div className="absolute inset-0 blur-3xl opacity-50 bg-gradient-brand rounded-full scale-110" />
            <img 
              src={logo} 
              alt="Our Brand Logo" 
              className="relative h-64 w-auto md:h-80 lg:h-96 object-contain animate-glow"
            />
          </div>
        </div>
        
        {/* Coming Soon Text with enhanced gradient */}
        <h1 className="mb-8 text-6xl font-bold tracking-tight md:text-7xl lg:text-8xl xl:text-9xl">
          <span className="bg-gradient-brand bg-clip-text text-transparent animate-pulse-glow">
            Coming Soon
          </span>
        </h1>
        
        {/* Tagline with better styling */}
        <p className="mb-12 max-w-3xl text-xl text-foreground/80 md:text-2xl lg:text-3xl font-light leading-relaxed">
          Something extraordinary is on the horizon.<br />
          <span className="text-primary/90">Stay tuned for innovation.</span>
        </p>
        
        {/* Enhanced decorative elements */}
        <div className="flex gap-4 items-center">
          <div className="h-1 w-16 rounded-full bg-gradient-brand animate-pulse-glow" />
          <div className="h-3 w-3 rounded-full bg-primary animate-pulse-glow" style={{ animationDelay: "0.5s" }} />
          <div className="h-1 w-16 rounded-full bg-gradient-brand animate-pulse-glow" />
        </div>
      </main>
    </div>
  );
};

export default Index;
