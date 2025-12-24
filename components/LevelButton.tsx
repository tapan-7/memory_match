import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Level } from "../types/game";
import { COLORS } from "../utils/constants";

interface LevelButtonProps {
  level: Level;
  onPress: () => void;
}

const LevelButton: React.FC<LevelButtonProps> = ({ level, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.container}
    >
      <View style={styles.badge}>
        <Text style={styles.levelNumber}>{level.id}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.levelName}>{level.name.toUpperCase()}</Text>
        <View style={styles.details}>
          <Text style={styles.pairs}>{level.pairs} PAIRS</Text>
          <View style={styles.dot} />
          <Text style={styles.theme}>{level.theme.toUpperCase()}</Text>
        </View>
      </View>
      <View style={styles.chevron} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 24,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    marginBottom: 4,
  },
  badge: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  levelNumber: {
    fontSize: 24,
    fontWeight: "900",
    color: "#FFF",
  },
  content: {
    flex: 1,
  },
  levelName: {
    fontSize: 18,
    fontWeight: "900",
    color: "#FFF",
    letterSpacing: 1,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  pairs: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.textLight,
    letterSpacing: 1,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginHorizontal: 8,
  },
  theme: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.gold,
    letterSpacing: 1,
  },
  chevron: {
    width: 8,
    height: 8,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
    transform: [{ rotate: "45deg" }],
    marginLeft: 8,
  }
});

export default LevelButton;
