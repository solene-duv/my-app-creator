import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type GameStage = 'BOOTSTRAP' | 'MARKET' | 'SCALE' | 'UNICORN';

export interface Upgrade {
  id: string;
  name: string;
  cost: number;
  owned: number;
  unlockAt?: number; // Lines of code needed to unlock
  autoCodeRate?: number; // Auto clicks per second
}

interface GameState {
  // Resources (Wire equivalent)
  cloudCredits: number;
  cloudCreditCost: number; // Volatile pricing
  
  // Product (Paperclips equivalent)
  linesOfCode: number;
  unsoldCode: number;
  
  // Market
  cash: number;
  price: number;
  marketingLevel: number;
  demand: number;
  
  // Automation
  autoCodeClicks: number;
  
  // Stage
  gameStage: GameStage;
  isBankrupt: boolean;
  isVictory: boolean;
  logs: string[];
  upgrades: Upgrade[];
}

interface GameContextType extends GameState {
  writeCode: () => void;
  buyCloudCredits: (amount: number) => void;
  increasePrice: () => void;
  decreasePrice: () => void;
  buyUpgrade: (upgradeId: string) => void;
  buyMarketing: () => void;
  restartGame: () => void;
  addLog: (message: string) => void;
}

const initialUpgrades: Upgrade[] = [
  {
    id: 'autocoder1',
    name: 'AutoCoder Mk1',
    cost: 100,
    owned: 0,
    unlockAt: 50,
    autoCodeRate: 1,
  },
  {
    id: 'autocoder2',
    name: 'AutoCoder Mk2',
    cost: 500,
    owned: 0,
    unlockAt: 200,
    autoCodeRate: 5,
  },
  {
    id: 'megacoder',
    name: 'MegaCoder',
    cost: 2500,
    owned: 0,
    unlockAt: 1000,
    autoCodeRate: 25,
  },
];

const GameContext = createContext<GameContextType | undefined>(undefined);

export const UnicornGameProvider = ({ children }: { children: ReactNode }) => {
  // Resources
  const [cloudCredits, setCloudCredits] = useState(1000);
  const [cloudCreditCost, setCloudCreditCost] = useState(20);
  
  // Product
  const [linesOfCode, setLinesOfCode] = useState(0);
  const [unsoldCode, setUnsoldCode] = useState(0);
  
  // Market
  const [cash, setCash] = useState(0);
  const [price, setPrice] = useState(0.25);
  const [marketingLevel, setMarketingLevel] = useState(1);
  const [demand, setDemand] = useState(0);
  
  // Automation
  const [autoCodeClicks, setAutoCodeClicks] = useState(0);
  
  // Game State
  const [gameStage, setGameStage] = useState<GameStage>('BOOTSTRAP');
  const [isBankrupt, setIsBankrupt] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [logs, setLogs] = useState<string[]>(['> System initialized. Start writing code.']);
  const [upgrades, setUpgrades] = useState<Upgrade[]>(initialUpgrades);

  const addLog = (message: string) => {
    setLogs(prev => [...prev.slice(-9), `> ${message}`]);
  };

  const writeCode = () => {
    if (cloudCredits <= 0) return;
    
    setCloudCredits(prev => prev - 1);
    setUnsoldCode(prev => prev + 1);
    setLinesOfCode(prev => prev + 1);
    
    // Stage progression
    if (linesOfCode === 50) {
      setGameStage('MARKET');
      addLog('📊 Market unlocked! Set your price.');
    }
    if (linesOfCode === 500) {
      setGameStage('SCALE');
      addLog('🚀 Scaling phase! Automate production.');
    }
  };

  const buyCloudCredits = (amount: number) => {
    const cost = amount * cloudCreditCost;
    if (cash < cost) return;
    
    setCash(prev => prev - cost);
    setCloudCredits(prev => prev + amount);
  };

  const increasePrice = () => {
    setPrice(prev => Math.min(prev + 0.01, 10));
  };

  const decreasePrice = () => {
    setPrice(prev => Math.max(prev - 0.01, 0.01));
  };

  const buyUpgrade = (upgradeId: string) => {
    const upgrade = upgrades.find(u => u.id === upgradeId);
    if (!upgrade || cash < upgrade.cost) return;
    if (upgrade.unlockAt && linesOfCode < upgrade.unlockAt) return;

    setCash(prev => prev - upgrade.cost);
    
    setUpgrades(prev => prev.map(u => {
      if (u.id === upgradeId) {
        const newOwned = u.owned + 1;
        return { 
          ...u, 
          owned: newOwned, 
          cost: Math.floor(u.cost * 1.2) 
        };
      }
      return u;
    }));

    if (upgrade.autoCodeRate) {
      setAutoCodeClicks(prev => prev + upgrade.autoCodeRate!);
      addLog(`Automation +${upgrade.autoCodeRate}/sec`);
    }
  };

  const buyMarketing = () => {
    const cost = 100 * Math.pow(2, marketingLevel - 1);
    if (cash < cost) return;
    
    setCash(prev => prev - cost);
    setMarketingLevel(prev => prev + 1);
    addLog('📣 Marketing level increased!');
  };

  const restartGame = () => {
    setCloudCredits(1000);
    setCloudCreditCost(20);
    setLinesOfCode(0);
    setUnsoldCode(0);
    setCash(0);
    setPrice(0.25);
    setMarketingLevel(1);
    setDemand(0);
    setAutoCodeClicks(0);
    setGameStage('BOOTSTRAP');
    setIsBankrupt(false);
    setIsVictory(false);
    setLogs(['> System initialized. Start writing code.']);
    setUpgrades(initialUpgrades);
  };

  // Game Loop (100ms tick - Universal Paperclips style)
  useEffect(() => {
    if (isBankrupt || isVictory) return;

    const interval = setInterval(() => {
      // PHASE 1: Automated Code Writing
      if (autoCodeClicks > 0 && cloudCredits > 0) {
        const ticksPerSecond = autoCodeClicks / 10; // Divide by 10 because 100ms tick
        const creditsUsed = Math.min(ticksPerSecond, cloudCredits);
        
        setCloudCredits(prev => prev - creditsUsed);
        setUnsoldCode(prev => prev + creditsUsed);
        setLinesOfCode(prev => prev + creditsUsed);
      }
      
      // PHASE 2: Calculate Demand (Universal Paperclips formula)
      // Demand = (MarketingLevel / Price)
      const calculatedDemand = marketingLevel / Math.max(price, 0.01);
      setDemand(calculatedDemand);
      
      // PHASE 3: Automatic Sales
      if (unsoldCode > 0 && calculatedDemand > 0) {
        const soldThisTick = Math.min(unsoldCode, calculatedDemand / 10);
        
        setUnsoldCode(prev => Math.max(0, prev - soldThisTick));
        setCash(prev => prev + (soldThisTick * price));
      }
      
      // PHASE 4: Cloud Credit Cost Volatility (fluctuates like Wire in original)
      if (Math.random() < 0.05) { // 5% chance per tick
        setCloudCreditCost(prev => {
          const change = (Math.random() - 0.5) * 4; // ±2
          return Math.max(15, Math.min(30, prev + change));
        });
      }
      
      // Victory condition
      if (cash >= 1000000 && !isVictory) {
        setIsVictory(true);
        setGameStage('UNICORN');
        addLog('🦄 $1M REACHED! You win!');
      }
    }, 100); // 100ms tick

    return () => clearInterval(interval);
  }, [autoCodeClicks, cloudCredits, unsoldCode, price, marketingLevel, demand, cash, isBankrupt, isVictory, linesOfCode]);

  return (
    <GameContext.Provider value={{
      cloudCredits,
      cloudCreditCost,
      linesOfCode,
      unsoldCode,
      cash,
      price,
      marketingLevel,
      demand,
      autoCodeClicks,
      gameStage,
      isBankrupt,
      isVictory,
      logs,
      upgrades,
      writeCode,
      buyCloudCredits,
      increasePrice,
      decreasePrice,
      buyUpgrade,
      buyMarketing,
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
