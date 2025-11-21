import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { OnboardingQuiz } from "@/components/OnboardingQuiz";
import { useNavigate } from "react-router-dom";

type Profile = "founder" | "owner" | "impactHero";

const NewIndex = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const navigate = useNavigate();

  const handleQuizComplete = (profile: Profile) => {
    // Mark onboarding as completed
    localStorage.setItem("hasCompletedOnboarding", "true");
    
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

  const handleStartClick = () => {
    // Check if user has already completed onboarding
    const hasCompleted = localStorage.getItem("hasCompletedOnboarding");
    if (hasCompleted === "true") {
      // User has already done quiz, take them to their last journey
      // For now, default to founder, but you could store their profile
      navigate("/founder-journey");
    } else {
      // Show quiz for first-time users
      setShowQuiz(true);
    }
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
          {/* Logo Text */}
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Play Paribas
          </h2>
          
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
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
            <span className="text-foreground">Stop saving,</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              start building
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Play your financial future and unlock strategies to build real wealth
          </p>

          {/* CTA Button */}
          <div className="pt-8">
            <Button
              onClick={handleStartClick}
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
