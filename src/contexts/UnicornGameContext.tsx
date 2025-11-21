import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface GameState {
  // Business Section
  funds: number;
  unsoldInventory: number;
  price: number;
  publicDemand: number;
  marketingLevel: number;
  
  // Manufacturing
  clipsPerSecond: number;
  wire: number;
  wireCost: number;
  autoClippers: number;
  
  // Game State
  logs: string[];
}

interface GameContextType extends GameState {
  makeClip: () => void;
  buyWire: () => void;
  lowerPrice: () => void;
  raisePrice: () => void;
  buyMarketing: () => void;
  buyAutoClipper: () => void;
  restartGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const UnicornGameProvider = ({ children }: { children: ReactNode }) => {
  // Business
  const [funds, setFunds] = useState(0);
  const [unsoldInventory, setUnsoldInventory] = useState(0);
  const [price, setPrice] = useState(0.25);
  const [publicDemand, setPublicDemand] = useState(32);
  const [marketingLevel, setMarketingLevel] = useState(1);
  
  // Manufacturing
  const [clipsPerSecond, setClipsPerSecond] = useState(0);
  const [wire, setWire] = useState(1000);
  const [wireCost, setWireCost] = useState(20);
  const [autoClippers, setAutoClippers] = useState(0);
  
  const [logs, setLogs] = useState<string[]>(['> System initialized.']);

  const addLog = (message: string) => {
    setLogs(prev => [...prev.slice(-9), `> ${message}`]);
  };

  // Make a single clip
  const makeClip = () => {
    if (wire < 1) {
      addLog('Out of wire!');
      return;
    }
    setWire(prev => prev - 1);
    setUnsoldInventory(prev => prev + 1);
  };

  // Buy wire (1000 inches)
  const buyWire = () => {
    if (funds < wireCost) return;
    setFunds(prev => prev - wireCost);
    setWire(prev => prev + 1000);
  };

  // Price controls
  const lowerPrice = () => {
    setPrice(prev => Math.max(0.01, prev - 0.01));
  };

  const raisePrice = () => {
    setPrice(prev => prev + 0.01);
  };

  // Buy marketing
  const buyMarketing = () => {
    const cost = 100 * Math.pow(2, marketingLevel - 1);
    if (funds < cost) return;
    setFunds(prev => prev - cost);
    setMarketingLevel(prev => prev + 1);
    addLog(`Marketing Level ${marketingLevel + 1}`);
  };

  // Buy AutoClipper
  const buyAutoClipper = () => {
    const cost = 5 + Math.pow(1.1, autoClippers);
    if (funds < cost) return;
    setFunds(prev => prev - cost);
    setAutoClippers(prev => prev + 1);
    addLog(`AutoClipper #${autoClippers + 1} online`);
  };

  const restartGame = () => {
    setFunds(0);
    setUnsoldInventory(0);
    setPrice(0.25);
    setPublicDemand(32);
    setMarketingLevel(1);
    setClipsPerSecond(0);
    setWire(1000);
    setWireCost(20);
    setAutoClippers(0);
    setLogs(['> System initialized.']);
  };

  // Main game loop - 100ms tick
  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate Public Demand using Universal Paperclips formula
      // PD = (1.1^(marketingLevel - 1)) * (0.8 / price)
      const PD = Math.pow(1.1, marketingLevel - 1) * (0.8 / price);
      setPublicDemand(Math.floor(PD * 10) / 10);
      
      // Calculate clips sold per second using the exact formula:
      // clipsPerSecond = min(1, PD/100) * 7 * PD^1.15
      const clipsPerSecond = Math.min(1, PD / 100) * 7 * Math.pow(PD, 1.15);
      
      // Convert to per 100ms (divide by 10)
      const clipsPerTick = clipsPerSecond / 10;
      
      // Attempt to sell inventory
      if (unsoldInventory > 0) {
        const clipsSold = Math.min(unsoldInventory, clipsPerTick);
        setUnsoldInventory(prev => prev - clipsSold);
        setFunds(prev => prev + (clipsSold * price));
      }
      
      // AutoClippers production
      if (autoClippers > 0 && wire >= autoClippers / 10) {
        const production = autoClippers / 10; // Per 100ms
        setWire(prev => prev - production);
        setUnsoldInventory(prev => prev + production);
      }
      
      // Update clips per second
      setClipsPerSecond(autoClippers);
      
      // Wire cost fluctuation (every ~2 seconds)
      if (Math.random() < 0.005) {
        setWireCost(prev => {
          const change = (Math.random() - 0.5) * 8;
          return Math.max(15, Math.min(30, prev + change));
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [unsoldInventory, price, marketingLevel, autoClippers, wire]);

  return (
    <GameContext.Provider value={{
      funds,
      unsoldInventory,
      price,
      publicDemand,
      marketingLevel,
      clipsPerSecond,
      wire,
      wireCost,
      autoClippers,
      logs,
      makeClip,
      buyWire,
      lowerPrice,
      raisePrice,
      buyMarketing,
      buyAutoClipper,
      restartGame,
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
