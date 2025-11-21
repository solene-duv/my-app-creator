import { Progress } from "@/components/ui/progress";

interface LearningProgressProps {
  completed: number;
  total: number;
}

export const LearningProgress = ({ completed, total }: LearningProgressProps) => {
  const percentage = (completed / total) * 100;

  return (
    <div className="max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground">Course Progress</span>
        <span className="text-sm text-muted-foreground">
          {completed} of {total} modules completed
        </span>
      </div>
      <Progress value={percentage} className="h-3" />
    </div>
  );
};
