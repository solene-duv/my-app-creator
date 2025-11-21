import { useUnicornGame } from "@/contexts/UnicornGameContext";
import { Card } from "@/components/ui/card";
import { TerminalLog } from "./TerminalLog";

export const CapTableColumn = () => {
  const { 
    linesOfCode,
    cash,
    autoCoderLevel,
    gameStage,
  } = useUnicornGame();

  const getStageInfo = () => {
    switch(gameStage) {
      case 'BOOTSTRAP':
        return {
          title: 'BOOTSTRAP',
          description: 'Write 50 lines to unlock Market',
          progress: Math.min(100, (linesOfCode / 50) * 100),
        };
      case 'MARKET':
        return {
          title: 'MARKET',
          description: 'Write 500 lines to unlock Automation',
          progress: Math.min(100, (linesOfCode / 500) * 100),
        };
      case 'SCALE':
        return {
          title: 'SCALE',
          description: 'Reach $1M to win',
          progress: Math.min(100, (cash / 1000000) * 100),
        };
      case 'UNICORN':
        return {
          title: 'UNICORN',
          description: 'Victory!',
          progress: 100,
        };
      default:
        return { title: '', description: '', progress: 0 };
    }
  };

  const stage = getStageInfo();

  return (
    <Card className="p-4 bg-slate-900 border-primary/20">
      <h2 className="text-xl font-bold text-primary mb-4 font-mono">
        STATUS
      </h2>
      
      {/* Stage Info */}
      <div className="mb-4 p-3 bg-slate-800 rounded-lg border border-primary/30">
        <div className="text-sm font-bold text-accent mb-1">
          {stage.title}
        </div>
        <div className="text-xs text-muted-foreground mb-2">
          {stage.description}
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${stage.progress}%` }}
          />
        </div>
        <div className="text-xs text-right text-muted-foreground mt-1">
          {stage.progress.toFixed(0)}%
        </div>
      </div>

      {/* Key Metrics */}
      <div className="space-y-2 mb-4 p-3 bg-slate-950 rounded-lg">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Total Code:</span>
          <span className="font-mono text-primary font-bold">
            {Math.floor(linesOfCode).toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Total Cash:</span>
          <span className="font-mono text-primary font-bold">
            ${cash.toFixed(2)}
          </span>
        </div>
        {autoCoderLevel > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Auto-Coders:</span>
            <span className="font-mono text-accent font-bold">
              {autoCoderLevel} ({autoCoderLevel}/s)
            </span>
          </div>
        )}
      </div>

      {/* Terminal Log */}
      <div className="mt-4">
        <TerminalLog />
      </div>
    </Card>
  );
};
