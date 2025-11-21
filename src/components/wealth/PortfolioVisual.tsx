import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Portfolio } from "@/pages/WealthSimulator";

interface PortfolioVisualProps {
  portfolio: Portfolio;
  totalAllocated: number;
  availableWealth: number;
}

const formatAmount = (value: number) => `€${value.toFixed(1)}K`;

const investmentColors = {
  lifeInsurance: "#10b981", // green
  funds: "#3b82f6", // blue
  privateEquity: "#8b5cf6", // purple
  stocks: "#f59e0b", // amber
  crypto: "#ef4444", // red
};

const investmentLabels = {
  lifeInsurance: "Life Insurance",
  funds: "Investment Funds",
  privateEquity: "Private Equity",
  stocks: "Stocks",
  crypto: "Crypto",
};

export const PortfolioVisual = ({
  portfolio,
  totalAllocated,
  availableWealth,
}: PortfolioVisualProps) => {
  const getPercentage = (amount: number) => {
    if (totalAllocated === 0) return 0;
    return (amount / totalAllocated) * 100;
  };

  const portfolioEntries = Object.entries(portfolio).filter(([_, value]) => value > 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Pie Chart (Simple Bar Visualization) */}
      <Card className="bg-slate-900 border-primary/20">
        <CardHeader>
          <CardTitle>Portfolio Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {portfolioEntries.map(([key, value]) => {
              const investmentKey = key as keyof Portfolio;
              const percentage = getPercentage(value);
              return (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">
                      {investmentLabels[investmentKey]}
                    </span>
                    <span className="font-mono text-primary font-bold">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full h-8 bg-slate-950 rounded-lg overflow-hidden">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: investmentColors[investmentKey],
                      }}
                    />
                  </div>
                  <div className="text-xs text-accent font-mono mt-1">
                    {formatAmount(value)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Remaining Cash */}
          {availableWealth > 0 && (
            <div className="mt-6 pt-6 border-t border-primary/20">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Remaining Cash</span>
                <span className="font-mono text-accent font-bold">
                  {formatAmount(availableWealth)}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Portfolio Table */}
      <Card className="bg-slate-900 border-primary/20">
        <CardHeader>
          <CardTitle>Portfolio Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-muted-foreground border-b border-primary/20">
                  <th className="pb-2">Asset</th>
                  <th className="pb-2 text-right">Amount</th>
                  <th className="pb-2 text-right">%</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {portfolioEntries.map(([key, value]) => {
                  const investmentKey = key as keyof Portfolio;
                  const percentage = getPercentage(value);
                  return (
                    <tr key={key} className="border-b border-slate-800">
                      <td className="py-3">{investmentLabels[investmentKey]}</td>
                      <td className="py-3 text-right font-mono text-primary">
                        {formatAmount(value)}
                      </td>
                      <td className="py-3 text-right font-mono text-accent">
                        {percentage.toFixed(1)}%
                      </td>
                    </tr>
                  );
                })}
                <tr className="font-bold">
                  <td className="pt-3">Total Invested</td>
                  <td className="pt-3 text-right font-mono text-primary">
                    {formatAmount(totalAllocated)}
                  </td>
                  <td className="pt-3 text-right font-mono text-accent">
                    100%
                  </td>
                </tr>
              </tbody>
            </table>

            {availableWealth > 0 && (
              <div className="mt-4 p-3 bg-slate-950 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cash Available</span>
                  <span className="font-mono text-accent font-bold">
                    {formatAmount(availableWealth)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
