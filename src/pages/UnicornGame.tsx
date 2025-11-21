import { UnicornGameProvider } from "@/contexts/UnicornGameContext";
import { ProductionColumn } from "@/components/game/ProductionColumn";
import { OperationsColumn } from "@/components/game/OperationsColumn";
import { CapTableColumn } from "@/components/game/CapTableColumn";
import { GameOverModal } from "@/components/game/GameOverModal";
import { VictoryModal } from "@/components/game/VictoryModal";
import { ArrowLeft, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const UnicornGameContent = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-foreground p-4">
      {/* Compact Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <Link to="/founder-journey">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent font-mono">
              THE UNICORN RUN
            </h1>
          </div>
          <Link to="/leaderboard">
            <Button variant="outline" size="sm" className="gap-2">
              <Trophy className="h-4 w-4" />
              Leaderboard
            </Button>
          </Link>
        </div>

        {/* 3-Column Compact Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-[calc(100vh-120px)]">
          <ProductionColumn />
          <OperationsColumn />
          <CapTableColumn />
        </div>
      </div>

      {/* Modals */}
      <GameOverModal />
      <VictoryModal />
    </div>
  );
};

const UnicornGame = () => {
  return (
    <UnicornGameProvider>
      <UnicornGameContent />
    </UnicornGameProvider>
  );
};

export default UnicornGame;
