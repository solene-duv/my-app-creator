import { motion } from 'framer-motion';
import { Sparkles, Star, Trophy } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Reward {
  id: number;
  title: string;
  description: string;
  xpCost: number;
  capitalRequired?: number;
  badge?: string;
  icon: string;
  gradient: string;
}

const rewards: Reward[] = [
  {
    id: 1,
    title: 'Création K-BIS',
    description: 'Immatriculation gratuite d\'entreprise et documents légaux',
    xpCost: 1000,
    capitalRequired: 1000,
    badge: 'POPULAIRE',
    icon: '🏢',
    gradient: 'from-[#00E676] to-[#00C853]'
  },
  {
    id: 2,
    title: 'Audit Fiscal par IA',
    description: 'Analyse complète d\'optimisation fiscale',
    xpCost: 500,
    badge: 'INTELLIGENT',
    icon: '📊',
    gradient: 'from-[#7C4DFF] to-[#651FFF]'
  },
  {
    id: 3,
    title: 'Café avec un VC',
    description: 'Session de mentorat exclusive d\'1 heure',
    xpCost: 5000,
    badge: 'LÉGENDAIRE',
    icon: '☕',
    gradient: 'from-[#FFD700] to-[#FFA500]'
  },
  {
    id: 4,
    title: 'VIP Roland Garros',
    description: 'Places premium au tournoi de Roland Garros',
    xpCost: 8000,
    badge: 'EXCLUSIF',
    icon: '🎾',
    gradient: 'from-[#FF6B6B] to-[#C92A2A]'
  },
  {
    id: 5,
    title: 'Onboarding Banque Privée',
    description: 'Accès rapide aux services bancaires premium',
    xpCost: 3000,
    icon: '💳',
    gradient: 'from-[#00E5FF] to-[#00B8D4]'
  },
  {
    id: 6,
    title: 'Pack Juridique Startup',
    description: 'Modèles et contrats juridiques complets',
    xpCost: 1500,
    icon: '📝',
    gradient: 'from-[#9C27B0] to-[#7B1FA2]'
  }
];

const Marketplace = () => {
  const { xpPoints, capitalSaved } = useGame();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRedeem = (reward: Reward) => {
    if (xpPoints < reward.xpCost) {
      toast({
        title: "⚠️ XP Insuffisants",
        description: `Il te manque ${reward.xpCost - xpPoints} XP pour débloquer cette récompense.`,
        variant: "destructive",
      });
      return;
    }

    if (reward.capitalRequired && capitalSaved < reward.capitalRequired) {
      toast({
        title: "⚠️ Capital Requis",
        description: `Il te manque ${reward.capitalRequired - capitalSaved}€ dans ton épargne.`,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "🎉 Récompense Débloquée !",
      description: `${reward.title} est maintenant disponible dans ton profil.`,
    });
  };

  const canAfford = (reward: Reward) => {
    const hasXP = xpPoints >= reward.xpCost;
    const hasCapital = !reward.capitalRequired || capitalSaved >= reward.capitalRequired;
    return hasXP && hasCapital;
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="font-display text-5xl font-bold bg-gradient-to-r from-[#00E676] to-[#7C4DFF] bg-clip-text text-transparent mb-2">
              BNP Investissement
            </h1>
            <p className="text-white/60 text-lg">Dépense tes XP. Obtiens de vraies récompenses.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="glass-card px-6 py-3 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#7C4DFF]" />
              <div>
                <div className="text-xs text-white/60">Tes XP</div>
                <div className="text-2xl font-bold text-white">{xpPoints}</div>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="glass-card border-white/20 text-white hover:bg-white/10"
            >
              Retour
            </Button>
          </div>
        </motion.div>

        {/* BNP Connect CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 bg-gradient-to-br from-[#00E676]/10 to-[#7C4DFF]/10 border-[#00E676]/30"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-bold text-white">
                Connecte ton Compte BNP Réel
              </h2>
              <p className="text-white/60">
                Lie ton compte pour échanger des récompenses et suivre ton épargne réelle
              </p>
            </div>
            <Button
              size="lg"
              className="rounded-full bg-gradient-to-r from-[#00E676] to-[#00C853] hover:from-[#00C853] hover:to-[#00E676] text-black font-bold whitespace-nowrap"
            >
              Connecter le Compte
            </Button>
          </div>
        </motion.div>

        {/* Rewards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((reward, index) => {
            const affordable = canAfford(reward);
            
            return (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                whileHover={{ y: -5 }}
                className={`glass-card p-6 relative overflow-hidden group ${
                  !affordable ? 'opacity-60' : ''
                }`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${reward.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                {/* Badge */}
                {reward.badge && (
                  <div className="absolute top-4 right-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${reward.gradient} text-white flex items-center gap-1`}>
                      {reward.badge === 'LEGENDARY' && <Trophy className="w-3 h-3" />}
                      {reward.badge === 'POPULAR' && <Star className="w-3 h-3" />}
                      {reward.badge}
                    </div>
                  </div>
                )}

                <div className="relative z-10 space-y-4">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${reward.gradient} flex items-center justify-center text-3xl`}>
                    {reward.icon}
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-bold text-white">
                      {reward.title}
                    </h3>
                    <p className="text-sm text-white/60 line-clamp-2">
                      {reward.description}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="pt-4 border-t border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">Coût</span>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#7C4DFF]" />
                        <span className="font-bold text-white">{reward.xpCost} XP</span>
                      </div>
                    </div>
                    
                    {reward.capitalRequired && (
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-sm">Requis</span>
                        <span className="font-semibold text-[#00E676]">
                          {reward.capitalRequired}€ épargnés
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={() => handleRedeem(reward)}
                    disabled={!affordable}
                    className={`w-full rounded-full font-semibold ${
                      affordable
                        ? `bg-gradient-to-r ${reward.gradient} hover:opacity-90 text-white`
                        : 'bg-white/5 text-white/40'
                    }`}
                  >
                    {affordable ? 'Échanger' : 'Verrouillé'}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
