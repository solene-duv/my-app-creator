import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type GameStage = 'BOOTSTRAP' | 'SEED' | 'SERIES_A' | 'UNICORN';

export interface Upgrade {
  id: string;
  name: string;
  cost: number;
  owned: number;
  codePerSec?: number;
  revenuePerSec?: number;
  burnPerSec?: number;
  hypeBoost?: number;
  burnReduction?: number;
}

interface GameState {
  cash: number;
  revenue: number;
  equity: number;
  valuation: number;
  hype: number;
  burnRate: number;
  linesOfCode: number;
  gameStage: GameStage;
  isBankrupt: boolean;
  isVictory: boolean;
  logs: string[];
  upgrades: Upgrade[];
  mvpLaunched: boolean;
  seedRaised: boolean;
  seriesARaised: boolean;
  seriesBRaised: boolean;
  holdingSetup: boolean;
}

interface GameContextType extends GameState {
  writeCode: () => void;
  buyUpgrade: (upgradeId: string) => void;
  launchMVP: () => void;
  raiseSeed: () => void;
  raiseSeriesA: () => void;
  raiseSeriesB: () => void;
  setupHolding: () => void;
  restartGame: () => void;
  addLog: (message: string) => void;
}

const initialUpgrades: Upgrade[] = [
  {
    id: 'intern',
    name: 'Hire Intern',
    cost: 500,
    owned: 0,
    codePerSec: 1,
    burnPerSec: 50,
  },
  {
    id: 'dev',
    name: 'Hire 10x Dev',
    cost: 2500,
    owned: 0,
    codePerSec: 10,
    burnPerSec: 500,
  },
  {
    id: 'growth',
    name: 'Growth Hacker',
    cost: 10000,
    owned: 0,
    hypeBoost: 0.1,
    burnPerSec: 800,
  },
  {
    id: 'bnp',
    name: 'BNP Pro Account',
    cost: 200,
    owned: 0,
    burnReduction: 0.1,
  },
];

const GameContext = createContext<GameContextType | undefined>(undefined);

export const UnicornGameProvider = ({ children }: { children: ReactNode }) => {
  const [cash, setCash] = useState(2000);
  const [revenue, setRevenue] = useState(0);
  const [equity, setEquity] = useState(100);
  const [valuation, setValuation] = useState(0);
  const [hype, setHype] = useState(1.0);
  const [burnRate, setBurnRate] = useState(50);
  const [linesOfCode, setLinesOfCode] = useState(0);
  const [gameStage, setGameStage] = useState<GameStage>('BOOTSTRAP');
  const [isBankrupt, setIsBankrupt] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [logs, setLogs] = useState<string[]>(['> Dorm room setup complete. Start coding.']);
  const [upgrades, setUpgrades] = useState<Upgrade[]>(initialUpgrades);
  const [mvpLaunched, setMvpLaunched] = useState(false);
  const [seedRaised, setSeedRaised] = useState(false);
  const [seriesARaised, setSeriesARaised] = useState(false);
  const [seriesBRaised, setSeriesBRaised] = useState(false);
  const [holdingSetup, setHoldingSetup] = useState(false);

  const addLog = (message: string) => {
    setLogs(prev => [...prev.slice(-19), `> ${message}`]);
  };

  const writeCode = () => {
    setLinesOfCode(prev => prev + 10);
    setCash(prev => prev + 20);
  };

  const buyUpgrade = (upgradeId: string) => {
    const upgrade = upgrades.find(u => u.id === upgradeId);
    if (!upgrade || cash < upgrade.cost) return;

    setCash(prev => prev - upgrade.cost);
    
    setUpgrades(prev => prev.map(u => {
      if (u.id === upgradeId) {
        return { ...u, owned: u.owned + 1, cost: Math.floor(u.cost * 1.15) };
      }
      return u;
    }));

    if (upgrade.hypeBoost) {
      setHype(prev => prev + upgrade.hypeBoost!);
    }

    if (upgrade.burnReduction) {
      setBurnRate(prev => prev * (1 - upgrade.burnReduction!));
    }

    if (upgrade.owned === 0) {
      addLog(`Hired: ${upgrade.name}`);
      if (upgrade.burnPerSec) {
        addLog('⚠️ Burn rate increasing. Watch your runway!');
      }
    }
  };

  const launchMVP = () => {
    if (linesOfCode < 1000 || cash < 5000 || mvpLaunched) return;
    
    setCash(prev => prev - 5000);
    setMvpLaunched(true);
    addLog('🚀 MVP LAUNCHED! Revenue generation enabled.');
  };

  const raiseSeed = () => {
    if (valuation < 1000000 || seedRaised) return;
    
    setCash(prev => prev + 500000);
    setEquity(prev => prev - 15);
    setSeedRaised(true);
    setGameStage('SEED');
    addLog('💰 SEED ROUND CLOSED: €500K wired. -15% equity.');
    addLog('You survive, but you have bosses now.');
  };

  const raiseSeriesA = () => {
    if (valuation < 10000000 || seriesARaised) return;
    
    setCash(prev => prev + 2000000);
    setEquity(prev => prev - 20);
    setHype(prev => prev * 2);
    setSeriesARaised(true);
    setGameStage('SERIES_A');
    addLog('💎 SERIES A CLOSED: €2M wired. -20% equity.');
    addLog('Hype multiplier activated x2!');
  };

  const raiseSeriesB = () => {
    if (valuation < 100000000 || seriesBRaised) return;
    
    setCash(prev => prev + 20000000);
    setEquity(prev => prev - 10);
    setSeriesBRaised(true);
    addLog('🏦 SERIES B CLOSED: €20M wired. -10% equity.');
    addLog('War chest fully loaded.');
  };

  const setupHolding = () => {
    if (!seriesARaised || holdingSetup) return;
    
    setHoldingSetup(true);
    addLog('🏛️ OBO HOLDING SETUP: Personal wealth secured.');
    addLog('BNP Private Banking activated.');
  };

  const restartGame = () => {
    setCash(2000);
    setRevenue(0);
    setEquity(100);
    setValuation(0);
    setHype(1.0);
    setBurnRate(50);
    setLinesOfCode(0);
    setGameStage('BOOTSTRAP');
    setIsBankrupt(false);
    setIsVictory(false);
    setLogs(['> Dorm room setup complete. Start coding.']);
    setUpgrades(initialUpgrades);
    setMvpLaunched(false);
    setSeedRaised(false);
    setSeriesARaised(false);
    setSeriesBRaised(false);
    setHoldingSetup(false);
  };

  // Game Loop
  useEffect(() => {
    if (isBankrupt || isVictory) return;

    const interval = setInterval(() => {
      // Calculate automated code generation
      let codePerTick = 0;
      upgrades.forEach(upgrade => {
        if (upgrade.codePerSec && upgrade.owned > 0) {
          codePerTick += upgrade.codePerSec * upgrade.owned;
        }
      });
      
      setLinesOfCode(prev => prev + codePerTick);

      // Calculate revenue (only if MVP launched)
      if (mvpLaunched) {
        setRevenue(codePerTick * 10);
      }

      // Calculate burn rate
      let totalBurn = 50; // Base living expenses
      upgrades.forEach(upgrade => {
        if (upgrade.burnPerSec && upgrade.owned > 0) {
          totalBurn += upgrade.burnPerSec * upgrade.owned;
        }
      });
      setBurnRate(totalBurn);

      // Update cash
      setCash(prev => {
        const newCash = prev + revenue - totalBurn;
        
        if (newCash <= 0 && !isBankrupt) {
          setIsBankrupt(true);
          addLog('💀 INSOLVENCY. GAME OVER.');
        }
        
        if (newCash < 200 && newCash > 0) {
          addLog('⚠️ WARNING: INSOLVENCY IMMINENT!');
        }
        
        return newCash;
      });

      // Update valuation
      setValuation(prev => {
        const newVal = revenue > 0 
          ? revenue * 12 * hype 
          : linesOfCode * 10 * hype;
        
        if (newVal >= 1000000000 && !isVictory) {
          setIsVictory(true);
          setGameStage('UNICORN');
          addLog('🦄 UNICORN STATUS ACHIEVED!');
        }
        
        return newVal;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [revenue, burnRate, hype, linesOfCode, upgrades, mvpLaunched, isBankrupt, isVictory]);

  return (
    <GameContext.Provider value={{
      cash,
      revenue,
      equity,
      valuation,
      hype,
      burnRate,
      linesOfCode,
      gameStage,
      isBankrupt,
      isVictory,
      logs,
      upgrades,
      mvpLaunched,
      seedRaised,
      seriesARaised,
      seriesBRaised,
      holdingSetup,
      writeCode,
      buyUpgrade,
      launchMVP,
      raiseSeed,
      raiseSeriesA,
      raiseSeriesB,
      setupHolding,
      restartGame,
      addLog,
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useUnicornGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useUnicornGame must be used within UnicornGameProvider');
  }
  return context;
};
