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
import Auth from "@/pages/Auth";
import ProjectsHub from "@/pages/ProjectsHub";
import ProjectPanel from "@/pages/ProjectPanel";

import { AuthProvider } from "@/providers/AuthProvider";
import ProtectedRoute from "@/routes/ProtectedRoute";
import PublicOnlyRoute from "@/routes/PublicOnlyRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
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
                <Route
                  path="/"
                  element={<Navigate to="/coming-soon" replace />}
                />
                <Route path="/coming-soon" element={<ComingSoon />} />

                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route
                  path="/terms-and-conditions"
                  element={<TermsAndConditions />}
                />
                <Route path="/404" element={<NotFound />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/project/:id" element={<ProjectPanel />} />
                  <Route
                    path="/project"
                    element={<Navigate to="/projects" replace />}
                  />
                </Route>

                <Route element={<Layout />}>
                  {/* public */}
                  <Route path="/home" element={<Home />} />
                  <Route path="/careers" element={<Careers />} />

                  {/* /auth is only accessible when NOT authed */}
                  <Route element={<PublicOnlyRoute />}>
                    <Route path="/auth" element={<Auth />} />
                  </Route>

                  {/* protected */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/projects" element={<ProjectsHub />} />
                  </Route>
                </Route>

                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </BrowserRouter>

            <Analytics />
          </div>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
