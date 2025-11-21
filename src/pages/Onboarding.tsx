import { motion } from 'framer-motion';
import { Rocket, Diamond, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '@/contexts/GameContext';

type ArchetypeCard = {
  id: 'FOUNDER' | 'EARNER' | 'HEIR';
  icon: typeof Rocket;
  title: string;
  description: string;
  tag: string;
  gradient: string;
};

const archetypes: ArchetypeCard[] = [
  {
    id: 'FOUNDER',
    icon: Rocket,
    title: 'The Founder',
    description: 'Launch a Startup.',
    tag: 'High Risk',
    gradient: 'from-[#00E676] to-[#00C853]'
  },
  {
    id: 'EARNER',
    icon: Diamond,
    title: 'The Equity Earner',
    description: 'Optimize my BSPCE.',
    tag: 'Smart Wealth',
    gradient: 'from-[#7C4DFF] to-[#651FFF]'
  },
  {
    id: 'HEIR',
    icon: Leaf,
    title: 'The Impact Heir',
    description: 'Invest Responsibly.',
    tag: 'Legacy',
    gradient: 'from-[#00E5FF] to-[#00B8D4]'
  }
];

const Onboarding = () => {
  const navigate = useNavigate();
  const { setUserArchetype } = useGame();

  const handleSelectArchetype = (archetype: 'FOUNDER' | 'EARNER' | 'HEIR') => {
    setUserArchetype(archetype);
    
    setTimeout(() => navigate('/dashboard'), 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl w-full space-y-12"
      >
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00E676] to-[#7C4DFF] bg-clip-text text-transparent mb-8"
          >
            Play Paribas
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-6xl md:text-8xl font-bold bg-gradient-to-r from-[#00E676] to-[#7C4DFF] bg-clip-text text-transparent"
          >
            Stop Saving.
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-5xl md:text-7xl font-bold text-white"
          >
            Start Building.
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {archetypes.map((archetype, index) => {
            const Icon = archetype.icon;
            return (
              <motion.div
                key={archetype.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelectArchetype(archetype.id)}
                className="glass-card p-8 cursor-pointer group relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${archetype.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative z-10 space-y-6">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${archetype.gradient} flex items-center justify-center`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-2xl font-bold text-white">
                        {archetype.title}
                      </h3>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/80">
                        {archetype.tag}
                      </span>
                    </div>
                    <p className="text-lg text-white/60">
                      {archetype.description}
                    </p>
                  </div>

                  <div className={`h-1 rounded-full bg-gradient-to-r ${archetype.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center space-y-6"
        >
          <p className="text-white/40 text-sm">
            Choose your path. Build your legacy.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/unicorn-game')}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#00E676] to-[#7C4DFF] text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            🦄 Launch The Unicorn Run
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Onboarding;
