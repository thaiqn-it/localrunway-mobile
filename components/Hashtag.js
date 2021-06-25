import React from "react";
import { View } from "react-native";
import { Chip, Text } from "react-native-elements";

export default function Hashtag({ hashtag }) {
  return (
    <View>
      <Chip
        title={`#${hashtag.name}`}
        containerStyle={{
          backgroundColor: "white",
          padding: 0,
        }}
        buttonStyle={{
          padding: 3,
          backgroundColor: "white",
        }}
        titleStyle={{
          color: "#2471A3",
        }}
      />
    </View>
  );
}
