import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Register from "../Register";
import RegisterBody from "../RegisterBody";
import RegisterHobby from "../RegisterHobby";
import RegisterPhone from "../RegisterPhone";

const Stack = createStackNavigator();

const RegisterStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={"RegisterPhone"}>
      <Stack.Screen
        name={"RegisterPhone"}
        component={RegisterPhone}
        options={
          {
            // headerShown: false,
          }
        }
      />
      <Stack.Screen
        name={"Register"}
        component={Register}
        options={
          {
            // headerShown: false,
          }
        }
      />
      <Stack.Screen
        name={"RegisterBody"}
        component={RegisterBody}
        options={
          {
            // headerShown: false,
          }
        }
      />
      <Stack.Screen
        name={"RegisterHobby"}
        component={RegisterHobby}
        options={
          {
            // headerShown: false,
          }
        }
      />
    </Stack.Navigator>
  );
};

export default RegisterStackNavigator;
