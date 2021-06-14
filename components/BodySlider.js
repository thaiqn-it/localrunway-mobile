import React from "react";
import { View } from "react-native";
import { Text, Slider, Icon, Card } from "react-native-elements";

const BodySlider = (props) => {
  return (
    <Card>
      <View>
        <View>
          <Text>{props.title}</Text>
          {/* <Input
                keyboardType="numeric"
                inputContainerStyle={styles.input}
                onChangeText={onChangeHeightHandler}
                value={heightValue}
              /> */}
        </View>

        <Slider
          value={props.value}
          onValueChange={props.onStretch}
          maximumValue={props.maxValue}
          minimumValue={0}
          step={1}
          trackStyle={{ height: 8, backgroundColor: "transparent" }}
          thumbStyle={{
            height: 16,
            width: 16,
            backgroundColor: "transparent",
          }}
          thumbProps={{
            children: (
              <Icon
                name="square"
                type="font-awesome"
                size={16}
                reverse
                containerStyle={{ bottom: 16, right: 16 }}
                color="#000000"
              />
            ),
          }}
        />
        <Text>{props.result}</Text>
      </View>
    </Card>
  );
};

// sliderContainer: {
//     justifyContent: "center",
//     alignItems: "stretch",
//   },
//   sliderInputContainer: {
//     flexDirection: "row",
//     alignContent: "center",
//     alignItems: "center",
//     width: "100%",
//     height: "38%",
//   },
//   input: {
//     borderWidth: 1,
//     borderRadius: 5,
//     width: "14%",
//     height: "70%",
//     marginTop: 24,
//   },

export default BodySlider;
