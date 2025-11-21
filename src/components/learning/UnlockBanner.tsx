import { Card } from "@/components/ui/card";
import { PartyPopper, Calendar } from "lucide-react";

export const UnlockBanner = () => {
  return (
    <Card className="bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border-primary/40 p-6 mb-8">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <div className="p-3 bg-primary/20 rounded-full">
            <PartyPopper className="h-8 w-8 text-primary" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-primary mb-1">
            🎉 Congratulations!
          </h3>
          <p className="text-foreground">
            You unlocked access to the <span className="font-bold text-accent">BNP Paribas Wealth Management Event</span>
          </p>
          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>24 November 2025</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
