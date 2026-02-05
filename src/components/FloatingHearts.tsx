import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface FloatingHeartsProps {
  count?: number;
  celebration?: boolean;
}

const FloatingHearts = ({ count = 10, celebration = false }: FloatingHeartsProps) => {
  const hearts = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 3,
    size: 16 + Math.random() * 24,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{ left: `${heart.left}%` }}
          initial={{ 
            y: celebration ? "100vh" : "-10%",
            opacity: 0,
            scale: 0.5
          }}
          animate={{ 
            y: celebration ? "-10%" : "110vh",
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0.5],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Heart 
            size={heart.size} 
            className="text-primary fill-primary opacity-60"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
