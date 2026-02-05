import { useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import ProgressBar from "@/components/ProgressBar";
import MemoryMatch from "@/components/puzzles/MemoryMatch";
import WordScramble from "@/components/puzzles/WordScramble";
import SecretMessage from "@/components/puzzles/SecretMessage";
import FinalReveal from "@/components/FinalReveal";

type GameState = "welcome" | "puzzle1" | "puzzle2" | "puzzle3" | "reveal";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("welcome");

  const getCurrentPuzzleNumber = () => {
    switch (gameState) {
      case "puzzle1": return 1;
      case "puzzle2": return 2;
      case "puzzle3": return 3;
      default: return 0;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Progress bar - only show during puzzles */}
      {gameState !== "welcome" && gameState !== "reveal" && (
        <ProgressBar currentPuzzle={getCurrentPuzzleNumber()} totalPuzzles={3} />
      )}

      {/* Game screens */}
      {gameState === "welcome" && (
        <WelcomeScreen onStart={() => setGameState("puzzle1")} />
      )}
      
      {gameState === "puzzle1" && (
        <MemoryMatch onComplete={() => setGameState("puzzle2")} />
      )}
      
      {gameState === "puzzle2" && (
        <WordScramble onComplete={() => setGameState("puzzle3")} />
      )}
      
      {gameState === "puzzle3" && (
        <SecretMessage onComplete={() => setGameState("reveal")} />
      )}
      
      {gameState === "reveal" && (
        <FinalReveal />
      )}
    </div>
  );
};

export default Index;
