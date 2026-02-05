import { Progress } from "@/components/ui/progress";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  currentPuzzle: number;
  totalPuzzles: number;
}

const ProgressBar = ({ currentPuzzle, totalPuzzles }: ProgressBarProps) => {
  const progress = (currentPuzzle / totalPuzzles) * 100;

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-sm p-4 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 20 }}
    >
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Puzzle {currentPuzzle} of {totalPuzzles}
          </span>
          <div className="flex gap-1">
            {Array.from({ length: totalPuzzles }, (_, i) => (
              <Heart
                key={i}
                className={`w-4 h-4 transition-all duration-300 ${
                  i < currentPuzzle
                    ? "text-primary fill-primary"
                    : "text-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </motion.div>
  );
};

export default ProgressBar;
