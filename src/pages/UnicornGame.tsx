import { UnicornGameProvider } from "@/contexts/UnicornGameContext";
import { ProductionColumn } from "@/components/game/ProductionColumn";
import { OperationsColumn } from "@/components/game/OperationsColumn";
import { CapTableColumn } from "@/components/game/CapTableColumn";
import { TerminalLog } from "@/components/game/TerminalLog";
import { GameOverModal } from "@/components/game/GameOverModal";
import { VictoryModal } from "@/components/game/VictoryModal";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const UnicornGameContent = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-foreground p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <div className="text-center flex-1">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent font-mono">
              THE UNICORN RUN
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Founder's Simulator: Bootstrap to €1B
            </p>
          </div>
          <div className="w-24" /> {/* Spacer for alignment */}
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <ProductionColumn />
          <OperationsColumn />
          <CapTableColumn />
        </div>

        {/* Terminal Log */}
        <TerminalLog />
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
