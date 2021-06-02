import { StatusBar } from "expo-status-bar";
<<<<<<< Updated upstream
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
=======
import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
>>>>>>> Stashed changes
import getEnvVars from "./config";
import * as SplashScreen from "expo-splash-screen";

import { defaultInstance } from "./api";

const { API_URI } = getEnvVars();

export default function App() {
  const [serverMsg, setServerMsg] = useState(
    "Make sure your API server started..."
  );

<<<<<<< Updated upstream
  const [arr, setArr] = useState([]);
=======
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await new Promise((resolve) => setTimeout(resolve, 2700));
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
>>>>>>> Stashed changes

  defaultInstance
    .get("/")
    .then((res) => {
      setServerMsg(res.data.msg);
    })
    .catch((err) => {
      setServerMsg("Fail to connect to server.");
    });

  const [count, setCount] = useState(0);
  const [bgButton, setbgButton] = useState("");

  useEffect(() => {
    if (count % 2 == 0) {
      setbgButton("tomato");
    } else {
      setbgButton("green");
    }
  }, [count]);

  useEffect(() => {
    if (arr.indexOf(count) >= 0) {
      setArr(arr.filter((x) => x !== count));
    } else {
      setArr([...arr, count]);
    }
  }, [count]);

  useEffect(() => {
    setbgButton("yellow");
  }, []);

  return (
    <View style={styles.container}  onLayout={onLayoutRootView}>
      <Text>Connecting to backend server at {API_URI}</Text>
      <Text>{count}</Text>
      <Text>{arr.join(", ")}</Text>
      <TouchableOpacity
        onPress={() => {
          setCount(count + 1);
        }}
      >
        <View style={{ ...styles.button, backgroundColor: bgButton }}>
          <Text>Count</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setCount(count - 1);
        }}
      >
        <View style={{ ...styles.button, backgroundColor: bgButton }}>
          <Text>Dec Count</Text>
        </View>
      </TouchableOpacity>
      <Text>Result: {serverMsg}</Text>
      <StatusBar style="auto" />
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
