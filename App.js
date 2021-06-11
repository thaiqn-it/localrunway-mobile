import {StatusBar} from "expo-status-bar";
import React, {useEffect, useState} from "react";
import {ActivityIndicator, Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import getEnvVars from "./constants/env";
import {defaultInstance} from "./api";
import {NavigationContainer} from "@react-navigation/native";
import AppStack from "./pages/stacks/AppStack";
import { useFonts, Pacifico_400Regular  } from '@expo-google-fonts/pacifico';

const {API_URI} = getEnvVars();

export default function App() {
    let [fontsLoaded] = useFonts({
        Pacifico_400Regular,
    });
    if (!fontsLoaded) {
        return <ActivityIndicator />
    }
    return (
        <NavigationContainer>
            <AppStack />
        </NavigationContainer>
    );
}