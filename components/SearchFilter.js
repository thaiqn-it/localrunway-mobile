import React, { useState } from "react";
import {
  BottomSheet,
  Card,
  CheckBox,
  Header,
  ListItem,
  Text,
} from "react-native-elements";
import { View, StyleSheet } from "react-native";

const SortBy = ({ filter, setFilter }) => {
  const toggleValue = (value) => () => {
    setFilter({
      ...filter,
      sort: filter.sort === value ? null : value,
    });
  };
  const checkValue = (value) => {
    return filter.sort === value;
  };
  const options = [
    { title: "Price (+)", value: "+price" },
    { title: "Price (-)", value: "-price" },
    { title: "Name (+)", value: "+name" },
    { title: "Name (-)", value: "-name" },
  ];
  return (
    <Card containerStyle={styles.cardContainer}>
      <Card.Title style={{ textAlign: "left" }}>Sort By</Card.Title>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {options.map(({ title, value }, index) => (
          <CheckBox
            key={`${index}`}
            containerStyle={styles.cbContainer}
            checked={checkValue(value)}
            onPress={toggleValue(value)}
            title={title}
          />
        ))}
      </View>
    </Card>
  );
};

export default function SearchFilter({
  visible,
  setVisible,
  filter,
  setFilter,
  doneFilter,
}) {
  return (
    <BottomSheet isVisible={!!visible}>
      <View
        style={{
          height: 500,
          backgroundColor: "white",
        }}
      >
        <Header
          containerStyle={{
            backgroundColor: "white",
          }}
          centerComponent={
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Filter
            </Text>
          }
          rightComponent={
            <Text
              onPress={() => {
                setVisible(false);
                doneFilter();
              }}
              style={{
                fontSize: 18,
              }}
            >
              Done
            </Text>
          }
        />
        <SortBy filter={filter} setFilter={setFilter} />
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  cbContainer: {
    borderWidth: 0,
    backgroundColor: "white",
  },

  cardContainer: {
    borderWidth: 0,
    shadowColor: "rgba(0,0,0,0)",
    shadowOpacity: 0,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 0,
  },
});
