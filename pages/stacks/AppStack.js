import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Login";
import HomeTabNavigator from "../navigations/HomeTabNavigator";
import Product from "../Product";
import HistoryOrders from "../HistoryOrders";
import RegisterStackNavigator from "../stacks/RegisterStack";
import Splash from "../Splash";
import Info from "../Info";
import Order from "../Order";
import Address from "../Address";
import CreateOrder from "../CreateOrder";
import Customer from "../Customer";

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
        name={"Address"}
        component={Address}
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
      <Stack.Screen
        name={"Info"}
        component={Info}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"Order"}
        component={Order}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"CreateOrder"}
        component={CreateOrder}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"Customer"}
        component={Customer}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
