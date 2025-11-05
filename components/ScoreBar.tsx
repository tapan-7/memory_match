import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../utils/constants";

interface ScoreBarProps {
  level: number;
  time: string;
  moves: number;
  score: number;
  onQuit: () => void;
}

const ScoreBar: React.FC<ScoreBarProps> = ({
  level,
  time,
  moves,
  score,
  onQuit,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Level</Text>
          <Text style={styles.statValue}>{level}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Time</Text>
          <Text style={styles.statValue}>{time}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Moves</Text>
          <Text style={styles.statValue}>{moves}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Score</Text>
          <Text style={styles.statValue}>{score}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={onQuit} style={styles.quitButton}>
        <Ionicons name="close" size={22} color={COLORS.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  stats: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textLight,
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: COLORS.border,
  },
  quitButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.bgDark,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
});

export default ScoreBar;
