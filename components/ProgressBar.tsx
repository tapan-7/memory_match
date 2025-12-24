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
        <Text style={styles.label}>PROGRESS</Text>
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
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 10,
    color: COLORS.textLight,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  value: {
    fontSize: 12,
    fontWeight: "900",
    color: "#FFF",
  },
  barBackground: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 3,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    backgroundColor: COLORS.secondary,
    borderRadius: 3,
  },
});

export default ProgressBar;
