import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Minus, X } from "lucide-react";
import { Portfolio } from "@/pages/WealthSimulator";

interface SimulationResultsProps {
  portfolio: Portfolio;
  onClose: () => void;
}

type Scenario = "optimistic" | "neutral" | "bear";

const scenarioMultipliers: Record<Scenario, Record<keyof Portfolio, number>> = {
  optimistic: {
    lifeInsurance: 1.02,
    funds: 1.08,
    privateEquity: 1.15,
    stocks: 1.20,
    crypto: 1.60,
  },
  neutral: {
    lifeInsurance: 1.01,
    funds: 1.03,
    privateEquity: 1.00,
    stocks: 1.05,
    crypto: 1.20,
  },
  bear: {
    lifeInsurance: 1.00,
    funds: 0.95,
    privateEquity: 0.80,
    stocks: 0.85,
    crypto: 0.50,
  },
};

const scenarioDescriptions = {
  optimistic: "Strong economic growth, low inflation, bullish markets",
  neutral: "Steady growth, moderate inflation, stable markets",
  bear: "Economic downturn, high inflation, bearish markets",
};

const investmentLabels = {
  lifeInsurance: "Life Insurance",
  funds: "Investment Funds",
  privateEquity: "Private Equity",
  stocks: "Stocks",
  crypto: "Crypto",
};

const formatAmount = (value: number) => `€${value.toFixed(1)}K`;

export const SimulationResults = ({ portfolio, onClose }: SimulationResultsProps) => {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>("neutral");

  const calculateResults = (scenario: Scenario) => {
    const multipliers = scenarioMultipliers[scenario];
    const results: Record<keyof Portfolio, number> = {} as any;
    let totalBefore = 0;
    let totalAfter = 0;

    Object.entries(portfolio).forEach(([key, value]) => {
      const investmentKey = key as keyof Portfolio;
      const multiplier = multipliers[investmentKey];
      const newValue = value * multiplier;
      results[investmentKey] = newValue;
      totalBefore += value;
      totalAfter += newValue;
    });

    const gain = totalAfter - totalBefore;
    const gainPercentage = ((gain / totalBefore) * 100);

    return { results, totalBefore, totalAfter, gain, gainPercentage };
  };

  const renderScenarioContent = (scenario: Scenario) => {
    const { results, totalBefore, totalAfter, gain, gainPercentage } = calculateResults(scenario);
    const isPositive = gain >= 0;

    return (
      <div className="space-y-6">
        {/* Scenario Description */}
        <div className="p-4 bg-slate-950 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">{scenarioDescriptions[scenario]}</p>
        </div>

        {/* Total Results */}
        <Card className="bg-slate-950 border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl">Portfolio Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Initial Value</div>
                <div className="text-2xl font-bold font-mono text-accent">
                  {formatAmount(totalBefore)}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Final Value</div>
                <div className="text-2xl font-bold font-mono text-primary">
                  {formatAmount(totalAfter)}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-primary/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isPositive ? (
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  ) : gain === 0 ? (
                    <Minus className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-500" />
                  )}
                  <span className="text-sm text-muted-foreground">
                    {isPositive ? "Gain" : gain === 0 ? "No Change" : "Loss"}
                  </span>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold font-mono ${
                    isPositive ? "text-green-500" : gain === 0 ? "text-yellow-500" : "text-red-500"
                  }`}>
                    {isPositive ? "+" : ""}{formatAmount(gain)}
                  </div>
                  <div className={`text-sm font-mono ${
                    isPositive ? "text-green-500" : gain === 0 ? "text-yellow-500" : "text-red-500"
                  }`}>
                    {isPositive ? "+" : ""}{gainPercentage.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Breakdown */}
        <Card className="bg-slate-950 border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl">Asset Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(portfolio).map(([key, initialValue]) => {
                if (initialValue === 0) return null;
                const investmentKey = key as keyof Portfolio;
                const finalValue = results[investmentKey];
                const assetGain = finalValue - initialValue;
                const assetGainPercent = ((assetGain / initialValue) * 100);
                const isAssetPositive = assetGain >= 0;

                return (
                  <div
                    key={key}
                    className="p-3 bg-slate-900 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">{investmentLabels[investmentKey]}</span>
                      <div className="text-right">
                        <div className="font-mono text-primary">
                          {formatAmount(finalValue)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          was {formatAmount(initialValue)}
                        </div>
                      </div>
                    </div>
                    <div className={`text-sm font-mono ${
                      isAssetPositive ? "text-green-500" : assetGain === 0 ? "text-yellow-500" : "text-red-500"
                    }`}>
                      {isAssetPositive ? "+" : ""}{formatAmount(assetGain)} ({isAssetPositive ? "+" : ""}{assetGainPercent.toFixed(2)}%)
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <Card className="bg-slate-900 border-primary/20">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl text-primary mb-2">
              Simulation Results
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Explore different market scenarios
            </p>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedScenario} onValueChange={(v) => setSelectedScenario(v as Scenario)}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="optimistic">Optimistic 📈</TabsTrigger>
            <TabsTrigger value="neutral">Neutral ➡️</TabsTrigger>
            <TabsTrigger value="bear">Bear Market 📉</TabsTrigger>
          </TabsList>

          <TabsContent value="optimistic">
            {renderScenarioContent("optimistic")}
          </TabsContent>
          <TabsContent value="neutral">
            {renderScenarioContent("neutral")}
          </TabsContent>
          <TabsContent value="bear">
            {renderScenarioContent("bear")}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
