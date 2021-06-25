import React from "react";
import { Text, View } from "react-native";
import { Rating } from "react-native-elements";

export default function ProductRating({ rating }) {
  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <Rating startingValue={rating} imageSize={15} fractions={1} />
      {rating > 0 && (
        <Text
          style={{
            marginLeft: 5,
          }}
        >
          {rating}/5
        </Text>
      )}
    </View>
  );
}
