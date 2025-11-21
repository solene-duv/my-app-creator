import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { OnboardingQuiz } from "@/components/OnboardingQuiz";
import { useNavigate } from "react-router-dom";
import bnpLogo from "@/assets/bnp-paribas-logo.png";

type Profile = "founder" | "owner" | "impactHero";

const NewIndex = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const navigate = useNavigate();

  const handleQuizComplete = (profile: Profile) => {
    // Route to the appropriate journey page
    const routes: Record<Profile, string> = {
      founder: "/founder-journey",
      owner: "/owner-journey",
      impactHero: "/impact-hero-journey",
    };
    
    navigate(routes[profile]);
  };

  const handleLoginClick = () => {
    console.log("Login clicked - placeholder interaction");
  };

  if (showQuiz) {
    return <OnboardingQuiz onComplete={handleQuizComplete} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-slate-950 to-accent/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      {/* Header */}
      <header className="relative z-10 w-full py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <img 
            src={bnpLogo} 
            alt="BNP Paribas" 
            className="h-10 md:h-12 object-contain"
          />
          
          {/* Login Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLoginClick}
            className="gap-2 text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Log on</span>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight leading-tight">
            Stop saving,
            <br />
            start building
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Play your financial future and unlock strategies to build real wealth
          </p>

          {/* CTA Button */}
          <div className="pt-8">
            <Button
              onClick={() => setShowQuiz(true)}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-slate-950 font-bold text-xl px-16 py-8 rounded-full shadow-2xl hover:shadow-primary/50 transition-all hover:scale-105 hover:-translate-y-1"
            >
              Start
            </Button>
          </div>

          {/* Optional subtle hint text */}
          <p className="text-sm text-muted-foreground/60 pt-4">
            Answer a few questions to personalize your experience
          </p>
        </div>
      </main>
    </div>
  );
};

export default NewIndex;
