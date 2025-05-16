
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Perfil from "./pages/Perfil";
import Familia from "./pages/Familia";
import Documentos from "./pages/Documentos";
import Doacoes from "./pages/Doacoes";
import Informativos from "./pages/Informativos";
import Lutas from "./pages/Lutas";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/familia" element={<Familia />} />
          <Route path="/documentos" element={<Documentos />} />
          <Route path="/doacoes" element={<Doacoes />} />
          <Route path="/informativos" element={<Informativos />} />
          <Route path="/lutas" element={<Lutas />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
