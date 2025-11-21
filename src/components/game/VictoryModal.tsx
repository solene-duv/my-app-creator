import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUnicornGame } from "@/contexts/UnicornGameContext";
import { Trophy, AlertCircle } from "lucide-react";

export const VictoryModal = () => {
  const { isVictory, equity, valuation, restartGame } = useUnicornGame();
  
  const personalNetWorth = (valuation * equity) / 100;
  const isDiluted = equity < 10;

  return (
    <Dialog open={isVictory}>
      <DialogContent className="bg-slate-950 border-primary/50 max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="h-12 w-12 text-primary animate-pulse" />
            <DialogTitle className="text-4xl font-bold text-primary font-mono">
              🦄 UNICORN STATUS
            </DialogTitle>
          </div>
          <DialogDescription className="space-y-6 text-base">
            <p className="text-foreground text-xl">
              You built a €1 Billion company!
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900 rounded-lg border border-primary/20">
                <p className="text-xs text-muted-foreground mb-2">COMPANY VALUATION</p>
                <p className="font-mono text-2xl font-bold text-primary">
                  €{(valuation / 1000000000).toFixed(2)}B
                </p>
              </div>
              
              <div className="p-4 bg-slate-900 rounded-lg border border-accent/20">
                <p className="text-xs text-muted-foreground mb-2">YOUR EQUITY</p>
                <p className="font-mono text-2xl font-bold text-accent">
                  {equity.toFixed(1)}%
                </p>
              </div>
            </div>

            {/* Personal Net Worth */}
            <div className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/30">
              <p className="text-sm text-muted-foreground mb-2">YOUR PERSONAL NET WORTH</p>
              <p className="font-mono text-4xl font-bold text-primary">
                €{(personalNetWorth / 1000000).toFixed(1)}M
              </p>
            </div>

            {/* Dilution Warning */}
            {isDiluted && (
              <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/30 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                <div>
                  <p className="font-semibold text-destructive mb-1">
                    Heavy Dilution Warning
                  </p>
                  <p className="text-sm text-muted-foreground">
                    You only own {equity.toFixed(1)}% of your company. Multiple funding rounds significantly reduced your ownership stake.
                  </p>
                </div>
              </div>
            )}

            {/* BNP Wealth Management CTA */}
            <div className="p-4 bg-slate-900 rounded-lg border border-primary/20">
              <p className="text-sm font-semibold text-foreground mb-2">
                🏦 Optimize Your Exit
              </p>
              <p className="text-sm text-muted-foreground">
                BNP Paribas Wealth Management can help structure your exit strategy, minimize tax exposure, and secure generational wealth.
              </p>
            </div>

            {!isDiluted && equity > 50 && (
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
                <p className="text-sm font-semibold text-primary mb-1">
                  🎉 Founder Control Maintained!
                </p>
                <p className="text-sm text-muted-foreground">
                  You retained majority ownership ({equity.toFixed(1)}%). Exceptional capital efficiency!
                </p>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3 mt-6">
          <Button
            onClick={restartGame}
            className="flex-1 bg-primary hover:bg-primary/90 text-black font-bold"
            size="lg"
          >
            Play Again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
