import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lightbulb, Zap, TrendingDown, DollarSign, PieChart, CheckCircle2, Award, Target } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LearningProgress } from "@/components/learning/LearningProgress";
import { MilestoneCard } from "@/components/learning/MilestoneCard";
import { UnlockBanner } from "@/components/learning/UnlockBanner";

interface Course {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  isPremium?: boolean;
}

const courses: Course[] = [
  {
    id: "idea-to-code",
    title: "From Idea to First Code",
    description: "Turn your concept into a working prototype. Learn how to validate ideas and build your first version.",
    icon: Lightbulb,
    color: "text-yellow-500",
  },
  {
    id: "mvp-fast",
    title: "Building Your MVP Fast",
    description: "Ship quickly without sacrificing quality. Master lean development and rapid iteration techniques.",
    icon: Zap,
    color: "text-primary",
  },
  {
    id: "burn-rate",
    title: "Understanding Burn Rate",
    description: "Track your runway and manage cash flow. Learn how to calculate and optimize your monthly burn.",
    icon: TrendingDown,
    color: "text-red-500",
  },
  {
    id: "funding-works",
    title: "How Funding Works (Seed to Series B)",
    description: "Navigate the fundraising journey. Understand rounds, valuations, and equity dynamics.",
    icon: DollarSign,
    color: "text-green-500",
  },
  {
    id: "equity-dilution",
    title: "Equity, Dilution and Your Net Worth",
    description: "Protect your ownership while scaling. Calculate dilution and understand your stake's true value.",
    icon: PieChart,
    color: "text-accent",
  },
  {
    id: "bnp-wealth",
    title: "BNP Wealth Management — Special Module",
    description: "Exclusive insights into wealth management strategies for entrepreneurs. Unlock the BNP event.",
    icon: Award,
    color: "text-primary",
    isPremium: true,
  },
];

const ContentLibrary = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [completedModules, setCompletedModules] = useState<string[]>([
    "idea-to-code",
    "mvp-fast",
  ]);

  const handleBackToJourney = () => {
    navigate("/founder-journey");
  };

  const handleCompleteModule = (courseId: string) => {
    if (!completedModules.includes(courseId)) {
      setCompletedModules([...completedModules, courseId]);
    }
  };

  const totalModules = courses.length;
  const completedCount = completedModules.length;
  const bnpModuleCompleted = completedModules.includes("bnp-wealth");

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 w-full bg-slate-900/95 backdrop-blur-md shadow-lg z-50 border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToJourney}
              className="gap-2 text-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Journey
            </Button>
            <h1 className="text-xl font-bold text-primary font-mono">Course Library</h1>
            <div className="w-28" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Founder Course Library
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Master the skills you need to build and scale your venture
            </p>
            
            {/* Learning Progress */}
            <LearningProgress completed={completedCount} total={totalModules} />

            {/* Unlock Banner */}
            {bnpModuleCompleted && <UnlockBanner />}

            {/* Milestones */}
            <div className="max-w-3xl mx-auto mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Your Milestones</h2>
              <div className="grid gap-4">
                <MilestoneCard
                  title="Complete your first module"
                  description="Get started with your learning journey"
                  state="completed"
                  icon={<Target className="h-6 w-6 text-green-500" />}
                />
                <MilestoneCard
                  title="Complete two modules"
                  description="Build momentum in your founder education"
                  state="completed"
                  icon={<Target className="h-6 w-6 text-green-500" />}
                />
                <MilestoneCard
                  title="Finish 'Understanding Burn Rate'"
                  description="Master cash flow management fundamentals"
                  state={completedModules.includes("burn-rate") ? "completed" : "in-progress"}
                  icon={<TrendingDown className="h-6 w-6 text-accent" />}
                />
                <MilestoneCard
                  title="BNP Event Unlock"
                  description="Complete the BNP Wealth Management special module to unlock access to the exclusive BNP event on 24 November 2025"
                  state={bnpModuleCompleted ? "completed" : "locked"}
                  icon={<Award className="h-6 w-6 text-primary" />}
                  isPremium
                />
              </div>
            </div>
          </div>

          {/* Course Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => {
              const Icon = course.icon;
              const isCompleted = completedModules.includes(course.id);
              const isNext = course.id === "burn-rate" && !isCompleted;
              
              return (
                <Card
                  key={course.id}
                  onClick={() => !isCompleted && setSelectedCourse(course.id)}
                  className={`bg-slate-900 border-primary/20 p-6 transition-all ${
                    !isCompleted ? 'hover:border-primary/40 cursor-pointer' : 'opacity-75'
                  } ${isNext ? 'border-accent/50 shadow-accent/20 shadow-lg' : ''} ${
                    course.isPremium && 'bg-gradient-to-br from-slate-900 to-primary/10 border-primary/40'
                  } group`}
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`inline-block p-3 bg-slate-800 rounded-lg ${
                          !isCompleted && 'group-hover:bg-slate-700'
                        } transition-colors`}>
                          <Icon className={`h-8 w-8 ${course.color}`} />
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          {isCompleted && (
                            <CheckCircle2 className="h-6 w-6 text-green-500" />
                          )}
                          {course.isPremium && (
                            <span className="text-xs font-bold text-primary">★ PREMIUM</span>
                          )}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {course.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {course.description}
                      </p>
                    </div>
                    
                    {isCompleted ? (
                      <div className="w-full mt-auto py-3 text-center">
                        <span className="text-green-500 font-semibold flex items-center justify-center gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          Completed
                        </span>
                      </div>
                    ) : (
                      <Button
                        variant={isNext ? "default" : "outline"}
                        className={`w-full mt-auto ${
                          isNext 
                            ? 'bg-accent hover:bg-accent/80 text-slate-950' 
                            : course.isPremium
                            ? 'bg-primary hover:bg-primary/80 text-primary-foreground'
                            : 'border-primary/50 text-primary hover:bg-primary hover:text-slate-950'
                        }`}
                      >
                        {isNext ? 'Start Course' : 'View Course'}
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* BNP Wealth Management Module Dialog */}
      <Dialog open={selectedCourse === "bnp-wealth"} onOpenChange={() => setSelectedCourse(null)}>
        <DialogContent className="bg-slate-900 border-primary/20 max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl text-foreground flex items-center gap-3">
              <Award className="h-8 w-8 text-primary" />
              BNP Wealth Management — Special Module
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="bg-primary/10 p-6 rounded-lg border border-primary/30">
              <h3 className="text-xl font-bold text-primary mb-3">★ Premium Content</h3>
              <p className="text-foreground leading-relaxed">
                This exclusive module covers advanced wealth management strategies specifically designed for entrepreneurs who have successfully exited their ventures.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-primary mb-3">What You'll Learn</h3>
              <ul className="space-y-2 text-muted-foreground ml-6">
                <li>• Portfolio diversification strategies for high-net-worth individuals</li>
                <li>• Tax-efficient wealth structuring</li>
                <li>• Investment vehicles: from life insurance to private equity</li>
                <li>• Risk management and wealth preservation</li>
                <li>• Succession planning and legacy building</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-primary mb-3">Exclusive Event Access</h3>
              <p className="text-muted-foreground leading-relaxed">
                Complete this module to unlock your invitation to the BNP Paribas Wealth Management Event on 24 November 2025, where you'll network with other successful entrepreneurs and wealth management experts.
              </p>
            </div>

            <div className="pt-4">
              <Button
                onClick={() => {
                  handleCompleteModule("bnp-wealth");
                  setSelectedCourse(null);
                }}
                className="w-full bg-primary hover:bg-primary/80"
              >
                Complete Module & Unlock Event
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Course Detail Dialog - Demo for "How Funding Works" */}
      <Dialog open={selectedCourse === "funding-works"} onOpenChange={() => setSelectedCourse(null)}>
        <DialogContent className="bg-slate-900 border-primary/20 max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl text-foreground flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-green-500" />
              How Funding Works (Seed to Series B)
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Section 1 */}
            <div>
              <h3 className="text-xl font-bold text-primary mb-3">What is a Seed Round?</h3>
              <p className="text-muted-foreground leading-relaxed">
                A seed round is typically the first official equity funding stage. At this stage, you're raising capital to validate your product-market fit, build your initial team, and reach early milestones. Seed rounds usually range from $500K to $2M.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h3 className="text-xl font-bold text-primary mb-3">How Valuation is Calculated</h3>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Valuation is determined through negotiation between founders and investors, based on:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-6">
                <li>• Market size and growth potential</li>
                <li>• Traction metrics (users, revenue, growth rate)</li>
                <li>• Team experience and expertise</li>
                <li>• Competitive landscape</li>
                <li>• Stage and risk level</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h3 className="text-xl font-bold text-primary mb-3">Why Equity Dilution Happens</h3>
              <p className="text-muted-foreground leading-relaxed">
                When you raise money, investors buy ownership in your company. This means your percentage of ownership decreases (dilutes), even though the absolute value may increase as the company grows. Dilution is the cost of accessing capital to scale faster.
              </p>
            </div>

            {/* Section 4 - Example */}
            <div className="bg-slate-950 p-6 rounded-lg border border-primary/20">
              <h3 className="text-xl font-bold text-accent mb-3">Example: Raising $500K at $2M Post-Money</h3>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">Post-money valuation:</span> $2M (company value after investment)
                </p>
                <p>
                  <span className="font-semibold text-foreground">Investment amount:</span> $500K
                </p>
                <p>
                  <span className="font-semibold text-foreground">Investor ownership:</span> $500K ÷ $2M = <span className="text-accent font-bold">25%</span>
                </p>
                <p>
                  <span className="font-semibold text-foreground">Your dilution:</span> If you owned 100% before, you now own <span className="text-accent font-bold">75%</span>
                </p>
                <p className="text-sm pt-2 italic">
                  Note: You gave up 25% ownership to get $500K to accelerate growth. The key question is whether that capital will increase the company's value by more than the equity you gave up.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div>
              <h3 className="text-xl font-bold text-primary mb-3">Balancing Runway vs Ownership</h3>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Every fundraising decision involves a trade-off:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-6">
                <li>• <span className="font-semibold text-foreground">Raise too little:</span> Risk running out of cash before reaching next milestone</li>
                <li>• <span className="font-semibold text-foreground">Raise too much:</span> Dilute unnecessarily or take money at a lower valuation</li>
                <li>• <span className="font-semibold text-foreground">Optimal approach:</span> Raise enough for 18-24 months of runway to hit key metrics for next round</li>
              </ul>
            </div>

            {/* Section 6 - Game Connection */}
            <div className="bg-primary/10 p-6 rounded-lg border border-primary/30">
              <h3 className="text-xl font-bold text-primary mb-3">🎮 Link with The Unicorn Run</h3>
              <p className="text-foreground leading-relaxed">
                In the simulation, you'll face similar decisions: when to raise capital, how much to raise, and at what valuation. Watch how each funding round affects your ownership percentage and company trajectory. The game models real dilution scenarios so you can practice these critical decisions in a risk-free environment.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Simple placeholder for other courses */}
      <Dialog open={selectedCourse !== null && selectedCourse !== "funding-works" && selectedCourse !== "bnp-wealth"} onOpenChange={() => setSelectedCourse(null)}>
        <DialogContent className="bg-slate-900 border-primary/20">
          <DialogHeader>
            <DialogTitle className="text-2xl text-foreground">Course Module</DialogTitle>
          </DialogHeader>
          <div className="py-6 space-y-4">
            <p className="text-muted-foreground">
              This is a demo course module. In a full implementation, this would contain interactive lessons and exercises.
            </p>
            <Button
              onClick={() => {
                if (selectedCourse) {
                  handleCompleteModule(selectedCourse);
                }
                setSelectedCourse(null);
              }}
              className="w-full"
            >
              Mark as Completed
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentLibrary;
