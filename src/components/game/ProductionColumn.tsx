import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, DollarSign, Calendar } from "lucide-react";
import { useUnicornGame } from "@/contexts/UnicornGameContext";
import { motion } from "framer-motion";
import { useState } from "react";

export const ProductionColumn = () => {
  const { cash, burnRate, linesOfCode, writeCode } = useUnicornGame();
  const [showReward, setShowReward] = useState(false);
  
  const runway = Math.floor((cash / burnRate) * 30); // Convert to days
  const runwayMonths = (runway / 30).toFixed(1);

  const handleWriteCode = () => {
    writeCode();
    setShowReward(true);
    setTimeout(() => setShowReward(false), 1000);
  };

  return (
    <div className="space-y-4">
      <Card className="bg-slate-900 border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary font-mono text-xl">THE GRIND</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stats Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-950 rounded-lg border border-primary/30">
              <div className="flex items-center gap-3">
                <DollarSign className={`h-6 w-6 ${cash < 1000 ? 'text-destructive' : 'text-primary'}`} />
                <div>
                  <p className="text-xs text-muted-foreground">CASH</p>
                  <p className={`font-mono text-2xl font-bold ${cash < 1000 ? 'text-destructive' : 'text-primary'}`}>
                    €{cash.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-950 rounded-lg border border-accent/30">
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-accent" />
                <div>
                  <p className="text-xs text-muted-foreground">RUNWAY</p>
                  <p className="font-mono text-2xl font-bold text-accent">
                    {runway > 0 ? `${runwayMonths}M` : '0M'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-950 rounded-lg border border-primary/30">
              <div className="flex items-center gap-3">
                <Code2 className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">LINES OF CODE</p>
                  <p className="font-mono text-2xl font-bold text-primary">
                    {linesOfCode.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Action */}
          <div className="relative">
            <Button 
              onClick={handleWriteCode}
              size="lg"
              className="w-full h-20 text-xl font-bold bg-primary hover:bg-primary/90 text-black animate-pulse"
            >
              <Code2 className="mr-2 h-6 w-6" />
              WRITE CODE
            </Button>
            
            {showReward && (
              <motion.div
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: -50, opacity: 0 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 text-primary font-mono font-bold text-xl pointer-events-none"
              >
                +€20 +10 CODE
              </motion.div>
            )}
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Manual coding generates income and builds your product
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
