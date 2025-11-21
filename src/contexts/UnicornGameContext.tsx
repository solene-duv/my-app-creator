import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface GameState {
  // Business Section
  clips: number;
  funds: number;
  margin: number;
  demand: number;
  marketingLevel: number;
  
  // Manufacturing
  clipmakerRate: number;
  wire: number;
  wireCost: number;
  wireBasePrice: number;
  clipperLevel: number;
  clipperCost: number;
  
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
  getPrice: () => number;
  getMarketingCost: () => number;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const UnicornGameProvider = ({ children }: { children: ReactNode }) => {
  // Business
  const [clips, setClips] = useState(0);
  const [funds, setFunds] = useState(0);
  const [margin, setMargin] = useState(0.25);
  const [demand, setDemand] = useState(100);
  const [marketingLevel, setMarketingLevel] = useState(1);
  
  // Manufacturing
  const [clipmakerRate, setClipmakerRate] = useState(0);
  const [wire, setWire] = useState(1000);
  const [wireCost, setWireCost] = useState(17.50);
  const [wireBasePrice, setWireBasePrice] = useState(17.50);
  const [wirePriceCounter, setWirePriceCounter] = useState(0);
  const [clipperLevel, setClipperLevel] = useState(0);
  const [clipperCost, setClipperCost] = useState(5);
  
  const [logs, setLogs] = useState<string[]>(['> System initialized.']);

  const addLog = (message: string) => {
    setLogs(prev => [...prev.slice(-9), `> ${message}`]);
  };

  const getPrice = () => margin + 0.01;
  const getMarketingCost = () => 100 * Math.pow(2, marketingLevel - 1);

  // Make a single clip - clipClick(1)
  const makeClip = () => {
    if (wire < 1) {
      addLog('Out of wire!');
      return;
    }
    setWire(prev => prev - 1);
    setClips(prev => prev + 1);
  };

  // Buy wire (1000 units) - buyWire()
  const buyWire = () => {
    if (funds < wireCost) return;
    setFunds(prev => prev - wireCost);
    setWire(prev => prev + 1000);
    setWireBasePrice(prev => prev + 0.05);
  };

  // Lower price - lowerPrice()
  const lowerPrice = () => {
    setMargin(prev => Math.max(0.01, prev - 0.01));
    setDemand(prev => prev + 1);
  };

  // Raise price - raisePrice()
  const raisePrice = () => {
    setMargin(prev => prev + 0.01);
    setDemand(prev => Math.max(1, prev - 1));
  };

  // Buy marketing - buyAds()
  const buyMarketing = () => {
    const cost = getMarketingCost();
    if (funds < cost) return;
    setFunds(prev => prev - cost);
    setDemand(prev => prev + (prev * 0.25));
    setMarketingLevel(prev => prev + 1);
    addLog(`Marketing Level ${marketingLevel + 1}`);
  };

  // Buy AutoClipper - makeClipper()
  const buyAutoClipper = () => {
    if (funds < clipperCost) return;
    const currentCost = clipperCost;
    const currentLevel = clipperLevel;
    
    setFunds(prev => prev - currentCost);
    setClipperLevel(prev => prev + 1);
    setClipmakerRate(prev => prev + 1);
    
    // Calculate new cost: floor(currentCost * 1.15), minimum increase of 1
    const newCost = Math.max(
      Math.floor(currentCost * 1.15),
      currentCost + 1
    );
    setClipperCost(newCost);
    
    addLog(`AutoClipper #${currentLevel + 1} online`);
  };

  const restartGame = () => {
    setClips(0);
    setFunds(0);
    setMargin(0.25);
    setDemand(100);
    setMarketingLevel(1);
    setClipmakerRate(0);
    setWire(1000);
    setWireCost(17.50);
    setWireBasePrice(17.50);
    setWirePriceCounter(0);
    setClipperLevel(0);
    setClipperCost(5);
    setLogs(['> System initialized.']);
  };

  // Main game loop - 50ms tick (20 ticks per second)
  useEffect(() => {
    const TICKS_PER_SECOND = 20;
    const interval = setInterval(() => {
      const price = margin + 0.01;
      const demandPerTick = demand / TICKS_PER_SECOND;
      const productionPerTick = clipmakerRate / TICKS_PER_SECOND;
      
      // A. Production - AutoClippers produce clips
      if (productionPerTick > 0) {
        setWire(prevWire => {
          if (prevWire >= productionPerTick) {
            // Add to clips inventory
            setClips(prevClips => prevClips + productionPerTick);
            return prevWire - productionPerTick;
          }
          return prevWire;
        });
      }
      
      // B. Sales and Revenue (separate update)
      setClips(prevClips => {
        if (prevClips > 0) {
          // Calculate how many clips can be sold this tick
          const clipsSoldThisTick = Math.min(prevClips, demandPerTick);
          
          if (clipsSoldThisTick > 0) {
            const revenue = clipsSoldThisTick * price;
            setFunds(prevFunds => prevFunds + revenue);
            return prevClips - clipsSoldThisTick;
          }
        }
        return prevClips;
      });
      
      // C. Dynamic Wire Price - decay
      setWireBasePrice(prev => {
        if (prev > 15) {
          return prev - (prev / 1000) / TICKS_PER_SECOND;
        }
        return prev;
      });
      
      // C. Dynamic Wire Price - fluctuation (random check)
      if (Math.random() < 0.015) {
        setWirePriceCounter(prev => {
          const newCounter = prev + 1;
          const newCost = Math.ceil(wireBasePrice + 6 * Math.sin(newCounter));
          setWireCost(newCost);
          return newCounter;
        });
      }
    }, 50);

    return () => clearInterval(interval);
  }, [margin, demand, clipmakerRate, wireBasePrice]);

  return (
    <GameContext.Provider value={{
      clips,
      funds,
      margin,
      demand,
      marketingLevel,
      clipmakerRate,
      wire,
      wireCost,
      wireBasePrice,
      clipperLevel,
      clipperCost,
      logs,
      makeClip,
      buyWire,
      lowerPrice,
      raisePrice,
      buyMarketing,
      buyAutoClipper,
      restartGame,
      getPrice,
      getMarketingCost,
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
