import { useUnicornGame } from "@/contexts/UnicornGameContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronUp, ChevronDown } from "lucide-react";

export const OperationsColumn = () => {
  const { 
    cash,
    price,
    marketingLevel,
    publicDemand,
    gameStage,
    autoCoderLevel,
    increasePrice,
    decreasePrice,
    buyAutoCoder,
    buyMarketing,
  } = useUnicornGame();

  const autoCoderCost = 60 * Math.pow(1.1, autoCoderLevel);
  const marketingCost = 100 * Math.pow(2, marketingLevel - 1);
  
  const showMarket = gameStage !== 'BOOTSTRAP';
  const showAutomation = gameStage === 'SCALE' || gameStage === 'UNICORN';

  return (
    <Card className="p-4 bg-slate-900 border-primary/20">
      <h2 className="text-xl font-bold text-primary mb-4 font-mono">
        MARKET
      </h2>
      
      {/* Cash Display */}
      <div className="mb-4 p-4 bg-slate-950 rounded-lg">
        <div className="text-xs text-muted-foreground mb-1">Cash</div>
        <div className="text-4xl font-mono font-bold text-primary">
          ${cash.toFixed(2)}
        </div>
      </div>

      {showMarket && (
        <>
          {/* Price Control */}
          <div className="mb-4 p-3 bg-slate-950 rounded-lg border border-accent/30">
            <div className="text-xs text-muted-foreground mb-2">Price per License</div>
            <div className="flex items-center gap-2 mb-3">
              <Button
                onClick={decreasePrice}
                size="sm"
                variant="outline"
                className="h-10 w-10 p-0"
              >
                <ChevronDown className="h-5 w-5" />
              </Button>
              <div className="flex-1 text-center bg-slate-900 py-2 rounded">
                <span className="text-3xl font-mono font-bold text-accent">
                  ${price.toFixed(2)}
                </span>
              </div>
              <Button
                onClick={increasePrice}
                size="sm"
                variant="outline"
                className="h-10 w-10 p-0"
              >
                <ChevronUp className="h-5 w-5" />
              </Button>
            </div>
            <div className="text-xs text-center">
              <span className="text-muted-foreground">Public Demand: </span>
              <span className="font-mono font-bold text-accent">
                {publicDemand.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Marketing */}
          <div className="mb-4 p-3 bg-slate-950 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Marketing Level</span>
              <span className="font-mono font-bold text-primary text-lg">
                {marketingLevel}
              </span>
            </div>
            <Button
              onClick={buyMarketing}
              disabled={cash < marketingCost}
              variant="outline"
              className="w-full border-accent text-accent hover:bg-accent/20 font-mono"
            >
              Upgrade (${marketingCost.toFixed(0)})
            </Button>
          </div>
        </>
      )}

      {/* Automation */}
      {showAutomation && (
        <div className="space-y-2">
          <div className="text-sm font-semibold text-primary mb-2">
            SCALING
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-primary/30">
            <div className="mb-2">
              <div className="text-sm font-semibold text-foreground">
                Hire Junior Dev
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Auto-codes 1/sec • Owned: {autoCoderLevel}
              </div>
            </div>
            <Button
              onClick={buyAutoCoder}
              disabled={cash < autoCoderCost}
              variant="default"
              className="w-full bg-primary hover:bg-primary/80 text-slate-950 font-mono font-bold"
            >
              ${autoCoderCost.toFixed(0)}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};
