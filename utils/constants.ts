import { Level, Themes } from "../types/game";

export const LEVELS: Level[] = [
  { id: 1, name: "Easy", pairs: 4, rows: 2, cols: 4, theme: "minimal" },
  { id: 2, name: "Medium", pairs: 6, rows: 3, cols: 4, theme: "nature" },
  { id: 3, name: "Hard", pairs: 8, rows: 4, cols: 4, theme: "objects" },
  { id: 4, name: "Expert", pairs: 10, rows: 4, cols: 5, theme: "symbols" },
];

export const THEMES: Themes = {
  minimal: ["●", "■", "▲", "◆", "★", "♠", "♥", "♣", "♦", "◉"],
  nature: ["🌸", "🌿", "🍃", "🌺", "🌻", "🌹", "🌷", "🌼", "🌵", "🍀"],
  objects: ["🎯", "🎨", "🎭", "🎪", "🎬", "🎤", "🎧", "🎼", "🎹", "🎸"],
  symbols: ["⚡", "⭐", "💫", "✨", "🔥", "💧", "🌙", "☀️", "🌈", "⚙️"],
};

// Clean, minimal color palette
export const COLORS = {
  bg: "#FAFAFA",
  bgDark: "#F5F5F5",
  card: "#FFFFFF",
  cardBack: "#E8E8E8",
  cardMatched: "#E8F5E9",
  text: "#212121",
  textLight: "#757575",
  primary: "#2196F3",
  success: "#4CAF50",
  border: "#E0E0E0",
};
