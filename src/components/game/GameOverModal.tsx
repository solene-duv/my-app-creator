import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUnicornGame } from "@/contexts/UnicornGameContext";
import { AlertTriangle } from "lucide-react";

export const GameOverModal = () => {
  const { isBankrupt, restartGame } = useUnicornGame();

  return (
    <Dialog open={isBankrupt}>
      <DialogContent className="bg-slate-950 border-destructive/50">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            <DialogTitle className="text-3xl font-bold text-destructive font-mono">
              INSOLVENCY
            </DialogTitle>
          </div>
          <DialogDescription className="space-y-4 text-base">
            <p className="text-foreground">
              Your startup has run out of cash. The company is bankrupt.
            </p>
            <p className="text-muted-foreground text-sm">
              Better financial planning could have prevented this outcome.
            </p>
            <div className="p-4 bg-slate-900 rounded-lg border border-primary/20 mt-4">
              <p className="text-sm text-muted-foreground mb-2">
                💡 Pro Tip:
              </p>
              <p className="text-sm text-foreground">
                Open a BNP Professional Account early to reduce burn rate and extend runway.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3 mt-6">
          <Button
            onClick={restartGame}
            className="flex-1 bg-primary hover:bg-primary/90 text-black font-bold"
            size="lg"
          >
            Restart Game
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
