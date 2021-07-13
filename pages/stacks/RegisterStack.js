import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Register from "../Register";
import RegisterLifeStyle from "../RegisterLifeStyle";
import RegisterLifeStyleFb from "../RegisterLifeStyleFb";
import RegisterPhone from "../RegisterPhone";
import HomeTabNavigator from "../navigations/HomeTabNavigator";

const Stack = createStackNavigator();

const RegisterStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={"RegisterPhone"}>
      <Stack.Screen name={"RegisterPhone"} component={RegisterPhone} />
      <Stack.Screen name={"Register"} component={Register} />
      <Stack.Screen name={"RegisterLifeStyle"} component={RegisterLifeStyle} />
      <Stack.Screen
        name={"RegisterLifeStyleFb"}
        component={RegisterLifeStyleFb}
      />
      <Stack.Screen
        name={"HomeTab"}
        component={HomeTabNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default RegisterStackNavigator;
