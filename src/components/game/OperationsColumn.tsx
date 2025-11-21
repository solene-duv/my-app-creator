import { useUnicornGame } from "@/contexts/UnicornGameContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronUp, ChevronDown } from "lucide-react";

export const OperationsColumn = () => {
  const { 
    cash,
    price,
    marketingLevel,
    demand,
    linesOfCode,
    gameStage,
    upgrades,
    autoCodeClicks,
    increasePrice,
    decreasePrice,
    buyUpgrade,
    buyMarketing,
  } = useUnicornGame();

  const marketingCost = 100 * Math.pow(2, marketingLevel - 1);
  const showMarket = gameStage !== 'BOOTSTRAP';
  const showAutomation = gameStage === 'SCALE' || gameStage === 'UNICORN';

  return (
    <Card className="p-4 bg-slate-900 border-primary/20">
      <h2 className="text-xl font-bold text-primary mb-4 font-mono">
        MARKET
      </h2>
      
      {/* Cash Display */}
      <div className="mb-4">
        <div className="text-xs text-muted-foreground">Cash</div>
        <div className="text-3xl font-mono font-bold text-primary">
          ${cash.toFixed(2)}
        </div>
      </div>

      {showMarket && (
        <>
          {/* Price Control */}
          <div className="mb-4 p-3 bg-slate-800 rounded-lg">
            <div className="text-xs text-muted-foreground mb-2">Price per License</div>
            <div className="flex items-center gap-2">
              <Button
                onClick={decreasePrice}
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
              <div className="flex-1 text-center">
                <span className="text-2xl font-mono font-bold text-accent">
                  ${price.toFixed(2)}
                </span>
              </div>
              <Button
                onClick={increasePrice}
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0"
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-xs text-muted-foreground mt-2 text-center">
              Demand: {demand.toFixed(1)}/sec
            </div>
          </div>

          {/* Marketing */}
          <div className="mb-4">
            <div className="text-xs text-muted-foreground mb-1">
              Marketing Level: {marketingLevel}
            </div>
            <Button
              onClick={buyMarketing}
              disabled={cash < marketingCost}
              variant="outline"
              className="w-full border-accent text-accent hover:bg-accent/20"
            >
              Upgrade Marketing (${marketingCost.toFixed(0)})
            </Button>
          </div>
        </>
      )}

      {/* Automation */}
      {showAutomation && (
        <div className="space-y-2">
          <div className="text-sm font-semibold text-muted-foreground mb-2">
            Auto-Coders: {autoCodeClicks.toFixed(1)}/sec
          </div>
          {upgrades.map(upgrade => {
            const canAfford = cash >= upgrade.cost;
            const isUnlocked = !upgrade.unlockAt || linesOfCode >= upgrade.unlockAt;
            
            if (!isUnlocked) return null;

            return (
              <Button
                key={upgrade.id}
                onClick={() => buyUpgrade(upgrade.id)}
                disabled={!canAfford}
                variant="outline"
                className="w-full text-left justify-between border-primary/40 hover:bg-primary/10"
              >
                <span>
                  {upgrade.name}
                  {upgrade.owned > 0 && ` (${upgrade.owned})`}
                </span>
                <span className="font-mono">${upgrade.cost}</span>
              </Button>
            );
          })}
        </div>
      )}
    </Card>
  );
};
