import { useState } from "react";
import { ArrowLeft, TrendingUp, PieChart as PieChartIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InvestmentCard } from "@/components/wealth/InvestmentCard";
import { AllocationModal } from "@/components/wealth/AllocationModal";
import { PortfolioVisual } from "@/components/wealth/PortfolioVisual";
import { SimulationResults } from "@/components/wealth/SimulationResults";
import { toast } from "@/hooks/use-toast";

export interface Portfolio {
  lifeInsurance: number;
  funds: number;
  privateEquity: number;
  stocks: number;
  crypto: number;
}

const formatWealth = (value: number) => `€${value.toFixed(1)}K`;

const WealthSimulator = () => {
  // Standalone demo with default wealth amount
  const initialWealth = 5000;
  
  const [availableWealth, setAvailableWealth] = useState(initialWealth);
  const [portfolio, setPortfolio] = useState<Portfolio>({
    lifeInsurance: 0,
    funds: 0,
    privateEquity: 0,
    stocks: 0,
    crypto: 0,
  });
  
  const [selectedInvestment, setSelectedInvestment] = useState<keyof Portfolio | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleAllocate = (amount: number) => {
    if (!selectedInvestment) return;
    
    if (amount > availableWealth) {
      toast({
        title: "Insufficient Funds",
        description: "You don't have enough available wealth.",
        variant: "destructive",
      });
      return;
    }
    
    setPortfolio(prev => ({
      ...prev,
      [selectedInvestment]: prev[selectedInvestment] + amount,
    }));
    
    setAvailableWealth(prev => prev - amount);
    setSelectedInvestment(null);
    
    toast({
      title: "Investment Allocated",
      description: `${formatWealth(amount)} allocated successfully.`,
    });
  };

  const handleReset = () => {
    setAvailableWealth(initialWealth);
    setPortfolio({
      lifeInsurance: 0,
      funds: 0,
      privateEquity: 0,
      stocks: 0,
      crypto: 0,
    });
    setShowResults(false);
    
    toast({
      title: "Portfolio Reset",
      description: "All allocations have been cleared.",
    });
  };

  const totalAllocated = Object.values(portfolio).reduce((sum, val) => sum + val, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-foreground p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/founder-journey">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Founder Journey
            </Button>
          </Link>
        </div>

        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4 font-mono">
            WEALTH SIMULATOR
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Invest your exit and explore financial outcomes
          </p>
          
          {/* Wealth Display */}
          <div className="inline-block bg-slate-900 border border-primary/20 rounded-lg p-6">
            <div className="text-sm text-muted-foreground mb-2">Available Wealth</div>
            <div className="text-4xl font-bold text-primary font-mono">
              {formatWealth(availableWealth)}
            </div>
            <div className="text-sm text-accent mt-2">
              Total Exit: {formatWealth(initialWealth)}
            </div>
          </div>
        </div>

        {/* Investment Cards */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            Investment Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InvestmentCard
              type="lifeInsurance"
              allocated={portfolio.lifeInsurance}
              onAllocate={() => setSelectedInvestment("lifeInsurance")}
            />
            <InvestmentCard
              type="funds"
              allocated={portfolio.funds}
              onAllocate={() => setSelectedInvestment("funds")}
            />
            <InvestmentCard
              type="privateEquity"
              allocated={portfolio.privateEquity}
              onAllocate={() => setSelectedInvestment("privateEquity")}
            />
            <InvestmentCard
              type="stocks"
              allocated={portfolio.stocks}
              onAllocate={() => setSelectedInvestment("stocks")}
            />
            <InvestmentCard
              type="crypto"
              allocated={portfolio.crypto}
              onAllocate={() => setSelectedInvestment("crypto")}
            />
          </div>
        </div>

        {/* Portfolio Visualization */}
        {totalAllocated > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
              <PieChartIcon className="h-6 w-6" />
              Your Portfolio
            </h2>
            <PortfolioVisual
              portfolio={portfolio}
              totalAllocated={totalAllocated}
              availableWealth={availableWealth}
            />
          </div>
        )}

        {/* Action Buttons */}
        {totalAllocated > 0 && (
          <div className="flex gap-4 justify-center mb-12">
            <Button
              onClick={() => setShowResults(true)}
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              Run Simulation
            </Button>
            <Button
              onClick={handleReset}
              size="lg"
              variant="outline"
            >
              Reset Portfolio
            </Button>
          </div>
        )}

        {/* Simulation Results */}
        {showResults && totalAllocated > 0 && (
          <SimulationResults
            portfolio={portfolio}
            onClose={() => setShowResults(false)}
          />
        )}
      </div>

      {/* Allocation Modal */}
      <AllocationModal
        isOpen={selectedInvestment !== null}
        investmentType={selectedInvestment}
        maxAmount={availableWealth}
        onAllocate={handleAllocate}
        onClose={() => setSelectedInvestment(null)}
      />
    </div>
  );
};

export default WealthSimulator;
