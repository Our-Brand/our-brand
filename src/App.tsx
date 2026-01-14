import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/providers/LanguageProvider";
import { Analytics } from "@vercel/analytics/react";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import Careers from "@/pages/Careers";
import ComingSoon from "@/pages/ComingSoon";
import Layout from "@/components/Layout";
import WaveLines from "@/components/WaveLines";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <div className="relative min-h-screen">
          <div className="fixed inset-0 -z-10 pointer-events-none">
            <WaveLines />
          </div>

          <Toaster />
          <Sonner />

          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ComingSoon />} />
              <Route path="/coming-soon" element={<ComingSoon />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route
                path="/terms-and-conditions"
                element={<TermsAndConditions />}
              />
              <Route path="/404" element={<NotFound />} />

              <Route element={<Layout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/careers" element={<Careers />} />
              </Route>

              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </BrowserRouter>

          <Analytics />
        </div>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
