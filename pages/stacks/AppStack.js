import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Login";
import HomeTabNavigator from "../navigations/HomeTabNavigator";
import Product from "../Product";
import HistoryOrders from "../HistoryOrders";
import RegisterStackNavigator from "../stacks/RegisterStack";
import Splash from "../Splash";

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName={"Splash"}>
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
      <Stack.Screen
        name={"Product"}
        component={Product}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"History"}
        component={HistoryOrders}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"RegisterStack"}
        component={RegisterStackNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"Splash"}
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
