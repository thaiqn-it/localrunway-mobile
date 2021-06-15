import React from "react";
import { Avatar, ListItem, Text } from "react-native-elements";
import { View } from "react-native";
import { vndFormat } from "../utils";

export default function SearchItem({ item }) {
  return (
    <ListItem
      button
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
          <View
            style={{
              backgroundColor: item.color.toLowerCase(),
              width: 20,
              height: 20,
              borderRadius: "50%",
            }}
          />
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
