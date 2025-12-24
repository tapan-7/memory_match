export interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface Level {
  id: number;
  name: string;
  pairs: number;
  rows: number;
  cols: number;
  theme: ThemeKey;
}

export type ThemeKey = "minimal" | "nature" | "objects" | "symbols" | "space" | "magic" | "gems" | "shapes";

export interface Themes {
  [key: string]: string[];
}
