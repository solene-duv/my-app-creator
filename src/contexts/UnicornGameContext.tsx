import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type GameStage = 'BOOTSTRAP' | 'MARKET' | 'SCALE' | 'UNICORN';

export interface Upgrade {
  id: string;
  name: string;
  cost: number;
  owned: number;
}

interface GameState {
  // Core Resources
  cash: number;
  linesOfCode: number;
  cloudCredits: number;
  
  // Market Variables
  price: number;
  publicDemand: number;
  marketingLevel: number;
  cloudCreditCost: number;
  
  // Automation
  autoCoderLevel: number;
  
  // Game State
  gameStage: GameStage;
  isBankrupt: boolean;
  isVictory: boolean;
  logs: string[];
  tickCount: number;
}

interface GameContextType extends GameState {
  writeCode: () => void;
  buyCloudCredits: () => void;
  increasePrice: () => void;
  decreasePrice: () => void;
  buyAutoCoder: () => void;
  buyMarketing: () => void;
  restartGame: () => void;
  addLog: (message: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const UnicornGameProvider = ({ children }: { children: ReactNode }) => {
  // EXACT STARTING STATE (Universal Paperclips clone)
  const [cash, setCash] = useState(0.00);
  const [linesOfCode, setLinesOfCode] = useState(0);
  const [cloudCredits, setCloudCredits] = useState(1000);
  const [price, setPrice] = useState(0.25);
  const [publicDemand, setPublicDemand] = useState(30);
  const [marketingLevel, setMarketingLevel] = useState(1);
  const [cloudCreditCost, setCloudCreditCost] = useState(20);
  const [autoCoderLevel, setAutoCoderLevel] = useState(0);
  
  // Game State
  const [gameStage, setGameStage] = useState<GameStage>('BOOTSTRAP');
  const [isBankrupt, setIsBankrupt] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [logs, setLogs] = useState<string[]>(['> System initialized. Start coding.']);
  const [tickCount, setTickCount] = useState(0);

  const addLog = (message: string) => {
    setLogs(prev => [...prev.slice(-9), `> ${message}`]);
  };

  // ACTION 1: Write Code (Make Paperclip)
  const writeCode = () => {
    if (cloudCredits < 1) return;
    
    setCloudCredits(prev => prev - 1);
    setLinesOfCode(prev => prev + 1);
    
    // Stage progression
    if (linesOfCode === 50 && gameStage === 'BOOTSTRAP') {
      setGameStage('MARKET');
      addLog('📊 Market unlocked!');
    }
    if (linesOfCode === 500 && gameStage === 'MARKET') {
      setGameStage('SCALE');
      addLog('🚀 Automation unlocked!');
    }
  };

  // ACTION 2: Buy Cloud Credits (Buy Wire)
  const buyCloudCredits = () => {
    const cost = cloudCreditCost * 1000;
    if (cash < cost) return;
    
    setCash(prev => prev - cost);
    setCloudCredits(prev => prev + 1000);
    addLog(`Purchased 1000 credits for $${cost.toFixed(0)}`);
  };

  // ACTION 3: Adjust Price
  const increasePrice = () => {
    setPrice(prev => Math.min(prev + 0.01, 10));
  };

  const decreasePrice = () => {
    setPrice(prev => Math.max(prev - 0.01, 0.01));
  };

  // Buy Auto-Coder (AutoClipper)
  const buyAutoCoder = () => {
    const cost = 60 * Math.pow(1.1, autoCoderLevel);
    if (cash < cost) return;
    
    setCash(prev => prev - cost);
    setAutoCoderLevel(prev => prev + 1);
    addLog(`Hired Auto-Coder #${autoCoderLevel + 1}`);
  };

  // Buy Marketing Upgrade
  const buyMarketing = () => {
    const cost = 100 * Math.pow(2, marketingLevel - 1);
    if (cash < cost) return;
    
    setCash(prev => prev - cost);
    setMarketingLevel(prev => prev + 1);
    addLog(`Marketing upgraded to Level ${marketingLevel + 1}`);
  };

  const restartGame = () => {
    setCash(0);
    setLinesOfCode(0);
    setCloudCredits(1000);
    setPrice(0.25);
    setPublicDemand(30);
    setMarketingLevel(1);
    setCloudCreditCost(20);
    setAutoCoderLevel(0);
    setGameStage('BOOTSTRAP');
    setIsBankrupt(false);
    setIsVictory(false);
    setLogs(['> System initialized. Start coding.']);
    setTickCount(0);
  };

  // THE GAME LOOP (100ms tick - 10 ticks per second)
  useEffect(() => {
    if (isBankrupt || isVictory) return;

    const interval = setInterval(() => {
      setTickCount(prev => prev + 1);
      
      // A. CALCULATE DEMAND (The Golden Formula)
      // demand = (0.8 / price) * (1.1 ^ (marketingLevel - 1))
      const calculatedDemand = (0.8 / price) * Math.pow(1.1, marketingLevel - 1);
      setPublicDemand(calculatedDemand);
      
      // B. SALES LOGIC (Probabilistic)
      if (linesOfCode > 0) {
        const transactionVolume = Math.floor(calculatedDemand / 10); // Divided by 10 because 100ms tick
        
        if (transactionVolume > 0 && linesOfCode >= transactionVolume) {
          setLinesOfCode(prev => Math.max(0, prev - transactionVolume));
          setCash(prev => prev + (price * transactionVolume));
        }
      }
      
      // C. AUTO-CODER PRODUCTION
      if (autoCoderLevel > 0 && cloudCredits > 0) {
        const autoProduction = autoCoderLevel / 10; // Divided by 10 for 100ms tick
        
        setCloudCredits(prev => {
          const consumed = Math.min(autoProduction, prev);
          return prev - consumed;
        });
        setLinesOfCode(prev => prev + autoProduction);
      }
      
      // D. COST FLUCTUATION (Every 25 ticks = 2.5 seconds)
      setTickCount(prevTick => {
        if (prevTick % 25 === 0) {
          const baseCost = 20;
          const fluctuation = Math.sin(Date.now() / 1000) * 5;
          const newCost = Math.max(15, Math.min(25, baseCost + fluctuation));
          setCloudCreditCost(newCost);
        }
        return prevTick;
      });
      
      // VICTORY CONDITION
      if (cash >= 1000000 && !isVictory) {
        setIsVictory(true);
        setGameStage('UNICORN');
        addLog('🦄 $1M REACHED!');
      }
      
      // BANKRUPTCY WARNING
      if (cloudCredits <= 0 && cash < 50 && autoCoderLevel === 0) {
        addLog('⚠️ Out of resources! Sell code or buy credits!');
      }
    }, 100); // 100ms = 10 ticks per second

    return () => clearInterval(interval);
  }, [linesOfCode, cloudCredits, price, marketingLevel, autoCoderLevel, cash, isBankrupt, isVictory]);

  return (
    <GameContext.Provider value={{
      cash,
      linesOfCode,
      cloudCredits,
      price,
      publicDemand,
      marketingLevel,
      cloudCreditCost,
      autoCoderLevel,
      gameStage,
      isBankrupt,
      isVictory,
      logs,
      tickCount,
      writeCode,
      buyCloudCredits,
      increasePrice,
      decreasePrice,
      buyAutoCoder,
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
