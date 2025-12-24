import { Level, Themes } from "../types/game";

export const LEVELS: Level[] = [
  { id: 1, name: "Easy", pairs: 4, rows: 2, cols: 4, theme: "space" },
  { id: 2, name: "Medium", pairs: 6, rows: 3, cols: 4, theme: "magic" },
  { id: 3, name: "Hard", pairs: 8, rows: 4, cols: 4, theme: "gems" },
  { id: 4, name: "Expert", pairs: 10, rows: 4, cols: 5, theme: "shapes" },
];

export const THEMES: Themes = {
  minimal: ["●", "■", "▲", "◆", "★", "♠", "♥", "♣", "♦", "◉"],
  nature: ["🌸", "🌿", "🍃", "🌺", "🌻", "🌹", "🌷", "🌼", "🌵", "🍀"],
  objects: ["🎯", "🎨", "🎭", "🎪", "🎬", "🎤", "🎧", "🎼", "🎹", "🎸"],
  symbols: ["⚡", "⭐", "💫", "✨", "🔥", "💧", "🌙", "☀️", "🌈", "⚙️"],
  space: ["🚀", "🪐", "🌠", "🌌", "🛸", "👨‍🚀", "🛰️", "☄️", "🔭", "🌑"],
  magic: ["🪄", "🔮", "📜", "🧙", "🏰", "🧪", "🦄", "🐉", "🕯️", "🎭"],
  gems: ["💎", "💍", "👑", "🏆", "💰", "💵", "🤑", "🪙", "💹", "📊"],
  shapes: ["❤️", "⭐", "🌙", "☀️", "💎", "🍀", "🔥", "💧", "⚡", "🌈"],
};

// Premium, vibrant game palette
export const COLORS = {
  bg: "#0F0C29", // Deep space blue/purple
  bgDark: "#050414",
  card: "rgba(255, 255, 255, 0.15)", // Glassmorphism
  cardBack: "#1a1a2e",
  cardMatched: "rgba(76, 175, 80, 0.3)",
  text: "#FFFFFF",
  textLight: "#B0B0B0",
  primary: "#7F5AF0", // Purple
  secondary: "#2CB67D", // Green
  accent: "#E53170", // Pink/Red
  success: "#4CAF50",
  border: "rgba(255, 255, 255, 0.2)",
  gold: "#FFD700",
};

