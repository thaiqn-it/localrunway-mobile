import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Header, ListItem, Avatar, Icon, Button } from "react-native-elements";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Checkbox } from "react-native-paper";
import { vndFormat } from "../utils";
import { CartContext } from "../context/Cart";
import InputSpinner from "react-native-input-spinner";
import AwesomeAlert from "react-native-awesome-alerts";
import { CustomerContext } from "../context/Customer";
import { Alert } from "react-native";

const ConfirmDialog = ({ visible, changeVisible, selectList }) => {
  const { dispatch, setSelect } = useContext(CartContext);
  return (
    <View style={styles.container}>
      <AwesomeAlert
        show={visible}
        showProgress={false}
        title="Do you want to delete this product?"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Yes, delete it"
        confirmButtonColor="red"
        onDismiss={() => {
          changeVisible(false);
        }}
        onCancelPressed={() => {
          changeVisible(false);
        }}
        onConfirmPressed={() => {
          dispatch({ type: "DELETE_ITEM", item: selectList });
          setSelect({ type: "REMOVE" });
        }}
      />
    </View>
  );
};

const Product = ({ data }) => {
  const [isSelected, setSelection] = useState(false);
  const { isSelect, setSelect, dispatch, state } = useContext(CartContext);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (isSelect.item.length < 1) setSelection(false);
    isSelect.item.map((item) => {
      if (data.product._id === item) {
        setSelection(true);
      }
    });
    setVisible(false);
  }, [isSelect]);

  useEffect(() => {
    setVisible(false);
  }, [state]);

  return (
    <View style={styles.containerProduct}>
      <Avatar
        source={{
          uri: data.product.thumbnailUrl,
        }}
        containerStyle={{ width: 100, height: 100 }}
      />

      <View style={{ width: 0, flex: 1, flexGrow: 1, padding: 10 }}>
        <Text style={{ fontSize: 17 }} numberOfLines={2}>
          {data.product.name}
        </Text>
        <Text style={{ fontSize: 15, color: "red", marginVertical: 10 }}>
          {vndFormat(data.product.price)}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <InputSpinner
            width={120}
            height={30}
            min={1}
            value={data.quantity}
            onChange={(value) => {
              dispatch({
                item: {
                  product: data.product,
                  quantity: value,
                },
              });
            }}
          />
          <Icon
            name={"trash-alt"}
            size={20}
            color={"red"}
            type={"font-awesome-5"}
            onPress={() => {
              setVisible(!visible);
            }}
          />
        </View>
        <ConfirmDialog
          changeVisible={(visible) => setVisible(visible)}
          visible={visible}
          selectList={{ item: [data.product._id] }}
        />
      </View>
    </View>
  );
};

const renderItem = ({ item }) => <Product data={item} />;

export default function Cart() {
  const navigation = useNavigation();
  const { state, setSelect, isSelect, getTotalPrice } = useContext(CartContext);
  const [visible, setVisible] = useState(false);
  const [total, setTotal] = useState(0);
  const customerContext = useContext(CustomerContext);

  const address = customerContext.state.address.find(
    (item) =>
      item.select == true && item.customerId == customerContext.customer._id
  );

  const changeAddress = (location) => {
    setAddress(location);
  };

  useEffect(() => {
    setTotal(getTotalPrice());
    setVisible(false);
  }, [state]);

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
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
              navigation.navigate("Search");
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
              Search
            </Text>
          </TouchableOpacity>
        }
        centerComponent={{
          text: "Cart",
          style: { fontSize: 20, color: "black", fontWeight: "bold" },
        }}
      />

      {state.item.length === 0 && (
        <View>
          <Text
            style={{
              marginTop: 10,
              textAlign: "center",
            }}
          >
            No Products
          </Text>
          <View style={{ alignSelf: "center", marginTop: 20 }}>
            <Button
              icon={{
                type: "font-awesome-5",
                name: "shopping-cart",
                size: 15,
                color: "black",
              }}
              buttonStyle={{
                backgroundColor: "white",
              }}
              containerStyle={{
                borderWidth: 1,
                borderColor: "black",
              }}
              titleStyle={{
                color: "black",
              }}
              onPress={() => {
                navigation.navigate("Search");
              }}
              title={"Go Shopping"}
            />
          </View>
        </View>
      )}
      {state.item.length > 0 && (
        <View>
          {address !== undefined && (
            <ListItem
              onPress={() => navigation.navigate("Address")}
              bottomDivider
            >
              <MaterialIcons name="location-pin" size={24} color="#2196F3" />
              <ListItem.Content>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ marginRight: 10 }}>
                    <Text style={styles.title}>{address.customer.name} |</Text>
                  </View>
                  <View>
                    <Text style={styles.title}>??? {address.customer.phone}</Text>
                  </View>
                </View>
                <ListItem.Subtitle
                  style={{
                    marginTop: 5,
                  }}
                >
                  {address.address}
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          )}
          {address === undefined && (
            <ListItem
              onPress={() => navigation.navigate("Address")}
              bottomDivider
            >
              <MaterialIcons name="location-pin" size={24} color="#2196F3" />
              <ListItem.Content>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ marginRight: 10 }}>
                    <Text style={styles.title}>Click here to add address</Text>
                  </View>
                </View>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          )}
          <ConfirmDialog
            changeVisible={(visible) => setVisible(visible)}
            visible={visible}
            selectList={isSelect}
          />

          <FlatList
            data={state.item}
            onEndReachedThreshold={0.1}
            renderItem={renderItem}
            keyExtractor={(item) => item.product._id}
          />

          <View
            style={{
              backgroundColor: "white",
              padding: 10,
              paddingHorizontal: 15,
            }}
          >
            <View>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Total: {vndFormat(total)}
              </Text>
            </View>
            <View>
              <Button
                onPress={() => {
                  if (address !== undefined) {
                    navigation.navigate("CreateOrder");
                  } else Alert.alert("Please select your address !!!");
                }}
                icon={{
                  type: "font-awesome-5",
                  name: "shopping-cart",
                  size: 15,
                  color: "black",
                }}
                buttonStyle={{
                  backgroundColor: "white",
                }}
                containerStyle={{
                  marginTop: 20,
                  borderWidth: 1,
                  borderColor: "black",
                }}
                titleStyle={{
                  color: "black",
                }}
                title={"Order"}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  containerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    marginTop: 10,
  },
  containerProduct: {
    padding: 15,
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  orderButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
});
