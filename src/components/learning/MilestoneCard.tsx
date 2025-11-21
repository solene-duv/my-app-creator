import { Card } from "@/components/ui/card";
import { CheckCircle2, Lock, Target } from "lucide-react";
import { cn } from "@/lib/utils";

export type MilestoneState = "completed" | "locked" | "in-progress";

interface MilestoneCardProps {
  title: string;
  description: string;
  state: MilestoneState;
  icon?: React.ReactNode;
  isPremium?: boolean;
}

export const MilestoneCard = ({
  title,
  description,
  state,
  icon,
  isPremium = false,
}: MilestoneCardProps) => {
  const isLocked = state === "locked";
  const isCompleted = state === "completed";
  const isInProgress = state === "in-progress";

  return (
    <Card
      className={cn(
        "p-4 transition-all border",
        isLocked && "opacity-50 bg-slate-900/50 border-slate-800",
        isCompleted && "bg-slate-900 border-green-500/30",
        isInProgress && "bg-slate-900 border-accent/50 shadow-accent/20 shadow-lg",
        isPremium && !isLocked && "bg-gradient-to-br from-slate-900 to-primary/10 border-primary/40"
      )}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={cn(
            "flex-shrink-0 p-2 rounded-lg",
            isCompleted && "bg-green-500/20",
            isInProgress && "bg-accent/20",
            isLocked && "bg-slate-800",
            isPremium && !isLocked && "bg-primary/20"
          )}
        >
          {isCompleted ? (
            <CheckCircle2 className="h-6 w-6 text-green-500" />
          ) : isLocked ? (
            <Lock className="h-6 w-6 text-muted-foreground" />
          ) : icon ? (
            icon
          ) : (
            <Target className="h-6 w-6 text-accent" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3
              className={cn(
                "font-semibold text-sm",
                isLocked && "text-muted-foreground",
                !isLocked && "text-foreground"
              )}
            >
              {title}
              {isPremium && <span className="ml-2 text-xs text-primary">★ PREMIUM</span>}
            </h3>
            {isCompleted && (
              <span className="text-xs text-green-500 font-medium whitespace-nowrap">
                Completed
              </span>
            )}
            {isInProgress && (
              <span className="text-xs text-accent font-medium whitespace-nowrap">
                Recommended
              </span>
            )}
          </div>
          <p
            className={cn(
              "text-xs",
              isLocked ? "text-muted-foreground/70" : "text-muted-foreground"
            )}
          >
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
};
