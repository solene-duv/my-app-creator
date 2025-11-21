import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Shield, BookOpen, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";

const OwnerJourney = () => {
  const navigate = useNavigate();
  const [showCoursePlaceholder, setShowCoursePlaceholder] = useState(false);

  const handleStartSimulation = () => {
    toast.info("Owner Simulation Coming Soon", {
      description: "We're building an experience focused on wealth management and financial security.",
    });
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
              onClick={() => navigate("/")}
              className="gap-2 text-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
            <h1 className="text-xl font-bold text-primary font-mono">Owner Journey</h1>
            <div className="w-24" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-block p-4 bg-accent/10 rounded-full mb-6">
              <Shield className="h-16 w-16 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              The Owner Path
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Build a stable and comfortable financial situation. Master systems to earn better, manage smarter, and stay secure.
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Start Simulation Card */}
            <Card className="bg-slate-900 border-primary/20 p-8 hover:border-primary/40 transition-all cursor-pointer group">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <div className="inline-block p-3 bg-accent/10 rounded-lg mb-4 group-hover:bg-accent/20 transition-colors">
                    <Shield className="h-8 w-8 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">
                    Start Simulation
                  </h2>
                  <p className="text-muted-foreground">
                    Experience practical tools and scenarios that help optimize money management and day-to-day financial life.
                  </p>
                  <div className="mt-4 inline-block px-3 py-1 bg-accent/20 text-accent text-sm rounded-full">
                    Coming Soon
                  </div>
                </div>
                <Button
                  onClick={handleStartSimulation}
                  className="w-full mt-auto bg-accent hover:bg-accent/80 text-slate-950 font-semibold py-6"
                >
                  Launch Simulation
                </Button>
              </div>
            </Card>

            {/* Explore Content Card */}
            <Card className="bg-slate-900 border-primary/20 p-8 hover:border-primary/40 transition-all cursor-pointer group">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <div className="inline-block p-3 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 transition-colors">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">
                    Explore Content
                  </h2>
                  <p className="text-muted-foreground">
                    Access courses and resources on wealth management, passive income strategies, and financial security.
                  </p>
                  <div className="mt-4 inline-block px-3 py-1 bg-primary/20 text-primary text-sm rounded-full">
                    Coming Soon
                  </div>
                </div>
                <Button
                  onClick={() => setShowCoursePlaceholder(true)}
                  variant="outline"
                  className="w-full mt-auto border-primary text-primary hover:bg-primary hover:text-slate-950 font-semibold py-6"
                >
                  View Courses
                </Button>
              </div>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Your owner journey experience is currently being developed. Check back soon for updates.
            </p>
          </div>
        </div>
      </div>

      {/* Course Placeholder Dialog */}
      <Dialog open={showCoursePlaceholder} onOpenChange={setShowCoursePlaceholder}>
        <DialogContent className="bg-slate-900 border-primary/20">
          <DialogHeader>
            <DialogTitle className="text-2xl text-foreground">Course Library</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Coming Soon
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <p className="text-foreground mb-4">
              The owner course library will include:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Personal finance fundamentals</li>
              <li>• Investment strategies for stability</li>
              <li>• Passive income creation</li>
              <li>• Tax optimization techniques</li>
              <li>• Risk management and insurance</li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OwnerJourney;
