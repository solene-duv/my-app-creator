import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUnicornGame } from "@/contexts/UnicornGameContext";
import { Users, Rocket, TrendingUp, Building2 } from "lucide-react";

export const OperationsColumn = () => {
  const { 
    cash, 
    linesOfCode, 
    upgrades, 
    buyUpgrade, 
    launchMVP, 
    mvpLaunched 
  } = useUnicornGame();

  const getIcon = (upgradeId: string) => {
    switch (upgradeId) {
      case 'intern': return Users;
      case 'dev': return Users;
      case 'growth': return TrendingUp;
      case 'bnp': return Building2;
      default: return Users;
    }
  };

  return (
    <div className="space-y-4">
      <Card className="bg-slate-900 border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary font-mono text-xl">SCALE TEAM</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Upgrades */}
          {upgrades.map((upgrade) => {
            const Icon = getIcon(upgrade.id);
            const canAfford = cash >= upgrade.cost;
            
            return (
              <div 
                key={upgrade.id}
                className="p-4 bg-slate-950 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-semibold text-foreground">{upgrade.name}</h3>
                      {upgrade.id === 'bnp' && (
                        <Badge variant="secondary" className="mt-1 text-xs">
                          Recommended
                        </Badge>
                      )}
                    </div>
                  </div>
                  {upgrade.owned > 0 && (
                    <Badge variant="outline" className="font-mono">
                      x{upgrade.owned}
                    </Badge>
                  )}
                </div>
                
                <div className="text-xs text-muted-foreground mb-3 space-y-1">
                  {upgrade.codePerSec && (
                    <p>+{upgrade.codePerSec} Code/sec</p>
                  )}
                  {upgrade.burnPerSec && (
                    <p className="text-destructive">+€{upgrade.burnPerSec} Burn/sec</p>
                  )}
                  {upgrade.hypeBoost && (
                    <p className="text-accent">+{upgrade.hypeBoost} Hype</p>
                  )}
                  {upgrade.burnReduction && (
                    <p className="text-primary">-{upgrade.burnReduction * 100}% Burn Rate</p>
                  )}
                </div>

                <Button
                  onClick={() => buyUpgrade(upgrade.id)}
                  disabled={!canAfford}
                  className="w-full"
                  variant={canAfford ? "default" : "secondary"}
                >
                  <span className="font-mono">€{upgrade.cost.toLocaleString()}</span>
                </Button>
              </div>
            );
          })}

          {/* MVP Launch */}
          <div className="p-4 bg-slate-950 rounded-lg border border-accent/20 hover:border-accent/40 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Rocket className="h-5 w-5 text-accent" />
                <div>
                  <h3 className="font-semibold text-foreground">Launch MVP</h3>
                  {mvpLaunched && (
                    <Badge variant="outline" className="mt-1 text-xs bg-primary/10 text-primary">
                      LIVE
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground mb-3">
              <p>Converts code into revenue</p>
              <p className="text-accent">€10/sec per code generation</p>
              <p className="text-muted-foreground mt-1">Requires: 1000 Lines of Code</p>
            </div>

            <Button
              onClick={launchMVP}
              disabled={linesOfCode < 1000 || cash < 5000 || mvpLaunched}
              className="w-full bg-accent hover:bg-accent/90"
              variant="default"
            >
              <span className="font-mono">€5,000</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
