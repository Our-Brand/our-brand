import { useLocation } from "react-router-dom";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RouteTransitions from "@/utils/RouteTransitions";

const Layout = () => {
  const { pathname } = useLocation();

  const hideFooter = pathname === "/auth" || pathname.startsWith("/project");

  return (
    <div className="relative min-h-[100svh]">
      <Nav />

      <main>
        <RouteTransitions />
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
