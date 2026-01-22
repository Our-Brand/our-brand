import logo from "@/assets/images/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Globe, LogOut, Menu, User } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useLocation, useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/useMobile";
import { useAuth } from "@/hooks/useAuth";

const Nav = () => {
  const { t, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  const { user, token, logout } = useAuth();
  const isAuthed = !!token || !!user;
  const navItems = [
    { key: "contact", section: "contact", hide: false },
    {
      key: "projects",
      section: "projects",
      hide: !isAuthed || (user?.subscription ?? 0) === 0,
    },
    { key: "careers", section: "careers", hide: false },
    { key: "auth", section: "auth", hide: false },
  ] as const;

  type NavKey = (typeof navItems)[number]["key"];

  const scrollToSection = (id: string, behavior: ScrollBehavior = "smooth") => {
    document.getElementById(id)?.scrollIntoView({ behavior });
  };

  const scrollToTop = (behavior: ScrollBehavior = "auto") => {
    window.scrollTo({ top: 0, left: 0, behavior });
  };

  const goHomeAndScroll = (section: string) => {
    if (location.pathname === "/home") {
      scrollToSection(section);
      return;
    }

    navigate(`/home#${section}`, { replace: false });
    requestAnimationFrame(() => {
      scrollToTop();
      setTimeout(() => scrollToSection(section), 0);
    });
  };

  const handleNav = (key: NavKey) => {
    if (key === "careers") {
      if (location.pathname !== "/careers") {
        navigate("/careers", { replace: false });
        requestAnimationFrame(() => scrollToTop());
      } else {
        scrollToTop();
      }
      return;
    }

    if (key === "projects") {
      if (location.pathname !== "/projects") {
        navigate("/projects", { replace: false });
        requestAnimationFrame(() => scrollToTop());
      } else {
        scrollToTop();
      }
      return;
    }

    if (key === "auth") {
      if (location.pathname !== "/auth") {
        navigate("/auth", { replace: false });
        requestAnimationFrame(() => scrollToTop());
      } else {
        scrollToTop();
      }
      return;
    }

    goHomeAndScroll(key);
  };

  const handleLogout = async () => {
    // TODO: INSERT LOGOUT API REQUEST HERE
    // await fetch("/api/logout", { method: "POST" });

    logout();
    navigate("/home", { replace: false });
    requestAnimationFrame(() => scrollToTop());
  };

  const visibleNavItems = navItems.filter(
    (item) => !item.hide && item.key !== "auth",
  );

  const dropdownNavItems = navItems.filter(
    (item) => (item.key === "contact" || item.key === "careers") && !item.hide,
  );

  const topNavItems = navItems.filter(
    (item) => item.key === "projects" && !item.hide,
  );

  const displayName =
    user?.name?.trim() ||
    (user?.id ? `#${String(user.name).slice(-6)}` : "") ||
    "";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-8 my-12">
        <div className="h-20 flex items-center">
          {/* MOBILE */}
          {isMobile ? (
            <div className="relative w-full h-20 flex items-center">
              {/* Hamburger (left) */}
              <div className="absolute left-0 flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="
                        h-10 w-10 rounded-full
                        bg-white/5
                        border border-white/10
                        backdrop-blur
                        transition-all duration-200 ease-out
                        hover:bg-white/10
                        hover:-translate-y-[1px]
                        hover:shadow-md
                        active:translate-y-0
                      "
                      aria-label={t("nav.menu") ?? "Menu"}
                    >
                      <Menu className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="start"
                    className="bg-popover border-border min-w-56"
                  >
                    {visibleNavItems.map((item) => (
                      <DropdownMenuItem
                        key={item.key}
                        onClick={() => handleNav(item.key)}
                        className="cursor-pointer hover:bg-accent text-base"
                      >
                        {t(`nav.${item.key}`)}
                      </DropdownMenuItem>
                    ))}

                    <DropdownMenuSeparator />

                    {/* Auth */}
                    <DropdownMenuItem
                      onClick={() => handleNav("auth")}
                      className="cursor-pointer hover:bg-accent text-base"
                    >
                      {t("nav.auth")}
                    </DropdownMenuItem>

                    {/* Logged-in logout */}
                    {isAuthed ? (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={handleLogout}
                          className="cursor-pointer text-base text-red-400 focus:text-red-400"
                        >
                          <LogOut className="me-2" />
                          {t("nav.logout")}
                        </DropdownMenuItem>
                      </>
                    ) : null}

                    <DropdownMenuSeparator />

                    {/* Language */}
                    <DropdownMenuItem
                      onClick={() => setLanguage("en")}
                      className="cursor-pointer hover:bg-accent text-base"
                    >
                      <Globe className="h-4 w-4 me-2" />
                      {t("lang.en")}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setLanguage("pt")}
                      className="cursor-pointer hover:bg-accent text-base"
                    >
                      <Globe className="h-4 w-4 me-2" />
                      {t("lang.pt")}
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    {/* Book call */}
                    <DropdownMenuItem asChild>
                      <a
                        href="https://calendly.com/our-brand"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer text-base"
                      >
                        {t("cta.bookCall")}
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Logo (center) */}
              <a
                href="/"
                className="mx-auto flex items-center justify-center"
                aria-label={t("hero.logoAlt")}
              >
                <img
                  src={logo}
                  alt={t("hero.logoAlt")}
                  className="h-24 w-24 object-contain"
                />
              </a>

              {/* Right: user dropdown */}
              <div className="absolute right-0 flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="
                        inline-flex items-center justify-center
                        h-10 w-10 rounded-full
                        text-foreground
                        bg-white/5
                        border border-white/15
                        backdrop-blur
                        transition-all duration-200 ease-out
                        hover:bg-white/10
                        hover:-translate-y-[1px]
                        hover:shadow-lg
                        active:translate-y-0
                      "
                      aria-label="user"
                    >
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="bg-popover border-border min-w-40"
                  >
                    {isAuthed ? (
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="cursor-pointer text-base text-red-400 focus:text-red-400"
                      >
                        <LogOut className="me-2" />
                        {t("nav.logout")}
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                        onClick={() => handleNav("auth")}
                        className="cursor-pointer hover:bg-accent text-base"
                      >
                        {t("nav.auth")}
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ) : (
            /* DESKTOP */
            <>
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
                  {/* Projects stays as normal button */}
                  {topNavItems.map((item) => (
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

                  {/* Contact + Careers in dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
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
                        aria-label={t("nav.more")}
                      >
                        {t("nav.more")}
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="bg-popover border-border min-w-32"
                    >
                      {dropdownNavItems.map((item) => (
                        <DropdownMenuItem
                          key={item.key}
                          onClick={() => handleNav(item.key)}
                          className="cursor-pointer hover:bg-accent text-base"
                        >
                          {t(`nav.${item.key}`)}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4 me-4">
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

                {/* User: name (left) + icon with dropdown when authed */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="
                        inline-flex items-center justify-center
                        h-10 rounded-full
                        text-foreground
                        bg-white/5
                        border border-white/15
                        backdrop-blur
                        transition-all duration-200 ease-out
                        hover:bg-white/10
                        hover:-translate-y-[1px]
                        hover:shadow-lg
                        active:translate-y-0
                        px-3
                        gap-2
                      "
                      aria-label="user"
                      onClick={() => {
                        if (!isAuthed) handleNav("auth");
                      }}
                    >
                      {isAuthed && displayName ? (
                        <span className="text-[12px] font-medium text-white/85 max-w-[140px] truncate">
                          {displayName}
                        </span>
                      ) : null}
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>

                  {isAuthed ? (
                    <DropdownMenuContent
                      align="end"
                      className="bg-popover border-border min-w-40"
                    >
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="cursor-pointer text-base text-red-400 focus:text-red-400"
                      >
                        <LogOut className="me-2" />
                        {t("nav.logout")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  ) : null}
                </DropdownMenu>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
