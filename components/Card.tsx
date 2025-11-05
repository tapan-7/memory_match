import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated";
import { COLORS } from "../utils/constants";

interface CardProps {
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
  onPress: () => void;
  disabled?: boolean;
}

const Card: React.FC<CardProps> = ({
  emoji,
  isFlipped,
  isMatched,
  onPress,
  disabled = false,
}) => {
  const rotateY = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    rotateY.value = withSpring(isFlipped ? 180 : 0, {
      damping: 15,
      stiffness: 100,
    });
  }, [isFlipped]);

  useEffect(() => {
    if (isMatched) {
      scale.value = withSpring(0.95, { damping: 10 });
    }
  }, [isMatched]);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(
      rotateY.value,
      [0, 180],
      [0, 180],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotateValue}deg` },
        { scale: scale.value },
      ],
      opacity: interpolate(rotateY.value, [0, 90, 180], [1, 0, 0]),
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(
      rotateY.value,
      [0, 180],
      [180, 360],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotateValue}deg` },
        { scale: scale.value },
      ],
      opacity: interpolate(rotateY.value, [0, 90, 180], [0, 0, 1]),
    };
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isMatched}
      activeOpacity={0.9}
      style={styles.container}
    >
      {/* Card Back (hidden state) */}
      <Animated.View
        style={[styles.cardFace, styles.cardBack, frontAnimatedStyle]}
      >
        <View style={styles.cardBackInner}>
          <View style={styles.dotPattern}>
            {[...Array(9)].map((_, i) => (
              <View key={i} style={styles.dot} />
            ))}
          </View>
        </View>
      </Animated.View>

      {/* Card Front (revealed state) */}
      <Animated.View
        style={[
          styles.cardFace,
          styles.cardFront,
          backAnimatedStyle,
          isMatched && styles.cardMatched,
        ]}
      >
        <Text style={styles.emoji}>{emoji}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    padding: 4,
  },
  cardFace: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cardBack: {
    backgroundColor: COLORS.cardBack,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardBackInner: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  dotPattern: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 24,
    height: 24,
    gap: 4,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.textLight,
    opacity: 0.3,
  },
  cardFront: {
    backgroundColor: COLORS.card,
    borderWidth: 2,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardMatched: {
    backgroundColor: COLORS.cardMatched,
    borderColor: COLORS.success,
  },
  emoji: {
    fontSize: 32,
  },
});

export default Card;
