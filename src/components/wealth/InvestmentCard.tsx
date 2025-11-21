import { Shield, TrendingUp, Building2, LineChart, Bitcoin, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Portfolio } from "@/pages/WealthSimulator";

interface InvestmentCardProps {
  type: keyof Portfolio;
  allocated: number;
  onAllocate: () => void;
}

const investmentData = {
  lifeInsurance: {
    icon: Shield,
    title: "Life Insurance",
    description: "Protect your wealth and provide for loved ones",
    tooltip: {
      what: "Life insurance provides financial protection and wealth transfer benefits.",
      why: "Essential for estate planning and family security.",
      pros: "Tax benefits, guaranteed payout, peace of mind",
      cons: "Lower returns, long-term commitment required",
      risk: "Very Low",
      timeHorizon: "Long-term (20+ years)",
    },
  },
  funds: {
    icon: TrendingUp,
    title: "Investment Funds",
    description: "Diversified portfolios managed by professionals",
    tooltip: {
      what: "Pooled investment vehicles offering diversified exposure to markets.",
      why: "Professional management with built-in diversification.",
      pros: "Low effort, diversified, professional management",
      cons: "Management fees, less control",
      risk: "Low to Medium",
      timeHorizon: "Medium-term (5-10 years)",
    },
  },
  privateEquity: {
    icon: Building2,
    title: "Private Equity",
    description: "Invest in private companies for high growth potential",
    tooltip: {
      what: "Direct investments in private, non-listed companies.",
      why: "Access to high-growth opportunities before public markets.",
      pros: "High potential returns, active involvement",
      cons: "Illiquid, high minimum, long lock-up",
      risk: "High",
      timeHorizon: "Long-term (7-10 years)",
    },
  },
  stocks: {
    icon: LineChart,
    title: "Stocks",
    description: "Own shares in public companies",
    tooltip: {
      what: "Equity ownership in publicly traded companies.",
      why: "Historically strong returns and liquidity.",
      pros: "High liquidity, growth potential, dividends",
      cons: "Market volatility, requires research",
      risk: "Medium to High",
      timeHorizon: "Medium-term (3-7 years)",
    },
  },
  crypto: {
    icon: Bitcoin,
    title: "Crypto",
    description: "Digital assets with high volatility and potential",
    tooltip: {
      what: "Decentralized digital currencies and blockchain assets.",
      why: "Emerging asset class with innovation potential.",
      pros: "High growth potential, 24/7 trading, innovation",
      cons: "Extreme volatility, regulatory uncertainty",
      risk: "Very High",
      timeHorizon: "Speculative (1-5 years)",
    },
  },
};

const formatAmount = (value: number) => `€${value.toFixed(1)}K`;

export const InvestmentCard = ({ type, allocated, onAllocate }: InvestmentCardProps) => {
  const data = investmentData[type];
  const Icon = data.icon;

  return (
    <Card className="bg-slate-900 border-primary/20 hover:border-primary/40 transition-all">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{data.title}</CardTitle>
              {allocated > 0 && (
                <div className="text-sm font-mono text-accent">
                  {formatAmount(allocated)}
                </div>
              )}
            </div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  <Info className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs p-4 bg-slate-950 border-primary/20">
                <div className="space-y-2 text-sm">
                  <div>
                    <div className="font-bold text-primary mb-1">What is it?</div>
                    <div className="text-muted-foreground">{data.tooltip.what}</div>
                  </div>
                  <div>
                    <div className="font-bold text-primary mb-1">Why invest?</div>
                    <div className="text-muted-foreground">{data.tooltip.why}</div>
                  </div>
                  <div>
                    <div className="font-bold text-green-500 mb-1">Pros:</div>
                    <div className="text-muted-foreground">{data.tooltip.pros}</div>
                  </div>
                  <div>
                    <div className="font-bold text-red-500 mb-1">Cons:</div>
                    <div className="text-muted-foreground">{data.tooltip.cons}</div>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-primary/20">
                    <div>
                      <div className="text-xs text-muted-foreground">Risk Level</div>
                      <div className="font-bold">{data.tooltip.risk}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Time Horizon</div>
                      <div className="font-bold">{data.tooltip.timeHorizon}</div>
                    </div>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={onAllocate}
          className="w-full"
          variant="outline"
        >
          Allocate
        </Button>
      </CardContent>
    </Card>
  );
};
