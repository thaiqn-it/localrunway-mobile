import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Header, ListItem, Avatar, Icon, Badge } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { fromNow, vndFormat } from "../utils";
import { orderApi } from "../api/order";
import LoadingSpinner from "../components/LoadingSpinner";
import { FULL_HEIGHT } from "../constants/styles";
import { CartContext } from "../context/Cart";

function HistoryOrderComponent({ data, navigation }) {
  return (
    <ListItem
      onPress={() => navigation.navigate("Order", data.item._id)}
      bottomDivider
    >
      <Avatar
        source={{
          uri: data.item.localbrand.logoUrl,
        }}
        containerStyle={{
          width: 100,
          height: 100,
        }}
      />
      <ListItem.Content>
        <ListItem.Title
          style={{
            fontWeight: "bold",
          }}
        >
          {data.item.localbrand.name} ({data.item.totalDetail} product
          {data.item.totalDetail === 1 ? "" : "s"})
        </ListItem.Title>
        <View style={styles.item}>
          <Text>⏰ Order Date: {fromNow(data.item.updatedAt)}</Text>
        </View>
        <View style={styles.item}>
          <Text>🚚 Status: </Text>
          <Text
            style={{
              color: "green",
            }}
          >
            {data.item.status}
          </Text>
        </View>
        <View style={styles.item}>
          <Text>💰 Payment Method: {data.item.payment.paymentMethod}</Text>
        </View>
        <View style={styles.item}>
          <Text>🏠 Shop Warehouse: {data.item.localbrand.address}</Text>
        </View>
        <ListItem.Title
          style={{
            fontWeight: "bold",
            marginTop: 8,
          }}
        >
          {vndFormat(data.item.total)}
        </ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
}

export default function HistoryOrders() {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const cartContext = useContext(CartContext);
  useEffect(() => {
    setLoading(!isLoading);
    orderApi.getAll().then((res) => {
      setOrders(res.data.orders);
      setLoading(isLoading);
    });
  }, []);

  return (
    <View
      style={{
        minHeight: FULL_HEIGHT,
        backgroundColor: "white",
      }}
    >
      <Header
        containerStyle={{
          backgroundColor: "white",
        }}
        leftComponent={
          <TouchableOpacity
            style={{
              alignItems: "center",
              flexDirection: "row",
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <FontAwesome5
              name={"chevron-left"}
              size={20}
              style={{ width: 30 }}
              color={"black"}
            />
            <Text
              style={{
                fontSize: 20,
                marginLeft: -5,
              }}
            >
              Back
            </Text>
          </TouchableOpacity>
        }
        centerComponent={{
          text: "History Orders",
          style: { fontSize: 20, color: "black", fontWeight: "bold" },
        }}
        rightComponent={
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => {
              navigation.navigate("Cart");
            }}
          >
            <Icon
              name="shoppingcart"
              type={"antdesign"}
              size={20}
              color="black"
            />
            {cartContext.getTotalItems() > 0 && (
              <Badge
                status={"error"}
                value={cartContext.getTotalItems()}
                containerStyle={{
                  position: "absolute",
                  top: -6,
                  right: -14,
                }}
              />
            )}
          </TouchableOpacity>
        }
      />
      <LoadingSpinner isLoading={isLoading} />
      {orders.length > 0 && (
        <FlatList
          data={orders}
          renderItem={(item) => (
            <HistoryOrderComponent data={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    marginVertical: 2,
    flexDirection: "row",
    alignItems: "center",
  },
});
