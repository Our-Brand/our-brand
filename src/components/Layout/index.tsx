import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RouteTransitions from "@/utils/RouteTransitions";

const Layout = () => {
  return (
    <div className="relative min-h-[100svh]">
      <Nav />

      <main>
        <RouteTransitions />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
