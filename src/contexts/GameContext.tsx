import { createContext, useContext, useState, ReactNode } from 'react';

type UserArchetype = 'FOUNDER' | 'EARNER' | 'HEIR' | null;

interface GameState {
  userArchetype: UserArchetype;
  virtualCash: number;
  xpPoints: number;
  capitalSaved: number;
  level: number;
  streak: number;
}

interface GameContextType extends GameState {
  setUserArchetype: (archetype: UserArchetype) => void;
  addCapital: (amount: number) => void;
  addXP: (amount: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>({
    userArchetype: null,
    virtualCash: 0,
    xpPoints: 0,
    capitalSaved: 350,
    level: 1,
    streak: 3,
  });

  const setUserArchetype = (archetype: UserArchetype) => {
    setGameState(prev => ({ ...prev, userArchetype: archetype }));
  };

  const addCapital = (amount: number) => {
    setGameState(prev => ({ 
      ...prev, 
      capitalSaved: prev.capitalSaved + amount,
      xpPoints: prev.xpPoints + 50
    }));
  };

  const addXP = (amount: number) => {
    setGameState(prev => ({ ...prev, xpPoints: prev.xpPoints + amount }));
  };

  return (
    <GameContext.Provider value={{ ...gameState, setUserArchetype, addCapital, addXP }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
};
