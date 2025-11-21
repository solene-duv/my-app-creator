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

const FAKE_PLAYERS = [
  "Marie D.",
  "Thomas M.",
  "Sophie B.",
  "Lucas P.",
  "Emma R.",
  "Hugo L.",
  "Léa M.",
  "Nathan G.",
  "Chloé F.",
  "Alexandre L.",
  "Camille D.",
  "Julien S.",
  "Manon M.",
  "Louis F.",
  "Sarah B.",
  "Antoine D.",
  "Laura L.",
  "Maxime V.",
  "Inès G.",
  "Pierre R.",
];

// Generate main leaderboard data for XHEC Entrepreneur cohort
const generateMainLeaderboard = () => {
  const players = FAKE_PLAYERS.slice(0, 9).map((name, index) => ({
    rank: index + 1,
    name,
    valuation: Math.floor(Math.random() * 40000000) + 15000000, // 15M to 55M
    isCurrentUser: false,
  }));
  
  // Add current user "Me" at the top
  players.unshift({
    rank: 1,
    name: "Me",
    valuation: 65000000, // 65M - winning valuation
    isCurrentUser: true,
  });
  
  return players.sort((a, b) => b.valuation - a.valuation)
    .map((item, index) => ({ ...item, rank: index + 1 }));
};

// Generate individual rankings (first names only)
const generateIndividualRankings = () => {
  const firstNames = [
    "Marie", "Thomas", "Sophie", "Lucas", "Emma", "Hugo", "Léa", "Nathan",
    "Chloé", "Alexandre", "Camille", "Julien", "Manon", "Louis", "Sarah",
    "Antoine", "Laura", "Maxime", "Inès", "Pierre", "Clara", "Gabriel",
    "Anaïs", "Arthur", "Julie", "Mathis", "Zoé", "Raphaël", "Alice", "Tom"
  ];
  
  const rankings = firstNames.map((name, index) => ({
    rank: index + 2, // Start from 2 since "Me" will be 1
    firstName: name,
    isCurrentUser: false,
  }));
  
  // Add current user "Me" at the top
  rankings.unshift({
    rank: 1,
    firstName: "Me",
    isCurrentUser: true,
  });
  
  return rankings;
};

const Leaderboard = () => {
  const [showAllMain, setShowAllMain] = useState(false);
  const [showAllIndividual, setShowAllIndividual] = useState(false);
  
  const mainLeaderboard = generateMainLeaderboard();
  const individualRankings = generateIndividualRankings();
  
  const displayedMainData = showAllMain ? mainLeaderboard : mainLeaderboard.slice(0, 10);
  const displayedIndividualData = showAllIndividual ? individualRankings : individualRankings.slice(0, 15);

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

          {/* BNP Rewards Section - Moved to Top */}
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-primary/30 p-6 mb-8">
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

          {/* Main Leaderboard Table - XHEC Entrepreneur Cohort */}
          <Card className="bg-slate-900 border-primary/20 mb-8">
            <div className="p-4 border-b border-primary/20">
              <h3 className="text-xl font-bold text-foreground">Master XHEC Entrepreneur Cohort</h3>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-primary/20 hover:bg-slate-800/50">
                    <TableHead className="text-primary font-bold">Rank</TableHead>
                    <TableHead className="text-primary font-bold">Player Name</TableHead>
                    <TableHead className="text-primary font-bold text-right">Valuation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedMainData.map((entry) => (
                    <TableRow
                      key={entry.rank}
                      className={`border-primary/10 transition-colors ${
                        entry.isCurrentUser 
                          ? "bg-primary/20 hover:bg-primary/30 border-primary/40" 
                          : "hover:bg-slate-800/50"
                      }`}
                    >
                      <TableCell className="font-bold">
                        <div className="flex items-center gap-2">
                          {entry.rank <= 3 && <Trophy className={`h-5 w-5 ${getRankColor(entry.rank)}`} />}
                          <span className={entry.isCurrentUser ? "text-primary" : getRankColor(entry.rank)}>
                            #{entry.rank}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className={`font-medium ${entry.isCurrentUser ? "text-primary font-bold" : ""}`}>
                        {entry.name}
                      </TableCell>
                      <TableCell className={`text-right font-mono font-bold ${
                        entry.isCurrentUser ? "text-primary" : "text-accent"
                      }`}>
                        {formatValuation(entry.valuation)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {!showAllMain && mainLeaderboard.length > 10 && (
              <div className="p-4 border-t border-primary/20">
                <Button
                  onClick={() => setShowAllMain(true)}
                  variant="outline"
                  className="w-full"
                >
                  See more
                </Button>
              </div>
            )}
          </Card>

          {/* Individual Rankings Table - First Names Only */}
          <Card className="bg-slate-900 border-primary/20">
            <div className="p-4 border-b border-primary/20">
              <h3 className="text-xl font-bold text-foreground">Individual Rankings</h3>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-primary/20 hover:bg-slate-800/50">
                    <TableHead className="text-primary font-bold">Rank</TableHead>
                    <TableHead className="text-primary font-bold">First Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedIndividualData.map((entry) => (
                    <TableRow
                      key={entry.rank}
                      className={`border-primary/10 transition-colors ${
                        entry.isCurrentUser 
                          ? "bg-primary/20 hover:bg-primary/30 border-primary/40" 
                          : "hover:bg-slate-800/50"
                      }`}
                    >
                      <TableCell className="font-bold">
                        <span className={entry.isCurrentUser ? "text-primary" : getRankColor(entry.rank)}>
                          #{entry.rank}
                        </span>
                      </TableCell>
                      <TableCell className={`font-medium ${entry.isCurrentUser ? "text-primary font-bold" : ""}`}>
                        {entry.firstName}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {!showAllIndividual && individualRankings.length > 15 && (
              <div className="p-4 border-t border-primary/20">
                <Button
                  onClick={() => setShowAllIndividual(true)}
                  variant="outline"
                  className="w-full"
                >
                  See more
                </Button>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
