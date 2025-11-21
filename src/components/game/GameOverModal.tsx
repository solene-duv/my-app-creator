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

export const GameOverModal = () => {
  const { isBankrupt, restartGame } = useUnicornGame();

  return (
    <AlertDialog open={isBankrupt}>
      <AlertDialogContent className="bg-slate-900 border-destructive">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-3xl font-bold text-center text-destructive">
            💀 GAME OVER
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center space-y-4 py-4">
            <p className="text-lg text-foreground">
              You ran out of money.
            </p>
            <p className="text-sm text-muted-foreground">
              Better luck next time!
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button 
            onClick={restartGame}
            variant="destructive"
            className="w-full"
          >
            Restart Game
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
