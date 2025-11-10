import logo from "@/assets/logo.png";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Linkedin, Users, Target, Heart } from "lucide-react";

const Index = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
          
          <div className="hidden md:flex gap-8">
            <button onClick={() => scrollToSection('hero')} className="text-foreground/80 hover:text-primary transition-colors">Home</button>
            <button onClick={() => scrollToSection('mission')} className="text-foreground/80 hover:text-primary transition-colors">Mission</button>
            <button onClick={() => scrollToSection('team')} className="text-foreground/80 hover:text-primary transition-colors">Team</button>
            <button onClick={() => scrollToSection('contact')} className="text-foreground/80 hover:text-primary transition-colors">Contact</button>
          </div>

          {/* Sticky Calendly Button */}
          <a 
            href="https://calendly.com/your-link" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gradient-brand text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity shadow-lg"
          >
            Book a Call
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-brand-subtle opacity-70" />
        <div className="absolute top-0 left-0 h-[600px] w-[600px] rounded-full bg-primary/30 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-accent/30 blur-[120px] animate-pulse-glow" style={{ animationDelay: "1s" }} />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="mb-12 animate-float inline-block">
            <img 
              src={logo} 
              alt="Our Brand Logo" 
              className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-glow mx-auto"
            />
          </div>
          
          <h1 className="mb-6 text-5xl md:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-brand bg-clip-text text-transparent">
              Welcome to Our Company
            </span>
          </h1>
          
          <p className="mb-8 max-w-2xl mx-auto text-xl text-foreground/80 leading-relaxed">
            Transforming ideas into reality with innovation and excellence
          </p>
          
          <Button 
            onClick={() => scrollToSection('contact')}
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6"
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section id="mission" className="py-24 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-brand bg-clip-text text-transparent">
            Our Mission & Values
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="bg-card border-border shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_8px_40px_hsl(190,90%,55%,0.3)] transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-brand flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  We strive to deliver exceptional solutions that empower businesses to reach their full potential. 
                  Our commitment is to provide innovative, reliable, and scalable services that drive success 
                  and create lasting impact in the digital landscape.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_8px_40px_hsl(270,80%,60%,0.3)] transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-brand flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Innovation at the core of everything we do</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    <span>Integrity and transparency in all relationships</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Excellence through continuous improvement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Customer success as our primary goal</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-brand bg-clip-text text-transparent">
            Meet Our Team
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "John Doe", role: "CEO & Founder", bio: "Visionary leader with 15+ years of experience" },
              { name: "Jane Smith", role: "CTO", bio: "Tech innovator passionate about cutting-edge solutions" },
              { name: "Mike Johnson", role: "Head of Design", bio: "Creative director focused on user-centric design" },
            ].map((member, index) => (
              <Card key={index} className="bg-card border-border shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_8px_40px_hsl(220,90%,55%,0.3)] transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-brand mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-primary">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">{member.bio}</p>
                  <div className="flex justify-center mt-4">
                    <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-brand bg-clip-text text-transparent">
            Get In Touch
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="bg-card border-border shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a message</CardTitle>
                <CardDescription>We'll get back to you as soon as possible</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Tell us about your project..." className="mt-1 min-h-[120px]" />
                  </div>
                  <Button className="w-full bg-gradient-brand text-primary-foreground hover:opacity-90">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
              <CardHeader>
                <CardTitle className="text-2xl">Contact Information</CardTitle>
                <CardDescription>Find us through these channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">contact@company.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground">123 Business St, Suite 100<br />San Francisco, CA 94105</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/20 border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;