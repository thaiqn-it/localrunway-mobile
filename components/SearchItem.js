import React from "react";
import { Avatar, ListItem, Text } from "react-native-elements";
import { View } from "react-native";
import { vndFormat } from "../utils";
import { useNavigation } from "@react-navigation/native";
import ColorBox from "./ColorBox";
export default function SearchItem({ item }) {
  const navigation = useNavigation();
  return (
    <ListItem
      onPress={() => navigation.navigate("Product", item._id)}
      bottomDivider
      containerStyle={{
        minHeight: 100,
      }}
    >
      <Avatar
        source={{
          uri: "https://neva.vn/upload/img/ao-so-mi-trang-quan-au-den-soc.jpg",
        }}
        containerStyle={{
          width: 100,
          height: 100,
        }}
      />
      <ListItem.Content
        style={{
          alignSelf: "flex-start",
        }}
      >
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
        <ListItem.Title
          style={{
            fontWeight: "bold",
            marginTop: 20,
          }}
        >
          {vndFormat(item.price)}
        </ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
}
