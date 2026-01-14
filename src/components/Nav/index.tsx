import logo from "@/assets/images/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useLocation, useNavigate } from "react-router-dom";

const Nav = () => {
  const { t, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { key: "team", section: "team", hide: false },
    { key: "careers", section: "careers", hide: false },
    { key: "contact", section: "contact", hide: false },
  ] as const;

  type NavKey = (typeof navItems)[number]["key"];

  const scrollToSection = (id: string, behavior: ScrollBehavior = "smooth") => {
    document.getElementById(id)?.scrollIntoView({ behavior });
  };

  const scrollToTop = (behavior: ScrollBehavior = "auto") => {
    window.scrollTo({ top: 0, left: 0, behavior });
  };

  const goHomeAndScroll = (section: string) => {
    // If we're already on /home, just scroll
    if (location.pathname === "/home") {
      scrollToSection(section);
      return;
    }

    // Navigate to /home, then scroll after DOM paints
    navigate("/home", { replace: false });
    requestAnimationFrame(() => {
      scrollToTop();
      // small delay to ensure section exists after route transition
      setTimeout(() => scrollToSection(section), 0);
    });
  };

  const handleNav = (key: NavKey) => {
    if (key === "careers") {
      // If not on /careers, go there; if already there, just scroll top
      if (location.pathname !== "/careers") {
        navigate("/careers", { replace: false });
        requestAnimationFrame(() => scrollToTop());
      } else {
        scrollToTop();
      }
      return;
    }

    // For all other items: if on /careers, go to /home and scroll to section
    // Otherwise just go/scroll on /home
    goHomeAndScroll(key);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="px-8 my-12">
        <div className="h-20 flex items-center">
          {/* Left: logo */}
          <a href="/" className="flex items-center">
            <img
              src={logo}
              alt={t("hero.logoAlt")}
              className="h-48 w-48 object-contain"
            />
          </a>

          {/* Right group: nav + controls */}
          <div className="ml-auto flex items-center gap-450px">
            {/* Nav links */}
            <div className="hidden md:flex items-center gap-2 me-4">
              {navItems
                .filter((item) => !item.hide)
                .map((item) => (
                  <Button
                    key={item.key}
                    onClick={() => handleNav(item.key)}
                    variant="ghost"
                    className="
                       h-10 px-4 rounded-full
                      text-base font-medium
                      gap-2
                      backdrop-blur
                      transition-all duration-200 ease-out
                      hover:border hover:border-white/10
                      hover:bg-white/10
                      hover:-translate-y-[1px]
                      hover:shadow-md
                      active:translate-y-0
                    "
                  >
                    {t(`nav.${item.key}`)}
                  </Button>
                ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Language dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="
                      h-10 px-4 rounded-full
                      text-base font-medium
                      gap-2
                      bg-white/5
                      border border-white/10
                      backdrop-blur
                      transition-all duration-200 ease-out
                      hover:bg-white/10
                      hover:-translate-y-[1px]
                      hover:shadow-md
                      active:translate-y-0
                    "
                  >
                    <Globe className="h-5 w-5" />
                    <span className="hidden sm:inline">
                      {t("lang.current")}
                    </span>
                    <span className="sm:hidden">{t("lang.short")}</span>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="bg-popover border-border"
                >
                  <DropdownMenuItem
                    onClick={() => setLanguage("en")}
                    className="cursor-pointer hover:bg-accent text-base"
                  >
                    {t("lang.en")}
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => setLanguage("pt")}
                    className="cursor-pointer hover:bg-accent text-base"
                  >
                    {t("lang.pt")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <a
                href="https://calendly.com/our-brand"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center justify-center
                  h-10 px-6 rounded-full
                  text-base font-semibold
                  text-foreground
                  bg-white/5
                  border border-white/15
                  backdrop-blur
                  transition-all duration-200 ease-out
                  hover:bg-white/10
                  hover:-translate-y-[1px]
                  hover:shadow-lg
                  active:translate-y-0
                  whitespace-nowrap
                "
              >
                {t("cta.bookCall")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
