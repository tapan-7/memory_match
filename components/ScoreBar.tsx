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
          <Text style={styles.statLabel}>LVL</Text>
          <Text style={styles.statValue}>{level}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>TIME</Text>
          <Text style={styles.statValue}>{time}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>MOVES</Text>
          <Text style={styles.statValue}>{moves}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>SCORE</Text>
          <Text style={[styles.statValue, { color: COLORS.gold }]}>{score}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={onQuit} style={styles.quitButton}>
        <Ionicons name="close" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
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
    fontSize: 9,
    color: COLORS.textLight,
    marginBottom: 2,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "900",
    color: "#FFF",
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  quitButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
});

export default ScoreBar;
