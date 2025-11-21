import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Plus, TrendingUp } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { capitalSaved, xpPoints, level, streak, addCapital, userArchetype } = useGame();
  const [showAICoach, setShowAICoach] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const capitalTarget = 1000;
  const progress = (capitalSaved / capitalTarget) * 100;

  useEffect(() => {
    if (!userArchetype) {
      navigate('/');
      return;
    }
    
    const timer = setTimeout(() => setShowAICoach(true), 2000);
    return () => clearTimeout(timer);
  }, [userArchetype, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      toast({
        title: "🚀 New Quest Available!",
        description: "Analyze your Burn Rate (+200 XP)",
      });
    }, 5000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleAddCapital = () => {
    addCapital(50);
    toast({
      title: "💰 Capital Added!",
      description: "+€50 to your seed fund (+50 XP)",
    });

    if (capitalSaved + 50 >= capitalTarget) {
      setTimeout(() => {
        toast({
          title: "🎉 MILESTONE UNLOCKED!",
          description: "Company Incorporation Available!",
        });
      }, 500);
    }
  };

  const levelTitle = level === 1 ? "Bootstrapper" : "Entrepreneur";

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8">
      {/* Scrolling Social Ticker */}
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-[#00E676]/20 to-[#7C4DFF]/20 backdrop-blur-sm border-b border-white/10 z-40">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 py-2 text-sm text-white/60"
        >
          <span>Sarah just unlocked 'Term Sheet' Master Class</span>
          <span>•</span>
          <span>Tom just opened his Pro Account</span>
          <span>•</span>
          <span>Emma reached Level 5</span>
          <span>•</span>
          <span>Alex completed 'Exit Strategy' simulation</span>
          <span>•</span>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 space-y-8">
        {/* Play Paribas Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => navigate('/')}
          className="font-display text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#00E676] to-[#7C4DFF] bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity"
        >
          Play Paribas
        </motion.h1>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00E676] to-[#00C853] flex items-center justify-center text-2xl font-bold">
              A
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold text-lg">Level {level}</span>
                <span className="px-3 py-1 rounded-full bg-[#00E676]/20 text-[#00E676] text-sm font-semibold">
                  {levelTitle}
                </span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>{xpPoints} XP</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 glass-card px-4 py-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="text-white font-semibold">{streak} Day Streak</span>
          </div>
        </motion.div>

        {/* Hero Capital Builder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#00E676]/5 to-[#7C4DFF]/5" />
          
          <div className="relative z-10 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                Incorporation Capital
              </h2>
              <p className="text-white/60">Your path to company creation</p>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative w-64 h-64">
                {/* Circular Progress */}
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="12"
                    fill="none"
                  />
                  <motion.circle
                    cx="128"
                    cy="128"
                    r="120"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 120}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 120 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 120 * (1 - progress / 100) }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00E676" />
                      <stop offset="100%" stopColor={progress >= 100 ? "#FFD700" : "#7C4DFF"} />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div
                    key={capitalSaved}
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                  >
                    <div className="text-5xl font-bold bg-gradient-to-r from-[#00E676] to-[#7C4DFF] bg-clip-text text-transparent">
                      €{capitalSaved}
                    </div>
                    <div className="text-white/40 text-sm mt-2">
                      / €{capitalTarget}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleAddCapital}
                size="lg"
                className="rounded-full bg-gradient-to-r from-[#00E676] to-[#00C853] hover:from-[#00C853] hover:to-[#00E676] text-black font-bold text-lg px-8 shadow-lg shadow-[#00E676]/20"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add €50
              </Button>
            </div>

            {progress >= 100 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center p-4 rounded-2xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/20"
              >
                <p className="text-2xl font-bold text-yellow-400">
                  🎉 Company Incorporation UNLOCKED!
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => navigate('/skill-tree')}
            className="glass-card p-6 cursor-pointer group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#7C4DFF]/20 flex items-center justify-center group-hover:bg-[#7C4DFF]/30 transition-colors">
                <TrendingUp className="w-6 h-6 text-[#7C4DFF]" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-2">Skill Tree</h3>
                <p className="text-white/60 text-sm">Master financial strategies</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => navigate('/bnp-investissement')}
            className="glass-card p-6 cursor-pointer group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#00E676]/20 flex items-center justify-center group-hover:bg-[#00E676]/30 transition-colors">
                <Plus className="w-6 h-6 text-[#00E676]" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-2">BNP Investissement</h3>
                <p className="text-white/60 text-sm">Redeem real-world rewards</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.03 }}
            className="glass-card p-6 cursor-pointer group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <span className="text-2xl">👤</span>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-2">Profile</h3>
                <p className="text-white/60 text-sm">View your achievements</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* AI Coach */}
        <AnimatePresence>
          {showAICoach && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="fixed bottom-8 right-8 glass-card p-4 max-w-sm z-50 shadow-2xl"
            >
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7C4DFF] to-[#651FFF] flex items-center justify-center flex-shrink-0">
                  🤖
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white/90">
                    Hey! Based on your goal, you should deposit <span className="text-[#00E676] font-semibold">€50</span> to reach your target by Friday.
                  </p>
                  <button className="text-xs text-[#7C4DFF] hover:text-[#651FFF] font-semibold">
                    Learn more →
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;
