import React from "react";
import { Avatar, ListItem, Text } from "react-native-elements";
import { View } from "react-native";
import { vndFormat } from "../utils";
import { useNavigation } from "@react-navigation/native";
import ColorBox from "./ColorBox";
import Rating from "./ProductRating";
import ProductRating from "./ProductRating";

export default function SearchItem({ item }) {
  const navigation = useNavigation();
  return (
    <ListItem
      button
      onPress={() => {
        navigation.navigate("Product", item._id);
      }}
      bottomDivider
      containerStyle={{
        minHeight: 100,
      }}
    >
      <Avatar
        source={{
          uri:
            item.thumbnailUrl ??
            "https://neva.vn/upload/img/ao-so-mi-trang-quan-au-den-soc.jpg",
        }}
        containerStyle={{
          width: 100,
          height: 100,
        }}
      />
      <ListItem.Content
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <View>
          <ListItem.Title>{item.name}</ListItem.Title>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <Text
              style={{
                marginRight: 10,
              }}
            >
              Size:{" "}
              <Text
                style={{
                  fontWeight: "bold",
                }}
              >
                {item.size}
              </Text>
            </Text>
            <ColorBox color={item.color} />
          </View>
          <Text
            style={{
              marginTop: 4,
            }}
          >{`Brand: ${item.brandName}`}</Text>
          <View
            style={{
              marginTop: 3,
            }}
          >
            <ProductRating rating={item.rating} />
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            {vndFormat(item.price)}
          </Text>
        </View>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
}
