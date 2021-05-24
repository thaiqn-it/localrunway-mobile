import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import getEnvVars from "./config";
import { defaultInstance } from "./api";

const { API_URI } = getEnvVars();

export default function App() {
  const [serverMsg, setServerMsg] = useState(
    "Make sure your API server started..."
  );

  defaultInstance
    .get("/")
    .then((res) => {
      setServerMsg(res.data.msg);
    })
    .catch((err) => {
      setServerMsg("Fail to connect to server.");
    });

  return (
    <View style={styles.container}>
      <Text>Connecting to backend server at {API_URI}</Text>
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
});
