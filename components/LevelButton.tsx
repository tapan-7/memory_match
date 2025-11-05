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
      activeOpacity={0.7}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.levelNumber}>{level.id}</Text>
        <Text style={styles.levelName}>{level.name}</Text>
      </View>
      <Text style={styles.pairs}>{level.pairs} pairs</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "48%",
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  levelNumber: {
    fontSize: 32,
    fontWeight: "900",
    color: COLORS.primary,
    marginRight: 12,
  },
  levelName: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
  },
  pairs: {
    fontSize: 13,
    color: COLORS.textLight,
  },
});

export default LevelButton;
