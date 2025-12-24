import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, LEVELS } from "../utils/constants";
import { formatTime } from "../utils/gameHelpers";

const { width } = Dimensions.get("window");

export default function VictoryScreen() {
  const params = useLocalSearchParams();

  const levelId = parseInt(params.levelId as string);
  const score = parseInt(params.score as string);
  const time = parseInt(params.time as string);
  const moves = parseInt(params.moves as string);
  const combo = parseInt(params.combo as string);

  const isDesktop = width > 768;

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
    <ImageBackground
      source={require("../assets/images/dashboard_bg.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerWrapper}>
          <View style={[styles.content, isDesktop && styles.desktopContent]}>
            {/* Success Icon */}
            <View style={styles.iconContainer}>
              <View style={styles.iconBg}>
                <Ionicons
                  name="trophy"
                  size={80}
                  color={COLORS.gold}
                />
              </View>
            </View>

            {/* Title */}
            <Text style={styles.title}>MISSION COMPLETE</Text>
            <Text style={styles.subtitle}>
              LEVEL {level.id} • {level.name.toUpperCase()}
            </Text>

            {/* Score */}
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreLabel}>TOTAL SCORE</Text>
              <Text style={styles.scoreValue}>{score}</Text>
            </View>

            {/* Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statBox}>
                <Ionicons name="time" size={24} color={COLORS.primary} />
                <Text style={styles.statValue}>{formatTime(time)}</Text>
                <Text style={styles.statLabel}>TIME</Text>
              </View>

              <View style={styles.statBox}>
                <Ionicons
                  name="footsteps"
                  size={24}
                  color={COLORS.primary}
                />
                <Text style={styles.statValue}>{moves}</Text>
                <Text style={styles.statLabel}>MOVES</Text>
              </View>

              <View style={styles.statBox}>
                <Ionicons name="flash" size={24} color={COLORS.accent} />
                <Text style={styles.statValue}>{combo}×</Text>
                <Text style={styles.statLabel}>COMBO</Text>
              </View>
            </View>

            {/* Buttons */}
            <View style={styles.buttonsContainer}>
              {hasNextLevel && (
                <TouchableOpacity
                  onPress={handleNextLevel}
                  style={[styles.button, styles.buttonPrimary]}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buttonTextPrimary}>NEXT MISSION</Text>
                  <Ionicons name="arrow-forward" size={20} color="#FFF" />
                </TouchableOpacity>
              )}

              <View style={styles.rowButtons}>
                <TouchableOpacity
                  onPress={handleReplay}
                  style={[styles.button, styles.flexButton]}
                  activeOpacity={0.8}
                >
                  <Ionicons name="refresh" size={20} color="#FFF" />
                  <Text style={styles.buttonText}>RETRY</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleHome}
                  style={[styles.button, styles.flexButton]}
                  activeOpacity={0.8}
                >
                  <Ionicons name="home" size={20} color="#FFF" />
                  <Text style={styles.buttonText}>MENU</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
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
  centerWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  desktopContent: {
    maxWidth: 600,
  },
  iconContainer: {
    marginBottom: 32,
  },
  iconBg: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFF",
    marginBottom: 8,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: "800",
    marginBottom: 40,
    letterSpacing: 4,
  },
  scoreContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    minWidth: 240,
  },
  scoreLabel: {
    fontSize: 10,
    color: COLORS.textLight,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 56,
    fontWeight: "900",
    color: COLORS.gold,
    textShadowColor: COLORS.gold,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 48,
  },
  statBox: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
    flex: 1,
    minWidth: 90,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "900",
    color: "#FFF",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 9,
    fontWeight: "800",
    color: COLORS.textLight,
    marginTop: 4,
    letterSpacing: 1,
  },
  buttonsContainer: {
    width: "100%",
    gap: 12,
  },
  rowButtons: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    gap: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  flexButton: {
    flex: 1,
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#FFF",
    letterSpacing: 1,
  },
  buttonTextPrimary: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFF",
    letterSpacing: 2,
  },
});
