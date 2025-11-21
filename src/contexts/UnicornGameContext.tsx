import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';

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
  
  // Refs to track current values for game loop
  const clipsRef = useRef(0);
  const wireRef = useRef(1000);
  const marginRef = useRef(0.25);
  const demandRef = useRef(100);
  const clipmakerRateRef = useRef(0);
  const wireBasePriceRef = useRef(17.50);
  
  // Update refs when state changes
  useEffect(() => { clipsRef.current = clips; }, [clips]);
  useEffect(() => { wireRef.current = wire; }, [wire]);
  useEffect(() => { marginRef.current = margin; }, [margin]);
  useEffect(() => { demandRef.current = demand; }, [demand]);
  useEffect(() => { clipmakerRateRef.current = clipmakerRate; }, [clipmakerRate]);
  useEffect(() => { wireBasePriceRef.current = wireBasePrice; }, [wireBasePrice]);

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
    const currentLevel = clipperLevel;
    
    setFunds(prev => prev - clipperCost);
    setClipperLevel(prev => prev + 1);
    setClipmakerRate(prev => prev + 1);
    
    // Universal Paperclips formula: cost = pow(1.1, level) + 5
    const newCost = Math.pow(1.1, currentLevel + 1) + 5;
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
      const currentClips = clipsRef.current;
      const currentWire = wireRef.current;
      const currentMargin = marginRef.current;
      const currentDemand = demandRef.current;
      const currentClipmakerRate = clipmakerRateRef.current;
      const currentWireBasePrice = wireBasePriceRef.current;
      
      const price = currentMargin + 0.01;
      
      // A. Production Rate = clipmakerRate (clips/second)
      // Per tick production
      let clipsProduced = 0;
      let wireUsed = 0;
      
      if (currentClipmakerRate > 0 && currentWire >= currentClipmakerRate / TICKS_PER_SECOND) {
        clipsProduced = currentClipmakerRate / TICKS_PER_SECOND;
        wireUsed = currentClipmakerRate / TICKS_PER_SECOND;
      }
      
      // B. Calculate total clips after production
      const totalClips = currentClips + clipsProduced;
      
      // C. Sales Rate = min(clips, demand) per second
      // CORRECTED: For this tick, demand per tick is demand/TICKS_PER_SECOND
      // Sales this tick = min(all available clips, demand per tick)
      const demandPerTick = currentDemand / TICKS_PER_SECOND;
      const clipsSoldThisTick = Math.min(totalClips, demandPerTick);
      const revenue = clipsSoldThisTick * price;
      
      // D. Unsold Inventory Update
      // Formula: New clips = clips + clipmakerRate - min(clips, demand)
      const newClips = totalClips - clipsSoldThisTick;
      
      // Apply all updates separately (no nesting)
      if (wireUsed > 0) {
        setWire(currentWire - wireUsed);
      }
      
      setClips(newClips);
      
      if (revenue > 0) {
        setFunds(prevFunds => prevFunds + revenue);
      }
      
      // E. Dynamic Wire Price - decay
      if (currentWireBasePrice > 15) {
        setWireBasePrice(currentWireBasePrice - (currentWireBasePrice / 1000) / TICKS_PER_SECOND);
      }
      
      // F. Dynamic Wire Price - fluctuation (random check)
      if (Math.random() < 0.015) {
        setWirePriceCounter(prev => {
          const newCounter = prev + 1;
          const wireAdjust = 6 * Math.sin(newCounter);
          const newCost = Math.ceil(currentWireBasePrice + wireAdjust);
          setWireCost(newCost);
          return newCounter;
        });
      }
    }, 50);

    return () => clearInterval(interval);
  }, []); // Empty deps - using refs instead

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
