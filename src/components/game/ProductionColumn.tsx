import { useUnicornGame } from "@/contexts/UnicornGameContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
const formatCurrency = (value: number) => {
  return `€${Math.floor(value)}K`;
};
const formatFunds = (value: number) => {
  return `€${value.toFixed(1)}K`;
};
const formatPrice = (value: number) => {
  return `€${value.toFixed(2)}K`;
};
export const ProductionColumn = () => {
  const {
    funds,
    clips,
    margin,
    demand,
    marketingLevel,
    lowerPrice,
    raisePrice,
    buyMarketing,
    getPrice,
    getMarketingCost
  } = useUnicornGame();
  const price = getPrice();
  const marketingCost = getMarketingCost();
  return <Card className="p-6 bg-slate-900 border-primary/20">
      <h2 className="text-2xl font-bold text-primary mb-6 font-mono">
        Sales
      </h2>
      
      {/* Available Funds */}
      <div className="mb-4">
        <div className="text-sm text-muted-foreground">Revenue :</div>
        <div className="text-3xl font-mono font-bold text-primary">
          {formatFunds(funds)}
        </div>
      </div>

      {/* Unsold Inventory */}
      <div className="mb-4">
        <div className="text-sm text-muted-foreground">Unsold Inventory:</div>
        <div className="text-2xl font-mono font-bold text-accent">
          {Math.floor(clips)}
        </div>
      </div>

      {/* Price Control */}
      <div className="mb-4 p-4 bg-slate-950 rounded-lg">
        <div className="flex items-center gap-3 mb-2">
          <Button onClick={lowerPrice} size="sm" variant="outline" className="px-4">
            lower
          </Button>
          <Button onClick={raisePrice} size="sm" variant="outline" className="px-4">
            raise
          </Button>
          <div className="flex-1">
            <div className="text-xs text-muted-foreground">Price per Clip:</div>
            <div className="text-xl font-mono font-bold text-accent">
              {formatPrice(price)}
            </div>
          </div>
        </div>
        
        <div className="mt-2">
          <div className="text-xs text-muted-foreground">Public Demand:</div>
          <div className="text-lg font-mono text-primary">
            {Math.floor(demand)}
          </div>
        </div>
      </div>

      {/* Marketing */}
      <div className="p-4 bg-slate-950 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <div className="text-sm text-muted-foreground">Marketing Level:</div>
            <div className="text-xl font-mono font-bold text-primary">
              {marketingLevel}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Cost:</div>
            <div className="text-lg font-mono text-accent">
              {formatCurrency(marketingCost)}
            </div>
          </div>
        </div>
        <Button onClick={buyMarketing} disabled={funds < marketingCost} className="w-full bg-primary hover:bg-primary/80 text-slate-950 font-semibold">
          Marketing
        </Button>
      </div>
    </Card>;
};