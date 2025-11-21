import { Card, CardContent } from "@/components/ui/card";
import { useUnicornGame } from "@/contexts/UnicornGameContext";
import { useEffect, useRef } from "react";
import { Terminal } from "lucide-react";

export const TerminalLog = () => {
  const { logs } = useUnicornGame();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <Card className="bg-slate-950 border-primary/20">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Terminal className="h-4 w-4 text-primary" />
          <h3 className="font-mono text-sm text-primary">SYSTEM LOG</h3>
        </div>
        <div 
          ref={scrollRef}
          className="h-32 overflow-y-auto space-y-1 font-mono text-xs text-green-400 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent"
        >
          {logs.map((log, index) => (
            <div key={index} className="opacity-90 hover:opacity-100 transition-opacity">
              {log}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
