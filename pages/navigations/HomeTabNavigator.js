import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "../Feed";
import Search from "../Search";
import Profile from "../Profile";
import { Icon } from "react-native-elements";
import { PRIMARY_COLOR } from "../../constants/styles";

const Tab = createBottomTabNavigator();

export default function HomeTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={"Search"} // test
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Feed") {
            iconName = "trending-up";
          }
          if (route.name === "Profile") {
            iconName = "person-outline";
          }
          if (route.name === "Search") {
            iconName = "search";
          }
          return <Icon name={iconName} type={"material"} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: PRIMARY_COLOR,
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name={"Feed"} component={Feed} />
      <Tab.Screen name={"Search"} component={Search} />
      <Tab.Screen name={"Profile"} component={Profile} />
    </Tab.Navigator>
  );
}