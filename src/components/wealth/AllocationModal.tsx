import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Portfolio } from "@/pages/WealthSimulator";

interface AllocationModalProps {
  isOpen: boolean;
  investmentType: keyof Portfolio | null;
  maxAmount: number;
  onAllocate: (amount: number) => void;
  onClose: () => void;
}

const investmentTitles: Record<keyof Portfolio, string> = {
  lifeInsurance: "Life Insurance",
  funds: "Investment Funds",
  privateEquity: "Private Equity",
  stocks: "Stocks",
  crypto: "Crypto",
};

export const AllocationModal = ({
  isOpen,
  investmentType,
  maxAmount,
  onAllocate,
  onClose,
}: AllocationModalProps) => {
  const [amount, setAmount] = useState(0);
  const [sliderValue, setSliderValue] = useState([0]);

  const handleSliderChange = (value: number[]) => {
    const newAmount = (value[0] / 100) * maxAmount;
    setSliderValue(value);
    setAmount(newAmount);
  };

  const handleInputChange = (value: string) => {
    const newAmount = parseFloat(value) || 0;
    const clamped = Math.min(Math.max(0, newAmount), maxAmount);
    setAmount(clamped);
    setSliderValue([(clamped / maxAmount) * 100]);
  };

  const handleAllocate = () => {
    if (amount > 0) {
      onAllocate(amount);
      setAmount(0);
      setSliderValue([0]);
    }
  };

  const handleClose = () => {
    setAmount(0);
    setSliderValue([0]);
    onClose();
  };

  if (!investmentType) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-slate-900 border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary">
            Allocate to {investmentTitles[investmentType]}
          </DialogTitle>
          <DialogDescription>
            Choose how much to allocate to this investment
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Available Amount */}
          <div className="text-center p-4 bg-slate-950 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Available</div>
            <div className="text-2xl font-bold text-accent font-mono">
              €{maxAmount.toFixed(1)}K
            </div>
          </div>

          {/* Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
            <Slider
              value={sliderValue}
              onValueChange={handleSliderChange}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              Amount (in thousands €)
            </label>
            <Input
              type="number"
              value={amount.toFixed(1)}
              onChange={(e) => handleInputChange(e.target.value)}
              max={maxAmount}
              min={0}
              step={0.1}
              className="font-mono text-lg"
            />
          </div>

          {/* Percentage Display */}
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Allocating</div>
            <div className="text-3xl font-bold text-primary font-mono">
              {sliderValue[0].toFixed(0)}%
            </div>
            <div className="text-lg text-accent font-mono mt-1">
              €{amount.toFixed(1)}K
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleClose}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAllocate}
              disabled={amount === 0}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Confirm Allocation
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
