import { useUnicornGame } from "@/contexts/UnicornGameContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const formatCurrency = (value: number) => {
  if (value >= 1000) {
    return `€${(value / 1000).toFixed(1)}K`;
  }
  return `€${value.toFixed(2)}`;
};

export const OperationsColumn = () => {
  const { 
    clipmakerRate,
    wire,
    wireCost,
    funds,
    clipperLevel,
    clipperCost,
    makeClip,
    buyWire,
    buyAutoClipper,
  } = useUnicornGame();

  const canMakeClip = wire >= 1;

  return (
    <Card className="p-6 bg-slate-900 border-primary/20">
      <h2 className="text-2xl font-bold text-primary mb-6 font-mono">
        Manufacturing
      </h2>
      
      {/* Clips per Second */}
      <div className="mb-4">
        <div className="text-sm text-muted-foreground">Clips per Second:</div>
        <div className="text-2xl font-mono font-bold text-primary">
          {clipmakerRate}
        </div>
      </div>

      {/* Make Paperclip Button */}
      <Button
        onClick={makeClip}
        disabled={!canMakeClip}
        size="lg"
        className="w-full mb-6 bg-primary hover:bg-primary/80 text-slate-950 font-bold text-xl h-16"
      >
        Make Code
      </Button>

      {/* Wire */}
      <div className="mb-4 p-4 bg-slate-950 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <div className="text-sm text-muted-foreground">Wire</div>
            <div className="text-xl font-mono font-bold text-accent">
              {Math.floor(wire)} inches
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Cost:</div>
            <div className="text-lg font-mono text-primary">
              {formatCurrency(wireCost)}
            </div>
          </div>
        </div>
        <Button
          onClick={buyWire}
          disabled={funds < wireCost}
          className="w-full bg-accent hover:bg-accent/80 text-slate-950 font-semibold"
        >
          Buy Wire (1000")
        </Button>
      </div>

      {/* AutoClippers */}
      <div className="p-4 bg-slate-950 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <div className="text-sm text-muted-foreground">AutoClippers</div>
            <div className="text-xl font-mono font-bold text-primary">
              {clipperLevel}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Cost:</div>
            <div className="text-lg font-mono text-accent">
              {formatCurrency(clipperCost)}
            </div>
          </div>
        </div>
        <Button
          onClick={buyAutoClipper}
          disabled={funds < clipperCost}
          className="w-full bg-primary hover:bg-primary/80 text-slate-950 font-semibold"
        >
          AutoClipper
        </Button>
      </div>
    </Card>
  );
};
