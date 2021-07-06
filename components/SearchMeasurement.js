import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { BottomSheet, Card, Header, Switch, Text } from "react-native-elements";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

const MEASUREMENT_DATA = [
  {
    index: "weight",
    name: "Weight (kg)",
    min: 10,
    max: 200,
  },
  {
    index: "height",
    name: "Height (cm)",
    min: 10,
    max: 200,
  },
  {
    index: "bust",
    name: "Bust (cm)",
    min: 10,
    max: 200,
  },
  {
    index: "waist",
    name: "Waist (cm)",
    min: 10,
    max: 200,
  },
  {
    index: "hip",
    name: "Hip (cm)",
    min: 10,
    max: 200,
  },
];

const BodyIndex = ({
  name,
  minValue,
  maxValue,
  value,
  setValue,
  switchValue,
  toggleSwitch,
}) => {
  return (
    <View style={styles.bodyIndexContainer}>
      <Text style={styles.bodyIndexTitle}>{name}</Text>
      <Switch value={switchValue} onValueChange={toggleSwitch} />
      <MultiSlider
        enableLabel={true}
        step={1}
        showSteps={true}
        isMarkersSeparated={true}
        min={minValue}
        max={maxValue}
        values={[value ?? 0]}
        onValuesChangeFinish={(values) => {
          setValue(values[0]);
        }}
        sliderLength={200}
        containerStyle={{
          marginLeft: 20,
        }}
      />
    </View>
  );
};

export default function SearchMeasurement({
  visible,
  setVisible,
  measurement,
  setMeasurement,
  onFinish,
}) {
  const changeBodyIndexValue = (index) => (value) => {
    setMeasurement({
      ...measurement,
      [index]: {
        ...measurement[index],
        value: value,
      },
    });
  };

  const toggleBodyIndex = (index) => () => {
    setMeasurement({
      ...measurement,
      [index]: {
        ...measurement[index],
        enable: !measurement[index].enable,
      },
    });
  };

  const isBodyIndexActive = (index) => {
    return measurement[index].enable;
  };

  const getBodyIndexValue = (index) => {
    return measurement[index].value;
  };

  const data = MEASUREMENT_DATA;

  return (
    <BottomSheet isVisible={visible}>
      <View
        style={{
          height: 500,
          backgroundColor: "white",
        }}
      >
        <Header
          centerComponent={
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Adjust Measurements
            </Text>
          }
          containerStyle={{
            backgroundColor: "white",
          }}
          rightComponent={
            <Text
              style={{
                fontSize: 18,
              }}
              onPress={() => {
                setVisible(!visible);
                onFinish();
              }}
            >
              Done
            </Text>
          }
        />
        <ScrollView style={styles.inner}>
          {data.map((bodyIndex) => {
            return (
              <BodyIndex
                key={bodyIndex.index}
                name={bodyIndex.name}
                minValue={bodyIndex.min}
                maxValue={bodyIndex.max}
                value={getBodyIndexValue(bodyIndex.index)}
                setValue={changeBodyIndexValue(bodyIndex.index)}
                switchValue={isBodyIndexActive(bodyIndex.index)}
                toggleSwitch={toggleBodyIndex(bodyIndex.index)}
              />
            );
          })}
        </ScrollView>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 0,
    shadowColor: "rgba(0,0,0,0)",
    shadowOpacity: 0,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 0,
    marginVertical: 0,
  },
  inner: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  bodyIndexTitle: {
    marginRight: 10,
    fontWeight: "bold",
  },
  bodyIndexContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 35,
  },
});
