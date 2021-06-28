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

const ConfirmDialog = ({ visible, changeVisible, selectList }) => {
  const { dispatch, setSelect } = useContext(CartContext);
  return (
    <View style={styles.container}>
      <AwesomeAlert
        show={visible}
        showProgress={false}
        title="Do you want to delete these product ? "
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
      <Checkbox
        status={isSelected ? "checked" : "unchecked"}
        onPress={() => {
          setSelection(!isSelected);
          if (!isSelected) {
            isSelect.item.push(data.product._id);
          } else {
            isSelect.item.splice(
              isSelect.item.findIndex((id) => data.product._id === id),
              1
            );
          }
          setSelect({ type: "SELECT_ALL", item: isSelect.item });
        }}
      />
      <Avatar
        source={{
          uri: "https://bizweb.dktcdn.net/100/348/395/products/ot-tee-black-sau-t2-f358de4f-79f7-49a3-a98d-3c68de16ff08.jpg?v=1590993471227",
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
  const [isSelected, setSelection] = useState(false);
  const [visible, setVisible] = useState(false);
  const [total, setTotal] = useState(0);

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
            <View style={{width:200, alignSelf:'center',marginTop:40}}>
                <Button title={'Click here to shopping'}
                        onPress={() => navigation.navigate("Search")}/>
            </View>
        </View>
      )}
      {state.item.length > 0 && (
        <View>
          <ListItem 
            onPress={() => navigation.navigate("Info")}
            bottomDivider>
            <MaterialIcons name="location-pin" size={24} color="#2196F3" />
            <ListItem.Content>
              <View style={{ flexDirection: "row" }}>
                <View style={{ marginRight: 10 }}>
                  <Text style={styles.title}>Nguyễn Quốc Thái</Text>
                </View>
                <View>
                  <Text style={styles.title}>09453927233</Text>
                </View>
              </View>
              <ListItem.Subtitle>
                123 Man thiện , Q.9 , TP.HCM
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>

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
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "white",
  },
  orderButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
});
