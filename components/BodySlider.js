import React from "react";
import { View } from "react-native";
import { Text, Slider, Icon, Card } from "react-native-elements";

const BodySlider = (props) => {
  return (
    <Card>
      <View>
        <View>
          <Text>{props.title}</Text>
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
                name="circle"
                type="font-awesome"
                size={14}
                reverse
                containerStyle={{
                  bottom: 14,
                  right: 14,
                }}
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

export default BodySlider;
