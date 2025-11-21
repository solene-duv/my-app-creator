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
  
  // Exit & Wealth
  valuation: number;
  equity: number;
  hasExited: boolean;
  exitPayout: number;
  
  // Milestones
  shownMilestones: number[];
  currentMilestone: number | null;
  isGamePaused: boolean;
  
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
  triggerExit: () => void;
  canExit: () => boolean;
  closeMilestone: () => void;
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
  
  // Exit & Wealth
  const [valuation, setValuation] = useState(0);
  const [equity, setEquity] = useState(100);
  const [hasExited, setHasExited] = useState(false);
  const [exitPayout, setExitPayout] = useState(0);
  
  // Milestones
  const [shownMilestones, setShownMilestones] = useState<number[]>([]);
  const [currentMilestone, setCurrentMilestone] = useState<number | null>(null);
  const [isGamePaused, setIsGamePaused] = useState(false);
  
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
    if (wire < 1 || isGamePaused) {
      if (wire < 1) addLog('Out of wire!');
      return;
    }
    setWire(prev => prev - 1);
    setClips(prev => prev + 1);
  };

  // Buy wire (1000 units) - buyWire()
  const buyWire = () => {
    if (funds < wireCost || isGamePaused) return;
    setFunds(prev => prev - wireCost);
    setWire(prev => prev + 1000);
    setWireBasePrice(prev => prev + 0.05);
  };

  // Lower price - lowerPrice()
  const lowerPrice = () => {
    if (isGamePaused) return;
    setMargin(prev => Math.max(0.01, prev - 0.01));
    setDemand(prev => prev + 1);
  };

  // Raise price - raisePrice()
  const raisePrice = () => {
    if (isGamePaused) return;
    setMargin(prev => prev + 0.01);
    setDemand(prev => Math.max(1, prev - 1));
  };

  // Buy marketing - buyAds()
  const buyMarketing = () => {
    if (funds < getMarketingCost() || isGamePaused) return;
    const cost = getMarketingCost();
    setFunds(prev => prev - cost);
    setDemand(prev => prev + (prev * 0.25));
    setMarketingLevel(prev => prev + 1);
    addLog(`Marketing Level ${marketingLevel + 1}`);
  };

  // Buy AutoClipper - makeClipper()
  const buyAutoClipper = () => {
    if (funds < clipperCost || isGamePaused) return;
    const currentLevel = clipperLevel;
    
    setFunds(prev => prev - clipperCost);
    setClipperLevel(prev => prev + 1);
    setClipmakerRate(prev => prev + 1);
    
    // Universal Paperclips formula: cost = pow(1.1, level) + 5
    const newCost = Math.pow(1.1, currentLevel + 1) + 5;
    setClipperCost(newCost);
    
    addLog(`AutoClipper #${currentLevel + 1} online`);
  };

  const closeMilestone = () => {
    setCurrentMilestone(null);
    setIsGamePaused(false);
  };

  const canExit = () => {
    // Exit available at any time
    return !hasExited;
  };

  const triggerExit = () => {
    if (!canExit()) return;
    
    // Calculate valuation based on revenue (funds) with multiplier
    const calculatedValuation = funds * 10; // 10x revenue multiple
    setValuation(calculatedValuation);
    
    // Calculate payout based on valuation and equity
    const payout = calculatedValuation * (equity / 100);
    setExitPayout(payout);
    setHasExited(true);
    
    addLog(`EXIT: Valuation €${calculatedValuation.toFixed(1)}K`);
    addLog(`Payout: €${payout.toFixed(1)}K`);
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
    setValuation(0);
    setEquity(100);
    setHasExited(false);
    setExitPayout(0);
    setShownMilestones([]);
    setCurrentMilestone(null);
    setIsGamePaused(false);
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

  // Check for milestones when funds change
  useEffect(() => {
    if (isGamePaused || hasExited) return;
    
    const milestones = [5, 10, 20, 40, 60, 80, 100];
    
    // Find the next unshown milestone that we've crossed
    for (const milestone of milestones) {
      if (funds >= milestone && !shownMilestones.includes(milestone)) {
        setCurrentMilestone(milestone);
        setIsGamePaused(true);
        setShownMilestones(prev => [...prev, milestone]);
        addLog(`🎯 Milestone: €${milestone}K revenue!`);
        break; // Only show one milestone at a time
      }
    }
  }, [funds, shownMilestones, isGamePaused, hasExited]);

  // Update valuation based on funds (real-time)
  useEffect(() => {
    if (!hasExited && funds > 0) {
      setValuation(funds * 10);
    }
  }, [funds, hasExited]);

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
      valuation,
      equity,
      hasExited,
      exitPayout,
      shownMilestones,
      currentMilestone,
      isGamePaused,
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
      triggerExit,
      canExit,
      closeMilestone,
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
