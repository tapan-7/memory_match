import * as Haptics from "expo-haptics";
import { useEffect, useState } from "react";
import { Card, Level } from "../types/game";
import { LEVELS, THEMES } from "../utils/constants";
import { calculateScore, generateCards } from "../utils/gameHelpers";

type SoundType = "flip" | "match" | "complete";

interface UseGameLogicReturn {
  cards: Card[];
  flippedCards: number[];
  matchedPairs: number[];
  moves: number;
  time: number;
  score: number;
  combo: number;
  showCombo: boolean;
  gameWon: boolean;
  level: Level;
  handleCardPress: (cardId: number) => void;
  resetGame: () => void;
}

// Enhanced haptic patterns
const HapticPatterns = {
  cardFlip: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),

  match: () => {
    // Double tap for match
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setTimeout(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }, 100);
  },

  noMatch: () =>
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),

  victory: async () => {
    // Triple burst for victory
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setTimeout(async () => {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      setTimeout(() => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }, 100);
    }, 100);
  },

  combo: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid),
};

export const useGameLogic = (
  levelId: number,
  playSound: (type: SoundType) => Promise<void>
): UseGameLogicReturn => {
  const level = LEVELS[levelId - 1];
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [showCombo, setShowCombo] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, [levelId]);

  useEffect(() => {
    let timer: NodeJS.Timeout | any;
    if (cards.length > 0 && !gameWon) {
      timer = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cards, gameWon]);

  useEffect(() => {
    if (matchedPairs.length === level.pairs * 2 && matchedPairs.length > 0) {
      setGameWon(true);
      playSound("complete");
      HapticPatterns.victory();
    }
  }, [matchedPairs]);

  useEffect(() => {
    setScore(calculateScore(level, time, moves, combo));
  }, [time, moves, combo]);

  const initializeGame = () => {
    const newCards = generateCards(level, THEMES);
    setCards(newCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setTime(0);
    setScore(0);
    setCombo(0);
    setGameWon(false);
  };

  const handleCardPress = (cardId: number) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(cardId) ||
      matchedPairs.includes(cardId)
    ) {
      return;
    }

    HapticPatterns.cardFlip();
    playSound("flip");

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      const firstCard = cards.find((c) => c.id === first);
      const secondCard = cards.find((c) => c.id === second);

      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        setTimeout(() => {
          setMatchedPairs([...matchedPairs, first, second]);
          setFlippedCards([]);
          setCombo(combo + 1);

          if (combo > 0) {
            setShowCombo(true);
            setTimeout(() => setShowCombo(false), 1200);
            HapticPatterns.combo();
          }

          playSound("match");
          HapticPatterns.match();
        }, 400);
      } else {
        setCombo(0);
        HapticPatterns.noMatch();
        setTimeout(() => setFlippedCards([]), 800);
      }
    }
  };

  return {
    cards,
    flippedCards,
    matchedPairs,
    moves,
    time,
    score,
    combo,
    showCombo,
    gameWon,
    level,
    handleCardPress,
    resetGame: initializeGame,
  };
};
