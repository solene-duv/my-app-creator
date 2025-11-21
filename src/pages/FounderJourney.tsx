import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Rocket, BookOpen, ArrowLeft } from "lucide-react";

const FounderJourney = () => {
  const navigate = useNavigate();

  const handleStartSimulation = () => {
    navigate("/unicorn-game");
  };

  const handleExploreContent = () => {
    navigate("/content-library");
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header with back button */}
      <header className="fixed top-0 left-0 right-0 w-full bg-slate-900/95 backdrop-blur-md shadow-lg z-50 border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToHome}
              className="gap-2 text-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
            <h1 className="text-xl font-bold text-primary font-mono">Founder Journey</h1>
            <div className="w-24" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-block p-4 bg-primary/10 rounded-full mb-6">
              <Rocket className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              The Founder Path
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Master the art of building ambitious projects that scale. Learn strategies to accelerate growth and make tough decisions.
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Start Simulation Card */}
            <Card className="bg-slate-900 border-primary/20 p-8 hover:border-primary/40 transition-all cursor-pointer group">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <div className="inline-block p-3 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 transition-colors">
                    <Rocket className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">
                    Start Simulation
                  </h2>
                  <p className="text-muted-foreground">
                    Launch "The Unicorn Run" - a strategy-heavy simulation focused on growth, scaling, and making tough business decisions.
                  </p>
                </div>
                <Button
                  onClick={handleStartSimulation}
                  className="w-full mt-auto bg-primary hover:bg-primary/80 text-slate-950 font-semibold py-6"
                >
                  Launch Simulation
                </Button>
              </div>
            </Card>

            {/* Explore Content Card */}
            <Card className="bg-slate-900 border-primary/20 p-8 hover:border-primary/40 transition-all cursor-pointer group">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <div className="inline-block p-3 bg-accent/10 rounded-lg mb-4 group-hover:bg-accent/20 transition-colors">
                    <BookOpen className="h-8 w-8 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">
                    Explore Content
                  </h2>
                  <p className="text-muted-foreground">
                    Access curated courses, resources, and strategies designed specifically for founders building high-growth ventures.
                  </p>
                </div>
                <Button
                  onClick={handleExploreContent}
                  variant="outline"
                  className="w-full mt-auto border-accent text-accent hover:bg-accent hover:text-slate-950 font-semibold py-6"
                >
                  View Courses
                </Button>
              </div>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Your journey is customized based on your profile. Start with the simulation or explore the course library.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderJourney;
