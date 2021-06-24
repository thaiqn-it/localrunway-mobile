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
        shadowRadius: 2,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.1,
        shadowColor: "#555",
      }}
    />
  );
}
