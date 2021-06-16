import { View } from "react-native";
import React from "react";

export default function ColorBox({ color }) {
  return (
    <View
      style={{
        backgroundColor: (color ?? "black").toLowerCase(),
        width: 20,
        height: 20,
        borderRadius: 50,
      }}
    />
  );
}
