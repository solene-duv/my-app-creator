import { useUnicornGame } from "@/contexts/UnicornGameContext";
import { Card } from "@/components/ui/card";
import { TerminalLog } from "./TerminalLog";
const formatFunds = (value: number) => {
  return `€${value.toFixed(1)}K`;
};
export const CapTableColumn = () => {
  const {
    funds,
    clips,
    clipmakerRate,
    valuation,
    equity,
    canExit,
    triggerExit
  } = useUnicornGame();
  return <Card className="p-6 bg-slate-900 border-primary/20">
      <h2 className="text-2xl font-bold text-primary mb-6 font-mono">
        Status
      </h2>
      
      {/* Key Metrics */}
      <div className="space-y-3 mb-6 p-4 bg-slate-950 rounded-lg">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Total Revenue:</span>
          <span className="font-mono text-primary font-bold">
            {formatFunds(funds)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Valuation:</span>
          <span className="font-mono text-accent font-bold">
            {formatFunds(valuation)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Equity:</span>
          <span className="font-mono text-primary font-bold">
            {equity}%
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Inventory:</span>
          <span className="font-mono text-accent font-bold">
            {Math.floor(clips)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Production:</span>
          <span className="font-mono text-primary font-bold">
            {clipmakerRate}/s
          </span>
        </div>
      </div>

      {/* Exit Button */}
      {canExit() && (
        <div className="mb-6">
          <button
            onClick={triggerExit}
            className="w-full py-3 px-4 bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity animate-pulse"
          >
            🎉 EXIT UNICORN 🦄
          </button>
        </div>
      )}

      {/* Terminal Log */}
      <TerminalLog />
    </Card>;
};