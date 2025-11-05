import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="auto" hideTransitionAnimation="slide"/>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
          contentStyle: { backgroundColor: "#FAFAFA" },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="game" />
        <Stack.Screen name="victory" />
      </Stack>
    </GestureHandlerRootView>
  );
}
