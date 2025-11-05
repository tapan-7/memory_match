import { router } from "expo-router";
import React from "react";
import {
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

export default function HomeScreen() {
  const [bestScore] = useStorage<number>("bestScore", 0);

  const handleStartGame = (levelId: number) => {
    router.push({
      pathname: "/game",
      params: { levelId: levelId.toString() },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Memory</Text>
            {bestScore > 0 && (
              <View style={styles.bestScoreContainer}>
                <Text style={styles.bestScoreLabel}>Best Score</Text>
                <Text style={styles.bestScoreValue}>{bestScore}</Text>
              </View>
            )}
          </View>

          {/* Subtitle */}
          <Text style={styles.subtitle}>Choose a level to start</Text>

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
  scrollContent: {
    padding: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 8,
  },
  title: {
    fontSize: 48,
    fontWeight: "900",
    color: COLORS.text,
    letterSpacing: -2,
  },
  bestScoreContainer: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignSelf: "flex-start",
  },
  bestScoreLabel: {
    fontSize: 11,
    color: COLORS.textLight,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  bestScoreValue: {
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.primary,
    marginTop: 4,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 24,
  },
  levelsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
