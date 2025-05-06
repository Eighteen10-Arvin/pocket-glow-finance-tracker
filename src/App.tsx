
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Detect if we're running in a mobile environment
const isMobileApp = 
  /Android/i.test(navigator.userAgent) || 
  /iPhone|iPad|iPod/i.test(navigator.userAgent);

// Apply mobile-specific styles if needed
if (isMobileApp) {
  document.documentElement.classList.add('mobile-app');
}

// Private route component
const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("sb-ainpncogvhckvqqsphrd-auth-token");
  return isAuthenticated ? element : <Navigate to="/auth" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<PrivateRoute element={<Index />} />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
