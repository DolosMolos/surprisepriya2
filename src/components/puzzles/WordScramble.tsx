import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Sparkles, Check, HelpCircle } from "lucide-react";
import confetti from "canvas-confetti";

interface WordScrambleProps {
  onComplete: () => void;
}

const WORDS = [
  { scrambled: "SKIESS", answer: "KISSES", hint: "Lots of 💋" },
  { scrambled: "TRAHE", answer: "HEART", hint: "Symbol of affection ❤️" },
  { scrambled: "EETWS", answer: "SWEET", hint: "Like candy 🍬" },
  { scrambled: "PRASKEL", answer: "SPARKLE", hint: "Like your eyes ✨" },
  { scrambled: "IMELS", answer: "SMILE", hint: "What you make me do 😊" },
];

const WordScramble = ({ onComplete }: WordScrambleProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [solved, setSolved] = useState<boolean[]>(new Array(WORDS.length).fill(false));
  const [showHint, setShowHint] = useState(false);
  const [shake, setShake] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentWord = WORDS[currentIndex] || WORDS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userInput.toUpperCase() === currentWord.answer) {
      // Correct!
      const newSolved = [...solved];
      newSolved[currentIndex] = true;
      setSolved(newSolved);
      
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });

      if (currentIndex < WORDS.length - 1) {
        setTimeout(() => {
          setCurrentIndex(prev => prev + 1);
          setUserInput("");
          setShowHint(false);
        }, 1000);
      } else {
        setIsComplete(true);
      }
    } else {
      // Wrong - shake animation
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleSkip = () => {
    if (currentIndex < WORDS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserInput("");
      setShowHint(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-20">
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
          Love Word Scramble 💕
        </h2>
        <p className="text-muted-foreground">
          Unscramble the romantic words!
        </p>
        <div className="flex justify-center gap-2 mt-4">
          {WORDS.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all ${
                solved[i]
                  ? "bg-green-500"
                  : i === currentIndex
                  ? "bg-primary animate-pulse"
                  : "bg-muted"
              }`}
            />
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {!isComplete ? (
          <motion.div
            key={currentIndex}
            className="w-full max-w-sm"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            {/* Scrambled word display */}
            <motion.div
              className={`bg-card rounded-2xl p-6 shadow-lg border-2 border-border mb-6 ${shake ? 'animate-shake' : ''}`}
              style={{ 
                animation: shake ? 'shake 0.5s ease-in-out' : 'none'
              }}
            >
              <div className="flex justify-center gap-2 mb-4">
                {currentWord.scrambled.split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center text-xl md:text-2xl font-bold text-primary"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>

              {/* Hint section */}
              <AnimatePresence>
                {showHint && (
                  <motion.p
                    className="text-center text-muted-foreground text-sm mb-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    Hint: {currentWord.hint}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Input form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value.toUpperCase())}
                  placeholder="Type your answer..."
                  className="text-center text-lg font-medium uppercase"
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowHint(true)}
                    disabled={showHint}
                    className="flex-1"
                  >
                    <HelpCircle className="w-4 h-4 mr-1" />
                    Hint
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1"
                    disabled={!userInput}
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Check
                  </Button>
                </div>
              </form>
            </motion.div>

            {/* Already solved indicator */}
            {solved[currentIndex] && (
              <motion.div
                className="text-center text-green-600 font-medium"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                ✓ Correct! The word is {currentWord.answer}!
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-card rounded-2xl p-8 shadow-lg border-2 border-border mb-6 max-w-sm">
              <Heart className="w-16 h-16 mx-auto text-primary fill-primary mb-4 animate-pulse-heart" />
              <p className="text-xl font-bold text-primary mb-2">
                You're so smart, Priya! 🌟
              </p>
              <p className="text-muted-foreground mb-4">
                Just like these words, my feelings for you are unscrambled — clear and true! 💕
              </p>
            </div>
            <Button 
              onClick={onComplete}
              size="lg"
              className="rounded-full px-8"
            >
              One More Puzzle!
              <Sparkles className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
      `}</style>
    </div>
  );
};

export default WordScramble;
