import { useUnicornGame } from "@/contexts/UnicornGameContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export const ProductionColumn = () => {
  const { 
    linesOfCode,
    cloudCredits,
    cloudCreditCost,
    cash,
    writeCode,
    buyCloudCredits,
  } = useUnicornGame();

  const canWriteCode = cloudCredits >= 1;
  const canBuyCredits = cash >= (cloudCreditCost * 1000);
  const isOutOfResources = cloudCredits === 0;

  return (
    <Card className="p-4 bg-slate-900 border-primary/20">
      <h2 className="text-xl font-bold text-primary mb-4 font-mono">
        PRODUCTION
      </h2>
      
      {/* Stats */}
      <div className="space-y-3 mb-4">
        <div className="p-3 bg-slate-950 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">Lines of Code</div>
          <div className="text-3xl font-mono font-bold text-primary">
            {Math.floor(linesOfCode).toLocaleString()}
          </div>
        </div>
        
        <div className={`p-3 rounded-lg ${cloudCredits <= 100 ? 'bg-destructive/10 border border-destructive/30' : 'bg-slate-950'}`}>
          <div className="text-xs text-muted-foreground mb-1">Cloud Credits</div>
          <div className={`text-2xl font-mono font-bold ${cloudCredits <= 100 ? 'text-destructive' : 'text-accent'}`}>
            {Math.floor(cloudCredits).toLocaleString()}
          </div>
          {cloudCredits <= 100 && (
            <div className="flex items-center gap-1 mt-2 text-xs text-destructive">
              <AlertCircle className="h-3 w-3" />
              <span>Running low!</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Action - Write Code */}
      <div className="mb-4">
        {isOutOfResources && (
          <div className="mb-2 p-2 bg-destructive/10 border border-destructive/30 rounded text-xs text-destructive text-center font-semibold">
            OUT OF RESOURCES
          </div>
        )}
        <Button
          onClick={writeCode}
          disabled={!canWriteCode}
          size="lg"
          className="w-full bg-primary hover:bg-primary/80 text-slate-950 font-bold text-xl h-20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          WRITE CODE
        </Button>
        <div className="text-xs text-center text-muted-foreground mt-1">
          Consumes 1 Credit per click
        </div>
      </div>

      {/* Buy Resources */}
      <div className="space-y-2">
        <div className="p-3 bg-slate-950 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-muted-foreground">Credit Cost</span>
            <span className="text-sm font-mono text-accent font-bold">
              ${cloudCreditCost.toFixed(2)}
            </span>
          </div>
          <Button
            onClick={buyCloudCredits}
            disabled={!canBuyCredits}
            variant="outline"
            className="w-full border-accent text-accent hover:bg-accent/20 font-mono"
          >
            Buy 1000 Credits (${(cloudCreditCost * 1000).toFixed(0)})
          </Button>
        </div>
      </div>
    </Card>
  );
};
