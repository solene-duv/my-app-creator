import { useUnicornGame } from "@/contexts/UnicornGameContext";

export const TerminalLog = () => {
  const { logs } = useUnicornGame();

  return (
    <div className="bg-slate-950 border border-primary/20 rounded p-2 h-32 overflow-y-auto font-mono text-xs">
      {logs.map((log, index) => (
        <div key={index} className="text-primary/80">
          {log}
        </div>
      ))}
    </div>
  );
};
