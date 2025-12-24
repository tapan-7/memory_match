import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { COLORS } from "../utils/constants";

interface ComboPopupProps {
  combo: number;
  visible: boolean;
}

const ComboPopup: React.FC<ComboPopupProps> = ({ combo, visible }) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-20);

  useEffect(() => {
    if (visible && combo > 1) {
      scale.value = withSequence(
        withSpring(1.15, { damping: 20, stiffness: 80 }),
        withSpring(1, { damping: 15 })
      );
      opacity.value = withSequence(
        withTiming(1, { duration: 200 }),
        withDelay(1200, withTiming(0, { duration: 400 }))
      );
      translateY.value = withSequence(
        withSpring(0, { damping: 20, stiffness: 80 }),
        withDelay(1200, withTiming(-10, { duration: 400 }))
      );
    }
  }, [visible, combo]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
    opacity: opacity.value,
  }));

  if (!visible || combo <= 1) return null;

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={styles.text}>{combo}× COMBO!</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "40%",
    alignSelf: "center",
    backgroundColor: "rgba(255, 215, 0, 0.2)",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: COLORS.gold,
    zIndex: 2000,
    elevation: 10,
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
  },
  text: {
    fontSize: 28,
    fontWeight: "900",
    color: COLORS.gold,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
});

export default ComboPopup;
