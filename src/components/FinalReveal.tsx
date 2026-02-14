import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles } from "lucide-react";
import FloatingHearts from "./FloatingHearts";
import confetti from "canvas-confetti";

const NO_RESPONSES = [
  "Are you sure? 🥺",
  "Think again! 💔",
  "Please? 🥹",
  "Don't do this to me! 😢",
  "I'll cry! 😭",
  "My heart is breaking... 💔",
  "Last chance... 🥺",
];

interface FinalRevealProps {
  onRestart: () => void;
}

const FinalReveal = ({ onRestart }: FinalRevealProps) => {
  const [answered, setAnswered] = useState(false);
  const [noCount, setNoCount] = useState(0);

  const yesScale = 1 + noCount * 0.3;
  const noShown = noCount < NO_RESPONSES.length;

  const yesLabel = noCount === 0 ? "Yes! 💕" : noCount >= 3 ? "Definitely Yes! 💕" : "Yes! 💕";

  const handleNo = () => {
    setNoCount((c) => c + 1);
  };

  const handleYes = () => {
    setAnswered(true);
    
    // Big celebration!
    const duration = 3000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ff69b4", "#ff1493", "#ffb6c1", "#ff85a2"],
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ff69b4", "#ff1493", "#ffb6c1", "#ff85a2"],
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <FloatingHearts count={20} celebration={answered} />
      
      <AnimatePresence mode="wait">
        {!answered ? (
          <motion.div
            key="question"
            className="text-center z-10 max-w-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            {/* Decorative hearts */}
            <motion.div
              className="flex justify-center gap-3 mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Heart className="w-12 h-12 text-primary fill-primary animate-float" style={{ animationDelay: "0s" }} />
              <Heart className="w-16 h-16 text-primary fill-primary animate-float" style={{ animationDelay: "0.5s" }} />
              <Heart className="w-12 h-12 text-primary fill-primary animate-float" style={{ animationDelay: "1s" }} />
            </motion.div>

            {/* Personal message */}
            <motion.div
              className="bg-card rounded-2xl p-6 shadow-lg border-2 border-primary/30 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-lg text-foreground leading-relaxed">
                Priya, I have been meaning to tell you... I really like you the way you like your biryani and gulab jamun. I love spending time with you - the slow chats we do, the awkward talks, and everything about it. As I said directly when we first chatted, I really like you and I mean it.
                <span className="text-primary font-bold"> I like you a lot! 💕</span>
              </p>
            </motion.div>

            {/* Main question */}
            <motion.h1
              className="text-2xl md:text-4xl font-bold text-primary mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Will You Be My Valentine, Priya? 💝
            </motion.h1>

            {/* Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <motion.div
                animate={{ scale: yesScale }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button
                  onClick={handleYes}
                  size="lg"
                  className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Heart className="w-5 h-5 mr-2 fill-current" />
                  {yesLabel}
                </Button>
              </motion.div>

              {noShown ? (
                <motion.div
                  key={`no-${noCount}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: Math.max(0.4, 1 - noCount * 0.1), opacity: 1 }}
                  transition={{ type: "spring" }}
                >
                  <Button
                    onClick={handleNo}
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-6 rounded-full shadow-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    {noCount === 0 ? "No 😅" : NO_RESPONSES[noCount - 1]}
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring" }}
                >
                  <Button
                    onClick={handleYes}
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-6 rounded-full shadow-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Definitely Yes! 💕
                  </Button>
                </motion.div>
              )}
            </motion.div>

            {/* Meme text when clicking No */}
            <AnimatePresence>
              {noCount > 0 && !answered && (
                <motion.p
                  key={`meme-${noCount}`}
                  className="mt-4 text-sm text-muted-foreground italic"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {noCount >= NO_RESPONSES.length
                    ? "There's no escape now 😏💕"
                    : `You've clicked No ${noCount} time${noCount > 1 ? "s" : ""}... the Yes button is getting stronger 💪`}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="celebration"
            className="text-center z-10 max-w-md"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 15 }}
          >
            {/* Big heart */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <Heart className="w-32 h-32 mx-auto text-primary fill-primary animate-pulse-heart mb-6" />
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl font-bold text-primary mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Yay!!! 🎉💕
            </motion.h1>

            <motion.p
              className="text-xl text-muted-foreground mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              You just made me the happiest person ever!
            </motion.p>

            <motion.div
              className="bg-card rounded-2xl p-6 shadow-lg border-2 border-primary/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-xl text-foreground leading-relaxed">
                Can't wait to celebrate with you! 🎉💕
              </p>
            </motion.div>

            {/* Meme */}
            <motion.div
              className="mt-6 rounded-2xl overflow-hidden shadow-lg border-2 border-primary/30 bg-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0 }}
            >
              <img
                src="https://media.tenor.com/WDVBQl6n0gcAAAAM/pedro-pascal-interview.gif"
                alt="Happy reaction meme"
                className="w-full max-w-xs mx-auto"
              />
              <p className="text-sm text-muted-foreground py-2 italic">Me right now 😏💕</p>
            </motion.div>

            <motion.p
              className="mt-8 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Happy Valentine's Day! 💝
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <Button
                onClick={onRestart}
                variant="ghost"
                className="mt-4 text-muted-foreground hover:text-primary"
              >
                Play Again ↺
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FinalReveal;
