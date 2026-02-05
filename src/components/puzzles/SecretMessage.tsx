import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Sparkles, Lock, Unlock } from "lucide-react";
import confetti from "canvas-confetti";

interface SecretMessageProps {
  onComplete: () => void;
}

// The secret message with blanks
const MESSAGE_PARTS = [
  { text: "You make my ", blank: null },
  { text: null, blank: { answer: "HEART", display: "H _ _ _ T" } },
  { text: " skip a beat. Your ", blank: null },
  { text: null, blank: { answer: "SMILE", display: "S _ _ _ E" } },
  { text: " lights up my world. I ", blank: null },
  { text: null, blank: { answer: "LOVE", display: "L _ _ E" } },
  { text: " everything about you! 💕", blank: null },
];

const SecretMessage = ({ onComplete }: SecretMessageProps) => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [currentBlank, setCurrentBlank] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showError, setShowError] = useState(false);
  const [unlockedBlanks, setUnlockedBlanks] = useState<number[]>([]);

  const blanks = MESSAGE_PARTS.filter(p => p.blank !== null).map((p, i) => ({ ...p.blank!, index: i }));
  const currentBlankData = blanks[currentBlank];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userAnswer = answers[currentBlank]?.toUpperCase() || "";
    
    if (userAnswer === currentBlankData.answer) {
      // Correct!
      setUnlockedBlanks(prev => [...prev, currentBlank]);
      
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.6 }
      });

      if (currentBlank < blanks.length - 1) {
        setTimeout(() => {
          setCurrentBlank(prev => prev + 1);
          setShowError(false);
        }, 800);
      } else {
        // All blanks filled!
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
          setIsComplete(true);
        }, 500);
      }
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 1500);
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
          Secret Love Message 💌
        </h2>
        <p className="text-muted-foreground">
          Fill in the missing words to reveal the message!
        </p>
      </motion.div>

      {/* Message display */}
      <motion.div
        className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border-2 border-border mb-6 max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="text-lg md:text-xl leading-relaxed text-center">
          {MESSAGE_PARTS.map((part, i) => {
            if (part.text) {
              return <span key={i}>{part.text}</span>;
            }
            if (part.blank) {
              const blankIndex = blanks.findIndex(b => b.answer === part.blank?.answer);
              const isUnlocked = unlockedBlanks.includes(blankIndex);
              const isCurrent = blankIndex === currentBlank && !isComplete;
              
              return (
                <motion.span
                  key={i}
                  className={`inline-block px-2 py-1 mx-1 rounded-lg font-bold ${
                    isUnlocked
                      ? "bg-secondary text-accent"
                      : isCurrent
                      ? "bg-primary/20 text-primary animate-pulse"
                      : "bg-muted text-muted-foreground"
                  }`}
                  animate={isCurrent ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  {isUnlocked ? part.blank.answer : part.blank.display}
                </motion.span>
              );
            }
            return null;
          })}
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-3 mt-6">
          {blanks.map((_, i) => (
            <div key={i} className="flex items-center gap-1">
              {unlockedBlanks.includes(i) ? (
                <Unlock className="w-5 h-5 text-accent" />
              ) : i === currentBlank ? (
                <Lock className="w-5 h-5 text-primary animate-bounce" />
              ) : (
                <Lock className="w-5 h-5 text-muted-foreground/50" />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {!isComplete ? (
          <motion.div
            key={currentBlank}
            className="w-full max-w-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="bg-card/50 rounded-xl p-4 border border-border mb-4">
              <p className="text-sm text-muted-foreground text-center mb-3">
                What word goes in: <span className="font-bold text-primary">{currentBlankData.display}</span>?
              </p>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={answers[currentBlank] || ""}
                  onChange={(e) => setAnswers(prev => ({ ...prev, [currentBlank]: e.target.value.toUpperCase() }))}
                  placeholder="Your answer..."
                  className={`text-center uppercase font-medium ${showError ? "border-destructive animate-pulse" : ""}`}
                  autoFocus
                />
                <Button type="submit" disabled={!answers[currentBlank]}>
                  <Heart className="w-4 h-4" />
                </Button>
              </form>
              {showError && (
                <motion.p
                  className="text-destructive text-sm text-center mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Not quite! Try again 💕
                </motion.p>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="bg-card rounded-2xl p-8 shadow-lg border-2 border-primary/30 mb-6 max-w-sm">
              <Heart className="w-16 h-16 mx-auto text-primary fill-primary mb-4 animate-pulse-heart" />
              <p className="text-xl font-bold text-primary mb-2">
                You unlocked it, Priya! 🔓✨
              </p>
              <p className="text-muted-foreground">
                Now for the final surprise...
              </p>
            </div>
            <Button 
              onClick={onComplete}
              size="lg"
              className="rounded-full px-8 animate-pulse"
            >
              See Your Surprise!
              <Sparkles className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SecretMessage;
