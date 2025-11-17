import { useLanguage } from "@/state/LanguageProvider";
import logo from "@/assets/images/logo.png";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Globe } from "lucide-react";


const Nav = () => {
  const { t, setLanguage } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Left: logo */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <a href="/">
            <img src={logo} alt={t("hero.logoAlt")} className="h-16 w-16 object-contain" />
          </a>
        </div>

        {/* Center: nav links */}
        <div className="hidden md:flex gap-8 items-center flex-none">
          <button onClick={() => scrollToSection("hero")} className="text-foreground/80 hover:text-primary transition-colors">
            {t("nav.home")}
          </button>
          <button onClick={() => scrollToSection("mission")} className="text-foreground/80 hover:text-primary transition-colors">
            {t("nav.mission")}
          </button>
          <button onClick={() => scrollToSection("team")} className="text-foreground/80 hover:text-primary transition-colors">
            {t("nav.team")}
          </button>
          <button onClick={() => scrollToSection("careers")} className="text-foreground/80 hover:text-primary transition-colors">
            {t("nav.careers")}
          </button>
          <button onClick={() => scrollToSection("contact")} className="text-foreground/80 hover:text-primary transition-colors">
            {t("nav.contact")}
          </button>
        </div>

        {/* Right: controls */}
        <div className="flex items-center gap-4 justify-end flex-1 min-w-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">{t("lang.current")}</span>
                <span className="sm:hidden">{t("lang.short")}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover border-border">
              <DropdownMenuItem onClick={() => setLanguage("en")} className="cursor-pointer hover:bg-accent">
                {t("lang.en")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("pt")} className="cursor-pointer hover:bg-accent">
                {t("lang.pt")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <a
            href="https://calendly.com/our-brand"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-brand text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity shadow-lg"
          >
            {t("cta.bookCall")}
          </a>
        </div>
      </div>
    </nav>
  );

}

export default Nav;