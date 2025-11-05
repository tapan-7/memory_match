import { Card, Level, Themes } from "../types/game";

export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const generateCards = (level: Level, themes: Themes): Card[] => {
  const emojis = themes[level.theme].slice(0, level.pairs);
  const cardPairs = [...emojis, ...emojis];
  return shuffleArray(
    cardPairs.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }))
  );
};

export const calculateScore = (
  level: Level,
  time: number,
  moves: number,
  combo: number
): number => {
  const baseScore = level.pairs * 100;
  const movesPenalty = moves * 5;
  const comboBonus = combo * 50;
  return Math.max(0, baseScore - movesPenalty + comboBonus);
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};
