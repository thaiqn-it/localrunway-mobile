import React,{useContext,useEffect} from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "../Feed";
import Search from "../Search";
import Profile from "../Profile";
import { Icon } from "react-native-elements";
import { PRIMARY_COLOR } from "../../constants/styles";
import Cart from "../Cart";
import { CartContext } from '../../context/Cart';
import { CustomerContext } from "../../context/Customer";
import { customerApi } from "../../api/customer";
import FeedStack from "../stacks/FeedStack";
const Tab = createBottomTabNavigator();

export default function HomeTabNavigator() {
  const { setCustomer } = useContext(CustomerContext)

  useEffect(() => {
    async function loadCustomer () {
      const customer = await customerApi.getCustomer()
      setCustomer({
        type : 'LOAD',
        data : customer.data
      })
    }   
    loadCustomer()
  }, [])

  const cartContext = useContext(CartContext);
  const totalCartItems = cartContext.getTotalItems();
  return (
    <Tab.Navigator
      initialRouteName={"Feed"} // test
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconType = "material";
          if (route.name === "Feed") {
            iconName = "trending-up";
          }
          if (route.name === "Profile") {
            iconName = "person-outline";
          }
          if (route.name === "Search") {
            iconName = "search";
          }
          if (route.name === "Cart") {
            iconType = "antdesign";
            iconName = "shoppingcart";
          }
          return <Icon name={iconName} type={iconType} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: PRIMARY_COLOR,
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name={"Feed"} component={FeedStack} />
      <Tab.Screen
        name={"Search"}
        component={Search}
        options={{
          title: "Search",
        }}
      />
      <Tab.Screen
        name={"Cart"}
        component={Cart}
        options={{
          tabBarBadge: totalCartItems === 0 ? undefined : totalCartItems,
        }}
      />
      <Tab.Screen name={"Profile"} component={Profile} />
    </Tab.Navigator>
  );
}
