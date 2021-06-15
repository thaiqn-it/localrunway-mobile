import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Login";
import HomeTabNavigator from "../navigations/HomeTabNavigator";

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName={"Login"}>
      <Stack.Screen
        name={"Login"}
        component={Login}
        options={{
          headerShown: false,
        }}
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
}
