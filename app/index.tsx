import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LevelButton from "../components/LevelButton";
import { useStorage } from "../hooks/useStorage";
import { COLORS, LEVELS } from "../utils/constants";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const [bestScore] = useStorage<number>("bestScore", 0);
  const isDesktop = width > 768;

  const handleStartGame = (levelId: number) => {
    router.push({
      pathname: "/game",
      params: { levelId: levelId.toString() },
    });
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
          <ScrollView
            contentContainerStyle={[
              styles.scrollContent,
              isDesktop && styles.desktopScrollContent
            ]}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.titlePrefix}>MEMORY</Text>
              <Text style={styles.title}>MATCH</Text>

              <View style={styles.statsRow}>
                {bestScore > 0 && (
                  <View style={styles.bestScoreContainer}>
                    <Text style={styles.bestScoreLabel}>MASTER SCORE</Text>
                    <Text style={styles.bestScoreValue}>{bestScore}</Text>
                  </View>
                )}
              </View>
            </View>

            {/* Subtitle */}
            <View style={styles.subtitleContainer}>
              <View style={styles.line} />
              <Text style={styles.subtitle}>SELECT MISSION</Text>
              <View style={styles.line} />
            </View>

            {/* Level Grid */}
            <View style={styles.levelsContainer}>
              {LEVELS.map((level) => (
                <LevelButton
                  key={level.id}
                  level={level}
                  onPress={() => handleStartGame(level.id)}
                />
              ))}
            </View>
          </ScrollView>
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
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
    width: "100%",
  },
  desktopScrollContent: {
    maxWidth: 600,
  },
  header: {
    marginTop: 40,
    marginBottom: 40,
    alignItems: "center",
  },
  titlePrefix: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.primary,
    letterSpacing: 8,
    marginBottom: -10,
  },
  title: {
    fontSize: 72,
    fontWeight: "900",
    color: COLORS.text,
    letterSpacing: -2,
    textShadowColor: COLORS.primary,
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 30,
  },
  statsRow: {
    marginTop: 20,
    flexDirection: "row",
    gap: 12,
  },
  bestScoreContainer: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    minWidth: 160,
  },
  bestScoreLabel: {
    fontSize: 10,
    color: COLORS.textLight,
    fontWeight: "700",
    letterSpacing: 2,
  },
  bestScoreValue: {
    fontSize: 32,
    fontWeight: "900",
    color: COLORS.gold,
    marginTop: 2,
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
    gap: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: 4,
  },
  levelsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
    paddingHorizontal: 10,
  },
});
