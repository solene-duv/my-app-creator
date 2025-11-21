import { useUnicornGame } from "@/contexts/UnicornGameContext";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export const VictoryModal = () => {
  const { funds, restartGame } = useUnicornGame();
  const isVictory = funds >= 1000000;

  return (
    <AlertDialog open={isVictory}>
      <AlertDialogContent className="bg-slate-900 border-primary">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-3xl font-bold text-center">
            <span className="text-5xl">🦄</span>
            <br />
            UNICORN STATUS
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center space-y-4 py-4">
            <div className="text-2xl font-bold text-primary font-mono">
              ${funds.toFixed(2)}
            </div>
            <p className="text-lg text-foreground">
              You've reached $1 Million!
            </p>
            <p className="text-sm text-muted-foreground">
              Congratulations on building a successful business!
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button 
            onClick={restartGame}
            className="w-full bg-primary hover:bg-primary/80 text-slate-950"
          >
            Play Again
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
