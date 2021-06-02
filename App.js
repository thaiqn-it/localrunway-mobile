import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import getEnvVars from "./config";
import * as SplashScreen from "expo-splash-screen";

import { defaultInstance } from "./api";
import Login from './pages/Login';

const { API_URI } = getEnvVars();

export default function App() {
  const [serverMsg, setServerMsg] = useState(
    "Make sure your API server started..."
  );

  const [arr, setArr] = useState([]);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  defaultInstance
    .get("/")
    .then((res) => {
      setServerMsg(res.data.msg);
    })
    .catch((err) => {
      setServerMsg("Fail to connect to server.");
    });

  return (
    <View onLayout={onLayoutRootView}>
      {/* <Text>Connecting to backend server at {API_URI}</Text>
      <Text>Result: {serverMsg}</Text> */}
      <Login />
      {/* <StatusBar style="auto" /> */}
    </View>
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
