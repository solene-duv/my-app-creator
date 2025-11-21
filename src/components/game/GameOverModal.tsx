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
  const { wire, funds, restartGame } = useUnicornGame();
  
  // Game over if no wire and no money to buy more
  const isBankrupt = wire === 0 && funds < 15;

  return (
    <AlertDialog open={isBankrupt}>
      <AlertDialogContent className="bg-slate-900 border-destructive">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-3xl font-bold text-center text-destructive">
            💀 GAME OVER
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center space-y-4 py-4">
            <p className="text-lg text-foreground">
              You ran out of resources!
            </p>
            <p className="text-sm text-muted-foreground">
              No wire left and insufficient funds to continue.
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
