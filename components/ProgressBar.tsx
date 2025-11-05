import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { COLORS } from "../utils/constants";

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progress = (current / total) * 100;

  const animatedStyle = useAnimatedStyle(() => ({
    width: withSpring(`${progress}%`, { damping: 15 }),
  }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Progress</Text>
        <Text style={styles.value}>
          {current} / {total}
        </Text>
      </View>

      <View style={styles.barBackground}>
        <Animated.View style={[styles.barFill, animatedStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: COLORS.textLight,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.text,
  },
  barBackground: {
    height: 8,
    backgroundColor: COLORS.bgDark,
    borderRadius: 4,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
});

export default ProgressBar;
