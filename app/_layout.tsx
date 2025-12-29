import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#0F0C29" }}>
      <StatusBar style="auto" hideTransitionAnimation="slide" translucent hidden />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#0F0C29" },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            gestureEnabled: false
          }} />
        <Stack.Screen
          name="game"
          options={{
            gestureEnabled: false
          }} />
        <Stack.Screen
          name="victory"
          options={{
            animation: "fade_from_bottom",
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal"
          }}
        />
      </Stack>
    </GestureHandlerRootView >
  );
}
