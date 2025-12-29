import { useNavigation } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { Dimensions, ImageBackground, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/Card";
import ComboPopup from "../components/ComboPopup";
import ProgressBar from "../components/ProgressBar";
import ScoreBar from "../components/ScoreBar";
import { useGameLogic } from "../hooks/useGameLogic";
import { useSound } from "../hooks/useSound";
import { useStorage } from "../hooks/useStorage";
import { COLORS } from "../utils/constants";
import { formatTime } from "../utils/gameHelpers";

const { width } = Dimensions.get("window");

export default function GameScreen() {
  const params = useLocalSearchParams();
  const levelId = parseInt(params.levelId as string) || 1;
  const navigation = useNavigation();

  const { playSound } = useSound();
  const [bestScore, setBestScore] = useStorage<number>("bestScore", 0);

  const {
    cards,
    flippedCards,
    matchedPairs,
    moves,
    time,
    score,
    combo,
    showCombo,
    gameWon,
    level,
    handleCardPress,
  } = useGameLogic(levelId, playSound);

  useEffect(() => {
    if (gameWon) {
      if (score > bestScore) {
        setBestScore(score);
      }

      setTimeout(() => {
        router.push({
          pathname: "/victory",
          params: {
            levelId: level.id.toString(),
            score: score.toString(),
            time: time.toString(),
            moves: moves.toString(),
            combo: combo.toString(),
          },
        });
      }, 1000);
    }
  }, [gameWon]);

  // Responsive card size calculation
  const isDesktop = width > 768;
  const horizontalPadding = isDesktop ? 40 : 20;
  const maxBoardWidth = isDesktop ? 800 : width - 40;

  const cardWidth = Math.min(
    (maxBoardWidth - (level.cols - 1) * 10) / level.cols,
    isDesktop ? 120 : 80
  );
  const cardHeight = cardWidth / 0.75;

  const handleQuit = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require("../assets/images/dashboard_bg.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Score Bar */}
          <ScoreBar
            level={level.id}
            time={formatTime(time)}
            moves={moves}
            score={score}
            onQuit={handleQuit}
          />

          {/* Combo Popup */}
          <ComboPopup combo={combo} visible={showCombo} />

          {/* Game Board */}
          <View style={styles.boardWrapper}>
            <View style={[styles.board, { maxWidth: maxBoardWidth }]}>
              {cards.map((card, index) => {
                const isFlipped =
                  flippedCards.includes(card.id) ||
                  matchedPairs.includes(card.id);
                const isMatched = matchedPairs.includes(card.id);

                return (
                  <View
                    key={card.id}
                    style={{
                      width: cardWidth,
                      height: cardHeight,
                      margin: isDesktop ? 6 : 4
                    }}
                  >
                    <Card
                      emoji={card.emoji}
                      isFlipped={isFlipped}
                      isMatched={isMatched}
                      onPress={() => handleCardPress(card.id)}
                      disabled={isMatched}
                      index={index}
                    />
                  </View>
                );
              })}
            </View>
          </View>

          {/* Progress Bar */}
          <ProgressBar current={matchedPairs.length / 2} total={level.pairs} />
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
  content: {
    flex: 1,
    padding: 20,
  },
  boardWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
});
