import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import getEnvVars from "./constants/env";
import { defaultInstance } from "./api";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./pages/stacks/AppStack";
import { useFonts, OpenSans_400Regular } from "@expo-google-fonts/open-sans";
import { SafeAreaProvider } from "react-native-safe-area-context/src/SafeAreaContext";

const { API_URI } = getEnvVars();

export default function App() {
  let [fontsLoaded] = useFonts({
    OpenSans_400Regular,
  });
  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
