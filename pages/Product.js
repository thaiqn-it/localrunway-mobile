import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { Badge, Divider, Header, Icon } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import {
  FontAwesome5,
  SimpleLineIcons,
  Feather,
  AntDesign,
} from "@expo/vector-icons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";
import MyCarousel from "../components/MyCarousel";
import BlockCard from "../components/BlockCard";
import { productApi } from "../api/product";
import { localBrandApi } from "../api/localbrand";
import { categoryApi } from "../api/category";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "../context/Cart";
import AwesomeAlert from "react-native-awesome-alerts";

const SuccessDialog = ({ visible, changeVisible, navigation }) => {
  return (
    <View style={styles.container}>
      <AwesomeAlert
        show={visible}
        showProgress={false}
        title="This product has been added to your cart!"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Go To Cart"
        confirmText="Done"
        confirmButtonColor="green"
        cancelButtonColor={"red"}
        onDismiss={() => {
          changeVisible(false);
        }}
        onCancelPressed={() => {
          changeVisible(false);
          navigation.navigate("Cart");
        }}
        onConfirmPressed={() => {
          changeVisible(false);
        }}
      />
    </View>
  );
};

function SeparateLine() {
  return (
    <View
      style={{
        borderBottomColor: "black",
        borderBottomWidth: 1,
      }}
    />
  );
}

function BlockDetail({ data }) {
  const [more, setMore] = useState(4);
  const [localBrand, setLocalBrand] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (data.brandId != null) {
      localBrandApi
        .getOneById(data.brandId)
        .then((res) => {
          setLocalBrand(res.data.localBrand);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [data]);

  useEffect(() => {
    if (data.brandId != null) {
      categoryApi
        .getOneById(data.categoryId)
        .then((res) => {
          setCategory(res.data.category);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [data]);

  return (
    <ScrollView style={styles.blockDetailContainer}>
      <View style={styles.titleDetail}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 15,
            marginLeft: 4,
            marginBottom: 10,
          }}
        >
          Recommended size measurements for this product:
        </Text>
      </View>
      <View style={styles.titleDetail}>
        <View style={{ flex: 3 }}>
          <Text style={styles.textDetail}>Weight</Text>
          <Text style={styles.textDetail}>Height</Text>
          <Text style={styles.textDetail}>3-round measurement:</Text>
        </View>
        <View style={{ flex: 7 }}>
          <Text style={styles.textInfoDetail}>
            {data.minWeight} - {data.maxWeight} kg
          </Text>
          <Text style={styles.textInfoDetail}>
            {data.minHeight} - {data.maxHeight} cm
          </Text>
          <Text style={styles.textInfoDetail}>
            {`Bust (${data.minBust} - ${data.maxBust}cm), Waist (${data.minWaist} - ${data.maxWaist}cm), Hip (${data.minHip} - ${data.maxHip}cm)`}
          </Text>
        </View>
      </View>

      <View style={styles.titleDetail}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 15,
            marginLeft: 4,
            marginBottom: 10,
          }}
        >
          Description
        </Text>
      </View>
      <View style={styles.titleDetail}>
        <View style={{ flex: 3 }}>
          <Text style={styles.textDetail}>Brand</Text>
          <Text style={styles.textDetail}>Category</Text>
          <Text style={styles.textDetail}>Quantity</Text>
        </View>
        <View style={{ flex: 7 }}>
          <Text style={styles.textInfoDetail}>{localBrand.name}</Text>
          <Text style={styles.textInfoDetail}>{category.name}</Text>
          <Text style={styles.textInfoDetail}>{data.quantity}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.description} numberOfLines={more}>
          {data.description}
        </Text>
      </View>
    </ScrollView>
  );
}

function BlockLocalBrand({ data }) {
  const [localBrand, setLocalBrand] = useState([]);
  const DEFAULT_LOGO_URL =
    "https://cdn2.iconfinder.com/data/icons/online-shopping-flat-round/550/store-512.png";
  useEffect(() => {
    if (data.brandId != null) {
      localBrandApi
        .getOneById(data.brandId)
        .then((res) => {
          setLocalBrand(res.data.localBrand);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [data]);
  return (
    <View style={styles.containerLocalBrand}>
      <View style={{ flexDirection: "row", padding: 10 }}>
        <Image
          source={{
            uri: localBrand.logoUrl ?? DEFAULT_LOGO_URL,
          }}
          style={styles.shopImage}
        />
        <View style={{ marginLeft: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {localBrand.name}
          </Text>
          <Text
            style={{
              fontSize: 15,
              marginTop: 5,
              width: 310,
            }}
          >
            {localBrand.address}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function Product() {
  const route = useRoute();
  const scroll = useRef();
  const [test, setTest] = useState("First");
  const [product, setProduct] = useState([]);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  const cartContext = useContext(CartContext);

  useEffect(() => {
    productApi
      .getOneById(route.params)
      .then((res) => {
        setProduct(res.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <MenuProvider
      style={{
        backgroundColor: "white",
      }}
    >
      <Header
        containerStyle={{
          backgroundColor: "white",
          shadowOpacity: 0.4,
          shadowRadius: 4,
        }}
        placement="left"
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
        leftContainerStyle={{ flex: 4, flexDirection: "row" }}
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
      <ScrollView ref={scroll}>
        <MyCarousel
          data={product}
          changeTest={(test) => {
            setTest(test);
          }}
        />
        <BlockLocalBrand data={product} />
        <BlockDetail data={product} />
      </ScrollView>
      <View style={styles.iconToTop}>
        <Icon
          name="sort-up"
          type={"font-awesome-5"}
          size={40}
          style={{
            marginTop: 7,
          }}
          color="black"
          onPress={() => {
            scroll.current?.scrollTo({
              y: 0,
              animated: true,
            });
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: "white",
          shadowOpacity: 0.1,
          shadowRadius: 2,
          padding: 10,
        }}
      >
        <View style={{ width: 300, alignSelf: "center" }}>
          <CartContext.Consumer>
            {({ dispatch }) => (
              <Button
                style={styles.purchaseButton}
                color={"black"}
                title={"🛒 Add To Cart"}
                onPress={() => {
                  setVisible(true);
                  dispatch({
                    type: "INCREASE",
                    item: {
                      product: product,
                      quantity: 1,
                    },
                  });
                }}
              />
            )}
          </CartContext.Consumer>
        </View>
      </View>
      <SuccessDialog
        changeVisible={(visible) => setVisible(visible)}
        visible={visible}
        navigation={navigation}
      />
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  menuOptions: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    flexDirection: "row",
    padding: 10,
  },
  textOption: {
    marginLeft: 10,
    color: "black",
  },
  blockDetailContainer: {
    backgroundColor: "white",
    marginTop: 10,
  },
  titleDetail: {
    flexDirection: "row",
    marginLeft: 10,
  },
  textDetail: {
    padding: 5,
    fontSize: 15,
  },
  textInfoDetail: {
    padding: 5,
    fontSize: 15,
    marginLeft: 10,
  },
  description: {
    marginLeft: 14,
    marginVertical: 10,
    fontSize: 15,
  },
  containerMoreProduct: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 10,
  },
  purchaseButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  containerLocalBrand: {
    backgroundColor: "white",
    marginTop: 10,
    flex: 1,
  },
  shopImage: {
    height: 65,
    width: 65,
    borderRadius: 30,
  },
  iconToTop: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 70,
    right: 20,
  },
});
