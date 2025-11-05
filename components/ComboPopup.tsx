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
        withSpring(1.1, { damping: 8 }),
        withSpring(1, { damping: 10 })
      );
      opacity.value = withSequence(
        withTiming(1, { duration: 200 }),
        withDelay(800, withTiming(0, { duration: 200 }))
      );
      translateY.value = withSequence(
        withSpring(0, { damping: 10 }),
        withDelay(800, withTiming(-20, { duration: 200 }))
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
      <Text style={styles.text}>{combo}× Combo!</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "30%",
    alignSelf: "center",
    backgroundColor: COLORS.card,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
    zIndex: 1000,
    elevation: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  text: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.primary,
  },
});

export default ComboPopup;
