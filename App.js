import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultInstance } from "./apis";
import Login from "./pages/Login";
import Splash from "./pages/Splash";

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

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" headerMode="none">
        <Stack.Screen name={"Splash"} component={Splash} />
        <Stack.Screen name={"Login"} component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "tomato",
    color: "white",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
});
