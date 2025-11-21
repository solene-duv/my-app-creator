import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lightbulb, Users, Cog, DollarSign, TrendingUp } from "lucide-react";

interface Milestone {
  revenue: number;
  title: string;
  text: string;
  icon: React.ReactNode;
}

export const MILESTONES: Milestone[] = [
  {
    revenue: 5,
    title: "First Revenue 🚀",
    text: "You made your first €5K! This is where it starts to feel real. You've proven people will pay for what you're building. Keep the momentum going.",
    icon: <TrendingUp className="h-8 w-8 text-green-500" />,
  },
  {
    revenue: 10,
    title: "Early Validation ✅",
    text: "€10K in revenue shows consistent demand. You're not just lucky—there's a real market here. Time to think about scaling operations.",
    icon: <Lightbulb className="h-8 w-8 text-yellow-500" />,
  },
  {
    revenue: 20,
    title: "First Real Traction 🎯",
    text: "You're getting your first paying users! This is when you start learning what customers truly value. Listen closely to their feedback and iterate fast.",
    icon: <Lightbulb className="h-8 w-8 text-yellow-500" />,
  },
  {
    revenue: 40,
    title: "Hiring Your First Team Member 👥",
    text: "Time to bring someone on board. Hiring means payroll, culture decisions, and managing your burn rate more carefully. Choose wisely—your first hires shape everything.",
    icon: <Users className="h-8 w-8 text-primary" />,
  },
  {
    revenue: 60,
    title: "From Product to Process ⚙️",
    text: "You can't hustle forever. At this stage, you need systems: clear workflows, documentation, and repeatable processes. Build the machine that builds the product.",
    icon: <Cog className="h-8 w-8 text-accent" />,
  },
  {
    revenue: 80,
    title: "Thinking About Funding 💰",
    text: "Should you raise capital? With solid traction, investors start paying attention. Think about your runway, growth targets, and whether outside capital accelerates or distracts.",
    icon: <DollarSign className="h-8 w-8 text-green-500" />,
  },
  {
    revenue: 100,
    title: "Managing Risk and Runway 📈",
    text: "You're scaling now. Balance is key: grow aggressively but watch your cash reserves. One misstep with burn rate can end the journey. Stay disciplined.",
    icon: <TrendingUp className="h-8 w-8 text-red-500" />,
  },
];

interface MilestoneModalProps {
  milestone: Milestone | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MilestoneModal = ({ milestone, isOpen, onClose }: MilestoneModalProps) => {
  if (!milestone) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-primary/30 max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-slate-950 rounded-lg">
              {milestone.icon}
            </div>
            <DialogTitle className="text-2xl text-primary">
              {milestone.title}
            </DialogTitle>
          </div>
          <DialogDescription className="text-base text-foreground leading-relaxed pt-2">
            {milestone.text}
          </DialogDescription>
        </DialogHeader>
        
        <div className="pt-4">
          <Button
            onClick={onClose}
            className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold"
            size="lg"
          >
            Got it, continue building
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
