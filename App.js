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

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultInstance } from "./apis";
import Login from "./pages/Login";
import Splash from "./pages/Splash";
import Product from "./pages/Product";

console.disableYellowBox = true;

const Stack = createStackNavigator();
export default function App() {
  const [serverMsg, setServerMsg] = useState(
    "Make sure your API server started..."
  );

  const [arr, setArr] = useState([]);

  defaultInstance
    .get("/")
    .then((res) => {
      setServerMsg(res.data.msg);
    })
    .catch((err) => {
      setServerMsg("Fail to connect to server.");
    });
      
  let [fontsLoaded] = useFonts({
    OpenSans_400Regular,
  });
  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Product" headerMode="none">
        <Stack.Screen name={"Splash"} component={Splash} />
        <Stack.Screen name={"Login"} component={Login} />
        <Stack.Screen name={"Product"} component={Product} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
