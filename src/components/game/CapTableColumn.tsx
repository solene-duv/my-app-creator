import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUnicornGame } from "@/contexts/UnicornGameContext";
import { PieChart, TrendingUp, Lock } from "lucide-react";

export const CapTableColumn = () => {
  const { 
    equity,
    valuation,
    raiseSeed,
    raiseSeriesA,
    raiseSeriesB,
    setupHolding,
    seedRaised,
    seriesARaised,
    seriesBRaised,
    holdingSetup,
  } = useUnicornGame();

  const investorEquity = 100 - equity;

  return (
    <div className="space-y-4">
      <Card className="bg-slate-900 border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary font-mono text-xl">BOARDROOM</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Valuation Display */}
          <div className="p-6 bg-slate-950 rounded-lg border border-primary/30 text-center">
            <p className="text-xs text-muted-foreground mb-2">COMPANY VALUATION</p>
            <p className="font-mono text-3xl font-bold text-primary">
              €{valuation >= 1000000 
                ? `${(valuation / 1000000).toFixed(1)}M`
                : valuation.toLocaleString()}
            </p>
          </div>

          {/* Equity Pie Chart Visualization */}
          <div className="p-4 bg-slate-950 rounded-lg border border-accent/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-accent" />
                <h3 className="font-semibold">CAP TABLE</h3>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">You</span>
                <span className="font-mono text-lg font-bold text-primary">
                  {equity.toFixed(1)}%
                </span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${equity}%` }}
                />
              </div>
              
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm">Investors</span>
                <span className="font-mono text-lg font-bold text-destructive">
                  {investorEquity.toFixed(1)}%
                </span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-destructive transition-all duration-500"
                  style={{ width: `${investorEquity}%` }}
                />
              </div>
            </div>
          </div>

          {/* Funding Rounds */}
          <div className="space-y-3">
            {/* Seed Round */}
            <div className="p-4 bg-slate-950 rounded-lg border border-primary/20">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Raise Seed Round</h3>
                {seedRaised && (
                  <Badge variant="outline" className="text-xs bg-primary/10 text-primary">
                    CLOSED
                  </Badge>
                )}
              </div>
              <div className="text-xs text-muted-foreground mb-3 space-y-1">
                <p className="text-primary">+€500,000 Cash</p>
                <p className="text-destructive">-15% Equity</p>
                <p className="text-muted-foreground">Requires: €1M Valuation</p>
              </div>
              <Button
                onClick={raiseSeed}
                disabled={valuation < 1000000 || seedRaised}
                className="w-full"
                variant="default"
              >
                {seedRaised ? 'FUNDED' : 'RAISE SEED'}
              </Button>
            </div>

            {/* Series A */}
            <div className="p-4 bg-slate-950 rounded-lg border border-accent/20">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Raise Series A</h3>
                {seriesARaised && (
                  <Badge variant="outline" className="text-xs bg-accent/10 text-accent">
                    CLOSED
                  </Badge>
                )}
              </div>
              <div className="text-xs text-muted-foreground mb-3 space-y-1">
                <p className="text-primary">+€2,000,000 Cash</p>
                <p className="text-destructive">-20% Equity</p>
                <p className="text-accent">x2 Hype Multiplier</p>
                <p className="text-muted-foreground">Requires: €10M Valuation</p>
              </div>
              <Button
                onClick={raiseSeriesA}
                disabled={valuation < 10000000 || seriesARaised}
                className="w-full bg-accent hover:bg-accent/90"
              >
                {seriesARaised ? 'FUNDED' : 'RAISE SERIES A'}
              </Button>
            </div>

            {/* Holding Setup */}
            {seriesARaised && (
              <div className="p-4 bg-slate-950 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold">Setup Holding (OBO)</h3>
                  </div>
                  {holdingSetup && (
                    <Badge variant="outline" className="text-xs bg-primary/10 text-primary">
                      ACTIVE
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-muted-foreground mb-3">
                  <p>Secures personal wealth</p>
                  <p className="text-primary">BNP Private Banking Feature</p>
                </div>
                <Button
                  onClick={setupHolding}
                  disabled={holdingSetup}
                  className="w-full"
                  variant="outline"
                >
                  {holdingSetup ? 'SECURED' : 'SETUP HOLDING'}
                </Button>
              </div>
            )}

            {/* Series B */}
            <div className="p-4 bg-slate-950 rounded-lg border border-primary/20">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Raise Series B</h3>
                {seriesBRaised && (
                  <Badge variant="outline" className="text-xs bg-primary/10 text-primary">
                    CLOSED
                  </Badge>
                )}
              </div>
              <div className="text-xs text-muted-foreground mb-3 space-y-1">
                <p className="text-primary">+€20,000,000 Cash</p>
                <p className="text-destructive">-10% Equity</p>
                <p className="text-muted-foreground">Requires: €100M Valuation</p>
              </div>
              <Button
                onClick={raiseSeriesB}
                disabled={valuation < 100000000 || seriesBRaised}
                className="w-full"
                variant="default"
              >
                {seriesBRaised ? 'FUNDED' : 'RAISE SERIES B'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
