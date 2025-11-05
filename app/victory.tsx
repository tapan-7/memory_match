import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, LEVELS } from "../utils/constants";
import { formatTime } from "../utils/gameHelpers";

export default function VictoryScreen() {
  const params = useLocalSearchParams();

  const levelId = parseInt(params.levelId as string);
  const score = parseInt(params.score as string);
  const time = parseInt(params.time as string);
  const moves = parseInt(params.moves as string);
  const combo = parseInt(params.combo as string);

  const level = LEVELS[levelId - 1];
  const hasNextLevel = levelId < LEVELS.length;

  const handleReplay = () => {
    router.replace({
      pathname: "/game",
      params: { levelId: levelId.toString() },
    });
  };

  const handleNextLevel = () => {
    router.replace({
      pathname: "/game",
      params: { levelId: (levelId + 1).toString() },
    });
  };

  const handleHome = () => {
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Success Icon */}
          <View style={styles.iconContainer}>
            <Ionicons
              name="checkmark-circle"
              size={80}
              color={COLORS.success}
            />
          </View>

          {/* Title */}
          <Text style={styles.title}>Level Complete!</Text>
          <Text style={styles.subtitle}>
            Level {level.id} • {level.name}
          </Text>

          {/* Score */}
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>Score</Text>
            <Text style={styles.scoreValue}>{score}</Text>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Ionicons name="time-outline" size={24} color={COLORS.primary} />
              <Text style={styles.statValue}>{formatTime(time)}</Text>
              <Text style={styles.statLabel}>Time</Text>
            </View>

            <View style={styles.statBox}>
              <Ionicons
                name="footsteps-outline"
                size={24}
                color={COLORS.primary}
              />
              <Text style={styles.statValue}>{moves}</Text>
              <Text style={styles.statLabel}>Moves</Text>
            </View>

            <View style={styles.statBox}>
              <Ionicons name="flash" size={24} color={COLORS.primary} />
              <Text style={styles.statValue}>{combo}×</Text>
              <Text style={styles.statLabel}>Best Combo</Text>
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={handleReplay}
              style={styles.button}
              activeOpacity={0.7}
            >
              <Ionicons name="refresh" size={20} color={COLORS.text} />
              <Text style={styles.buttonText}>Replay</Text>
            </TouchableOpacity>

            {hasNextLevel && (
              <TouchableOpacity
                onPress={handleNextLevel}
                style={[styles.button, styles.buttonPrimary]}
                activeOpacity={0.7}
              >
                <Text style={[styles.buttonText, styles.buttonTextPrimary]}>
                  Next Level
                </Text>
                <Ionicons name="arrow-forward" size={20} color="#FFF" />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={handleHome}
              style={styles.button}
              activeOpacity={0.7}
            >
              <Ionicons name="home" size={20} color={COLORS.text} />
              <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "900",
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 32,
  },
  scoreContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 2,
    borderColor: COLORS.primary,
    minWidth: 200,
  },
  scoreLabel: {
    fontSize: 13,
    color: COLORS.textLight,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: "900",
    color: COLORS.primary,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 32,
  },
  statBox: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    minWidth: 100,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 4,
  },
  buttonsContainer: {
    width: "100%",
    gap: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.card,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  buttonTextPrimary: {
    color: "#FFF",
  },
});
