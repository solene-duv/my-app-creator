import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trophy, Award, CreditCard, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SCHOOLS = [
  "XHEC Entrepreneur",
  "Polytechnique",
  "HEC",
  "CentraleSupélec",
  "ESSEC",
  "Sciences Po",
];

const FAKE_NAMES = [
  "Marie Dubois",
  "Thomas Martin",
  "Sophie Bernard",
  "Lucas Petit",
  "Emma Rousseau",
  "Hugo Lefebvre",
  "Léa Moreau",
  "Nathan Garcia",
  "Chloé Fontaine",
  "Alexandre Laurent",
  "Camille Durand",
  "Julien Simon",
  "Manon Michel",
  "Louis Fournier",
  "Sarah Bonnet",
  "Antoine Dupont",
  "Laura Lambert",
  "Maxime Vincent",
  "Inès Girard",
  "Pierre Roussel",
  "Clara Blanc",
  "Gabriel Morel",
  "Anaïs André",
  "Arthur Mercier",
  "Julie Leroy",
];

// Generate fake leaderboard data
const generateLeaderboardData = () => {
  const data = FAKE_NAMES.map((name, index) => ({
    rank: index + 1,
    name,
    school: SCHOOLS[index % SCHOOLS.length],
    valuation: Math.floor(Math.random() * 50000000) + 10000000, // 10M to 60M
  })).sort((a, b) => b.valuation - a.valuation);

  // Update ranks after sorting
  return data.map((item, index) => ({ ...item, rank: index + 1 }));
};

const Leaderboard = () => {
  const [showAll, setShowAll] = useState(false);
  const leaderboardData = generateLeaderboardData();
  const displayedData = showAll ? leaderboardData : leaderboardData.slice(0, 10);

  const formatValuation = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${(value / 1000).toFixed(0)}K`;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-500";
    if (rank === 2) return "text-slate-400";
    if (rank === 3) return "text-orange-600";
    return "text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 w-full bg-slate-900/95 backdrop-blur-md shadow-lg z-50 border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/unicorn-game">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Game
              </Button>
            </Link>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Play Paribas
            </h2>
            <div className="w-32" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="h-10 w-10 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Leaderboard
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Compare your performance with students from different schools
            </p>
          </div>

          {/* Leaderboard Table */}
          <Card className="bg-slate-900 border-primary/20 mb-8">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-primary/20 hover:bg-slate-800/50">
                    <TableHead className="text-primary font-bold">Rank</TableHead>
                    <TableHead className="text-primary font-bold">Player Name</TableHead>
                    <TableHead className="text-primary font-bold">School</TableHead>
                    <TableHead className="text-primary font-bold text-right">Valuation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedData.map((entry) => (
                    <TableRow
                      key={entry.rank}
                      className="border-primary/10 hover:bg-slate-800/50 transition-colors"
                    >
                      <TableCell className="font-bold">
                        <div className="flex items-center gap-2">
                          {entry.rank <= 3 && <Trophy className={`h-5 w-5 ${getRankColor(entry.rank)}`} />}
                          <span className={getRankColor(entry.rank)}>
                            #{entry.rank}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{entry.name}</TableCell>
                      <TableCell className="text-muted-foreground">{entry.school}</TableCell>
                      <TableCell className="text-right font-mono font-bold text-accent">
                        {formatValuation(entry.valuation)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {!showAll && leaderboardData.length > 10 && (
              <div className="p-4 border-t border-primary/20">
                <Button
                  onClick={() => setShowAll(true)}
                  variant="outline"
                  className="w-full"
                >
                  See more
                </Button>
              </div>
            )}
          </Card>

          {/* BNP Rewards Section */}
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-primary/30 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Award className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold text-primary">BNP Rewards</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Reward 1 */}
              <div className="bg-slate-950/50 p-4 rounded-lg border border-primary/20 hover:border-primary/40 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground">1st Prize</h3>
                </div>
                <p className="text-2xl font-bold text-accent mb-1">100€</p>
                <p className="text-sm text-muted-foreground">Cash prize</p>
              </div>

              {/* Reward 2 */}
              <div className="bg-slate-950/50 p-4 rounded-lg border border-primary/20 hover:border-primary/40 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground">2nd Prize</h3>
                </div>
                <p className="text-xl font-bold text-accent mb-1">3 months</p>
                <p className="text-sm text-muted-foreground">Visa Premium access</p>
              </div>

              {/* Reward 3 */}
              <div className="bg-slate-950/50 p-4 rounded-lg border border-primary/20 hover:border-primary/40 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground">3rd Prize</h3>
                </div>
                <p className="text-xl font-bold text-accent mb-1">Reduced rate</p>
                <p className="text-sm text-muted-foreground">Student loan interest</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
