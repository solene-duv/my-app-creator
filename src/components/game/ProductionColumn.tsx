import { useUnicornGame } from "@/contexts/UnicornGameContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const ProductionColumn = () => {
  const { 
    linesOfCode,
    cloudCredits,
    unsoldCode,
    cloudCreditCost,
    cash,
    writeCode,
    buyCloudCredits,
  } = useUnicornGame();

  const canWriteCode = cloudCredits > 0;

  return (
    <Card className="p-4 bg-slate-900 border-primary/20">
      <h2 className="text-xl font-bold text-primary mb-4 font-mono">
        PRODUCTION
      </h2>
      
      {/* Stats */}
      <div className="space-y-2 mb-4">
        <div>
          <div className="text-xs text-muted-foreground">Total Lines of Code</div>
          <div className="text-2xl font-mono font-bold text-primary">
            {Math.floor(linesOfCode).toLocaleString()}
          </div>
        </div>
        
        <div>
          <div className="text-xs text-muted-foreground">Cloud Credits</div>
          <div className="text-xl font-mono text-accent">
            {Math.floor(cloudCredits).toLocaleString()}
          </div>
        </div>
        
        <div>
          <div className="text-xs text-muted-foreground">Unsold Inventory</div>
          <div className="text-lg font-mono text-yellow-500">
            {Math.floor(unsoldCode).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Main Action */}
      <Button
        onClick={writeCode}
        disabled={!canWriteCode}
        size="lg"
        className="w-full mb-4 bg-primary hover:bg-primary/80 text-slate-950 font-bold text-lg h-16 animate-pulse"
      >
        WRITE CODE
      </Button>

      {/* Buy Resources */}
      <div className="space-y-2">
        <div className="text-xs text-muted-foreground">
          Credit Cost: ${cloudCreditCost.toFixed(2)}
        </div>
        <Button
          onClick={() => buyCloudCredits(1000)}
          disabled={cash < cloudCreditCost * 1000}
          variant="outline"
          className="w-full border-accent text-accent hover:bg-accent/20"
        >
          Buy 1000 Credits (${(cloudCreditCost * 1000).toFixed(0)})
        </Button>
      </div>
    </Card>
  );
};
