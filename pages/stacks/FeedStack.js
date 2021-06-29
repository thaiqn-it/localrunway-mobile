import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Search from "../Search";
import Feed from "../Feed";

const Stack = createStackNavigator();

const FeedStack = () => {
  return (
    <Stack.Navigator initialRouteName={"Feed"}>
      <Stack.Screen
        name={"Feed"}
        component={Feed}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"Search"}
        component={Search}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default FeedStack;
