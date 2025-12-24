import React, { useEffect } from "react";
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring
} from "react-native-reanimated";
import { COLORS } from "../utils/constants";

interface CardProps {
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
  onPress: () => void;
  disabled?: boolean;
  index: number;
}

const Card: React.FC<CardProps> = ({
  emoji,
  isFlipped,
  isMatched,
  onPress,
  disabled = false,
  index,
}) => {
  const rotateY = useSharedValue(0);
  const scale = useSharedValue(0); // For entrance animation
  const skew = useSharedValue(0);

  useEffect(() => {
    // Entrance animation "Card Swap" feel
    if (Platform.OS === 'web') {
      scale.value = withDelay(index * 30, withSpring(1));
    } else {
      scale.value = withDelay(
        index * 50,
        withSpring(1, { damping: 20, stiffness: 60 })
      );
    }
  }, []);

  useEffect(() => {
    rotateY.value = withSpring(isFlipped ? 180 : 0, {
      damping: 20,
      stiffness: 80,
    });
  }, [isFlipped]);

  useEffect(() => {
    if (isMatched) {
      scale.value = withSequence(
        withSpring(1.05, { damping: 15 }),
        withSpring(1, { damping: 15 })
      );
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
      activeOpacity={0.8}
      style={styles.container}
    >
      {/* Card Back (hidden state) */}
      <Animated.View
        style={[styles.cardFace, styles.cardBack, frontAnimatedStyle]}
      >
        <Image
          source={require("../assets/images/card_back.png")}
          style={styles.cardBackImage}
          resizeMode="cover"
        />
        <View style={styles.overlay} />
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
        <View style={styles.frontInner}>
          <Text style={styles.emoji}>{emoji}</Text>
          {isMatched && <View style={styles.matchedCheck} />}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    aspectRatio: 0.75, // More card-like aspect ratio
    padding: 6,
  },
  cardFace: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    borderRadius: 16,
    overflow: Platform.OS === 'web' ? 'visible' : 'hidden', // Some web browsers have issues with hidden overflow + backface
    borderWidth: 1.5,
  },
  cardBack: {
    backgroundColor: COLORS.cardBack,
    borderColor: COLORS.primary,
  },
  cardBackImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  cardFront: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
  },
  frontInner: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  cardMatched: {
    backgroundColor: COLORS.cardMatched,
    borderColor: COLORS.secondary,
    borderWidth: 2,
  },
  emoji: {
    fontSize: 36,
  },
  matchedCheck: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.secondary,
  }
});

export default Card;
