import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles } from "lucide-react";
import FloatingHearts from "./FloatingHearts";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <FloatingHearts count={15} />
      
      <motion.div 
        className="text-center z-10 max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Decorative hearts */}
        <motion.div
          className="flex justify-center gap-2 mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <Heart className="w-8 h-8 text-primary fill-primary animate-pulse-heart" />
          <Sparkles className="w-6 h-6 text-accent animate-sparkle" />
          <Heart className="w-8 h-8 text-primary fill-primary animate-pulse-heart" style={{ animationDelay: "0.5s" }} />
        </motion.div>

        {/* Main greeting */}
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-primary mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
        >
          Hey Priya! 💕
        </motion.h1>

        <motion.p 
          className="text-lg text-muted-foreground mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          I made something special just for you! 
          <br />
          <span className="text-primary font-medium">
            Complete 3 little puzzles to unlock a surprise...
          </span>
        </motion.p>

        {/* Start button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button 
            onClick={onStart}
            size="lg"
            className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-primary hover:bg-primary/90"
          >
            <Heart className="w-5 h-5 mr-2 fill-current" />
            Start Adventure
            <Sparkles className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>

        {/* Cute footer message */}
        <motion.p
          className="mt-8 text-sm text-muted-foreground italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Made with love, just for you ✨
        </motion.p>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
