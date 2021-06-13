import React from "react";
import { Button } from "react-native";
import { View, Text } from "react-native";

const RegisterBody = (props) => {
  const navigation = props.navigation;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Body Measurements",
    });
  }, [navigation]);
  return (
    <View>
      <Text>Body screen!</Text>
      <Button
        onPress={() => props.navigation.navigate("RegisterHobby")}
        title="Go to hobby"
      />
    </View>
  );
};

export default RegisterBody;
