import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Platform,
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
import CartProvider from "./context/Cart";
import CustomerProvider from "./context/Customer";
import { SafeAreaProvider } from "react-native-safe-area-context/src/SafeAreaContext";

const { API_URI } = getEnvVars();

console.disableYellowBox = true;

export default function App() {
  let [fontsLoaded] = useFonts({
    OpenSans_400Regular,
  });
  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }
  return (
  <CustomerProvider>
    <CartProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <AppStack />
          </NavigationContainer>
        </SafeAreaProvider>
    </CartProvider>
  </CustomerProvider>
  );
}
