import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameProvider } from "./contexts/GameContext";
import NewIndex from "./pages/NewIndex";
import FounderJourney from "./pages/FounderJourney";
import OwnerJourney from "./pages/OwnerJourney";
import ImpactHeroJourney from "./pages/ImpactHeroJourney";
import ContentLibrary from "./pages/ContentLibrary";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import SkillTree from "./pages/SkillTree";
import Marketplace from "./pages/Marketplace";
import UnicornGame from "./pages/UnicornGame";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GameProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NewIndex />} />
            <Route path="/founder-journey" element={<FounderJourney />} />
            <Route path="/owner-journey" element={<OwnerJourney />} />
            <Route path="/impact-hero-journey" element={<ImpactHeroJourney />} />
            <Route path="/content-library" element={<ContentLibrary />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/skill-tree" element={<SkillTree />} />
            <Route path="/bnp-investissement" element={<Marketplace />} />
            <Route path="/unicorn-game" element={<UnicornGame />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </GameProvider>
  </QueryClientProvider>
);

export default App;
