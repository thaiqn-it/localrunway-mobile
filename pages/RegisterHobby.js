import React from "react";
import { View, Text } from "react-native";

const RegisterHobby = (props) => {
  const navigation = props.navigation;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Hobby Routine",
    });
  }, [navigation]);
  return (
    <View>
      <Text>Hobby Screen</Text>
    </View>
  );
};

export default RegisterHobby;
