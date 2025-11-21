import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Lock, Sparkles, X } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface SkillNode {
  id: number;
  title: string;
  status: 'completed' | 'unlocked' | 'locked';
  icon: string;
  archetype: 'FOUNDER' | 'EARNER' | 'HEIR';
}

const SkillTree = () => {
  const { userArchetype, addXP } = useGame();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
  const [equityOffer, setEquityOffer] = useState([20]);

  const skills: Record<string, SkillNode[]> = {
    FOUNDER: [
      { id: 1, title: 'Cashflow Basics', status: 'completed', icon: '💰', archetype: 'FOUNDER' },
      { id: 2, title: 'Term Sheet Negotiation', status: 'unlocked', icon: '📄', archetype: 'FOUNDER' },
      { id: 3, title: 'Exit Strategy', status: 'locked', icon: '🚀', archetype: 'FOUNDER' },
      { id: 4, title: 'Dilution Defense', status: 'locked', icon: '🛡️', archetype: 'FOUNDER' },
    ],
    EARNER: [
      { id: 1, title: 'Tax Optimization', status: 'completed', icon: '📊', archetype: 'EARNER' },
      { id: 2, title: 'BSPCE Simulator', status: 'unlocked', icon: '💎', archetype: 'EARNER' },
      { id: 3, title: 'Angel Investing', status: 'locked', icon: '👼', archetype: 'EARNER' },
    ],
    HEIR: [
      { id: 1, title: 'Family Office 101', status: 'completed', icon: '🏛️', archetype: 'HEIR' },
      { id: 2, title: 'Greenwashing Detector', status: 'unlocked', icon: '🌱', archetype: 'HEIR' },
      { id: 3, title: 'Impact Investing', status: 'locked', icon: '🌍', archetype: 'HEIR' },
    ],
  };

  const currentSkills = userArchetype ? skills[userArchetype] : [];

  const handleNodeClick = (node: SkillNode) => {
    if (node.status === 'unlocked') {
      setSelectedNode(node);
    }
  };

  const handleCompleteSimulation = () => {
    const dealQuality = equityOffer[0] <= 15 ? 'excellent' : equityOffer[0] <= 20 ? 'good' : 'fair';
    const xpGain = equityOffer[0] <= 15 ? 300 : equityOffer[0] <= 20 ? 200 : 100;

    addXP(xpGain);
    toast({
      title: dealQuality === 'excellent' ? '🎉 Excellent Negotiation!' : dealQuality === 'good' ? '👍 Good Deal!' : '✅ Fair Deal',
      description: `You negotiated ${equityOffer[0]}% equity. +${xpGain} XP`,
    });

    setSelectedNode(null);
    setEquityOffer([20]);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
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
          <div>
            <h1 className="font-display text-4xl font-bold text-white mb-2">Skill Tree</h1>
            <p className="text-white/60">Master your financial journey</p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard')}
            className="glass-card border-white/20 text-white hover:bg-white/10"
          >
            Back
          </Button>
        </motion.div>

        {/* Skill Path */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00E676] via-[#7C4DFF] to-white/20" />

          <div className="space-y-6">
            {currentSkills.map((node, index) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Node */}
                <div className="flex items-center gap-6">
                  <motion.button
                    whileHover={node.status !== 'locked' ? { scale: 1.1 } : {}}
                    whileTap={node.status !== 'locked' ? { scale: 0.95 } : {}}
                    onClick={() => handleNodeClick(node)}
                    disabled={node.status === 'locked'}
                    className={`relative z-10 w-24 h-24 rounded-3xl flex items-center justify-center text-4xl transition-all ${
                      node.status === 'completed'
                        ? 'bg-gradient-to-br from-yellow-500 to-orange-500 shadow-lg shadow-yellow-500/20'
                        : node.status === 'unlocked'
                        ? 'glass-card border-[#00E676] shadow-lg shadow-[#00E676]/20 animate-pulse'
                        : 'glass border-white/5 grayscale opacity-50'
                    }`}
                  >
                    {node.status === 'completed' && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                        <Check className="w-5 h-5 text-black" />
                      </div>
                    )}
                    {node.status === 'locked' && (
                      <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-3xl">
                        <Lock className="w-8 h-8 text-white/40" />
                      </div>
                    )}
                    <span>{node.icon}</span>
                  </motion.button>

                  {/* Card */}
                  <motion.div
                    whileHover={node.status === 'unlocked' ? { x: 10 } : {}}
                    className={`flex-1 glass-card p-6 ${
                      node.status === 'unlocked' ? 'border-[#00E676]/50 cursor-pointer' : ''
                    }`}
                    onClick={() => handleNodeClick(node)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-display text-xl font-bold text-white mb-1">
                          {node.title}
                        </h3>
                        <p className="text-sm text-white/60">
                          {node.status === 'completed' && '✅ Completed'}
                          {node.status === 'unlocked' && '🔓 Click to start'}
                          {node.status === 'locked' && '🔒 Complete previous skills'}
                        </p>
                      </div>
                      {node.status === 'unlocked' && (
                        <Sparkles className="w-6 h-6 text-[#00E676] animate-pulse" />
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Simulator Modal */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4"
              onClick={() => setSelectedNode(null)}
            >
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-card p-8 max-w-2xl w-full rounded-t-3xl md:rounded-3xl"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="font-display text-3xl font-bold text-white mb-2">
                      {selectedNode.title}
                    </h2>
                    <p className="text-white/60">Interactive Simulation</p>
                  </div>
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                <div className="space-y-8">
                  {/* Scenario */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-[#7C4DFF]/10 to-[#00E676]/10 border border-white/10">
                    <p className="text-white text-lg">
                      📊 An investor offers <span className="text-[#00E676] font-bold">€500,000</span> for{' '}
                      <span className="text-[#7C4DFF] font-bold">{equityOffer[0]}%</span> equity.
                    </p>
                    <p className="text-white/60 mt-2">Drag the slider to negotiate your best deal.</p>
                  </div>

                  {/* Slider */}
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-white/60">
                      <span>Less Equity</span>
                      <span>More Equity</span>
                    </div>
                    <Slider
                      value={equityOffer}
                      onValueChange={setEquityOffer}
                      min={10}
                      max={30}
                      step={1}
                      className="py-4"
                    />
                    <div className="text-center">
                      <div className="inline-block px-6 py-3 rounded-full bg-white/10">
                        <span className="text-3xl font-bold bg-gradient-to-r from-[#00E676] to-[#7C4DFF] bg-clip-text text-transparent">
                          {equityOffer[0]}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Feedback */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-white/80 text-sm">
                      {equityOffer[0] <= 15 && '🎯 Excellent negotiation! You maintain strong ownership.'}
                      {equityOffer[0] > 15 && equityOffer[0] <= 20 && '👍 Good deal! Balanced equity split.'}
                      {equityOffer[0] > 20 && '⚠️ Consider negotiating for less equity dilution.'}
                    </p>
                  </div>

                  <Button
                    onClick={handleCompleteSimulation}
                    size="lg"
                    className="w-full rounded-full bg-gradient-to-r from-[#00E676] to-[#00C853] hover:from-[#00C853] hover:to-[#00E676] text-black font-bold"
                  >
                    Complete Simulation
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SkillTree;
