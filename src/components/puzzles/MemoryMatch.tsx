import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Star, Gift, Flower2, Sparkles, Music, Coffee, Cookie } from "lucide-react";
import confetti from "canvas-confetti";

interface MemoryMatchProps {
  onComplete: () => void;
}

const CARD_ICONS = [
  { icon: Heart, color: "text-rose-500" },
  { icon: Star, color: "text-amber-500" },
  { icon: Gift, color: "text-primary" },
  { icon: Flower2, color: "text-pink-400" },
  { icon: Sparkles, color: "text-purple-500" },
  { icon: Music, color: "text-blue-500" },
  { icon: Coffee, color: "text-amber-600" },
  { icon: Cookie, color: "text-orange-400" },
];

interface Card {
  id: number;
  iconIndex: number;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryMatch = ({ onComplete }: MemoryMatchProps) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledCards: Card[] = [];
    CARD_ICONS.forEach((_, index) => {
      shuffledCards.push({ id: index * 2, iconIndex: index, isFlipped: false, isMatched: false });
      shuffledCards.push({ id: index * 2 + 1, iconIndex: index, isFlipped: false, isMatched: false });
    });
    
    // Shuffle
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatches(0);
    setIsLocked(false);
    setIsComplete(false);
  };

  const handleCardClick = (cardId: number) => {
    if (isLocked) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    const newCards = cards.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setIsLocked(true);
      const [first, second] = newFlipped;
      const firstCard = newCards.find(c => c.id === first)!;
      const secondCard = newCards.find(c => c.id === second)!;

      if (firstCard.iconIndex === secondCard.iconIndex) {
        // Match found!
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === first || c.id === second ? { ...c, isMatched: true } : c
          ));
          setMatches(prev => {
            const newMatches = prev + 1;
            if (newMatches === CARD_ICONS.length) {
              // All matches found!
              confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
              });
              setIsComplete(true);
            }
            return newMatches;
          });
          setFlippedCards([]);
          setIsLocked(false);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === first || c.id === second ? { ...c, isFlipped: false } : c
          ));
          setFlippedCards([]);
          setIsLocked(false);
        }, 1000);
      }
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
          Memory Match 💕
        </h2>
        <p className="text-muted-foreground">
          Find all the matching pairs!
        </p>
        <p className="text-sm text-primary font-medium mt-2">
          Matches: {matches} / {CARD_ICONS.length}
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-4 gap-2 md:gap-3 max-w-sm mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        {cards.map((card) => {
          const IconComponent = CARD_ICONS[card.iconIndex].icon;
          const iconColor = CARD_ICONS[card.iconIndex].color;
          
          return (
            <motion.div
              key={card.id}
              className="flip-card w-16 h-16 md:w-20 md:h-20 cursor-pointer"
              onClick={() => handleCardClick(card.id)}
              whileHover={{ scale: card.isMatched ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`flip-card-inner w-full h-full ${card.isFlipped || card.isMatched ? 'flipped' : ''}`}>
                {/* Back of card */}
                <div className="flip-card-front absolute w-full h-full rounded-xl bg-gradient-to-br from-primary to-accent shadow-md flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white/80" />
                </div>
                
                {/* Front of card */}
                <div className={`flip-card-back absolute w-full h-full rounded-xl bg-card shadow-md flex items-center justify-center border-2 ${card.isMatched ? 'border-green-400 bg-green-50' : 'border-border'}`}>
                  <IconComponent className={`w-8 h-8 ${iconColor} ${card.isMatched ? 'animate-bounce-in' : ''}`} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <AnimatePresence>
        {isComplete && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-xl font-bold text-primary mb-4">
              Amazing job, Priya! 🎉
            </p>
            <Button 
              onClick={onComplete}
              size="lg"
              className="rounded-full px-8"
            >
              Next Puzzle
              <Sparkles className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MemoryMatch;
