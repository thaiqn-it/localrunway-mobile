import React, { useEffect, useState } from "react";
import {
  BottomSheet,
  Card,
  CheckBox,
  Header,
  ListItem,
  Text,
} from "react-native-elements";
import { View, StyleSheet, ScrollView } from "react-native";
import { localBrandApi } from "../api/localbrand";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

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

const ApplyBodyMeasurement = ({ filter, setFilter }) => {
  return (
    <Card containerStyle={styles.cardContainer}>
      <Card.Title style={{ textAlign: "left" }}>
        Apply Body Measurement
      </Card.Title>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <CheckBox containerStyle={styles.cbContainer} title={"Yes"} />
        <CheckBox containerStyle={styles.cbContainer} title={"No"} />
      </View>
    </Card>
  );
};

const Prices = ({ filter, setFilter }) => {
  const MIN_PRICE = 100000;
  const MAX_PRICE = 2000000;
  const PRICE_STEP = 100000;
  return (
    <Card containerStyle={styles.cardContainer}>
      <Card.Title style={{ textAlign: "left" }}>Prices</Card.Title>
      <View
        style={{
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <MultiSlider
          enableLabel={true}
          step={PRICE_STEP}
          showSteps={true}
          onValuesChangeFinish={(values) => {
            setFilter({
              ...filter,
              prices: values,
            });
          }}
          values={[
            filter.prices[0] ?? MIN_PRICE,
            filter.prices[1] ?? MAX_PRICE,
          ]}
          isMarkersSeparated={true}
          min={MIN_PRICE}
          max={MAX_PRICE}
        />
      </View>
    </Card>
  );
};

const Brands = ({ filter, setFilter }) => {
  const [localBrands, setLocalBrands] = useState([]);
  useEffect(() => {
    localBrandApi.getAll().then((res) => {
      setLocalBrands(res.data.localBrands);
    });
  }, []);

  const checkValue = (value) => {
    return filter.brandIds.includes(value);
  };
  const toggleValue = (value) => () => {
    if (filter.brandIds.includes(value)) {
      setFilter({
        ...filter,
        brandIds: filter.brandIds.filter((id) => id !== value),
      });
    } else {
      setFilter({
        ...filter,
        brandIds: [...filter.brandIds, value],
      });
    }
  };
  return (
    <Card containerStyle={styles.cardContainer}>
      <Card.Title style={{ textAlign: "left" }}>Brands</Card.Title>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {localBrands
          .sort((b1, b2) => b1.name.localeCompare(b2.name))
          .map(({ name, _id }) => (
            <CheckBox
              key={`${_id}`}
              containerStyle={styles.cbContainer}
              checked={checkValue(_id)}
              onPress={toggleValue(_id)}
              title={name}
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
        <ScrollView>
          <ApplyBodyMeasurement filter={filter} setFilter={setFilter} />
          <SortBy filter={filter} setFilter={setFilter} />
          <Prices filter={filter} setFilter={setFilter} />
          <Brands filter={filter} setFilter={setFilter} />
        </ScrollView>
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
    marginVertical: 0,
  },
});
