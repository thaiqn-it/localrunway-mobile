import React, { useRef, useState, useEffect } from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { Rating, Icon, Header } from "react-native-elements";
import { FontAwesome5, AntDesign, Feather } from "@expo/vector-icons";
import { FlatList } from "react-native";
import { vndFormat } from "../utils";

import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  Modal,
  Image,
  Button,
} from "react-native";
import ColorBox from "./ColorBox";

const ENTRIES1 = [
  {
    id: 1,
    image:
      "https://www.kvbro.com/wp-content/uploads/2020/11/quan-ao-giay-dep.jpg",
  },
  {
    id: 2,
    image:
      "https://www.kvbro.com/wp-content/uploads/2020/11/quan-ao-giay-dep.jpg",
  },
  {
    id: 3,
    image:
      "https://www.kvbro.com/wp-content/uploads/2020/11/quan-ao-giay-dep.jpg",
  },
];

const COLOR = [
  {
    id: 1,
    color: "red",
  },
  {
    id: 2,
    color: "blue",
  },
  {
    id: 3,
    color: "yellow",
  },
];

const SIZE = [
  {
    id: 1,
    size: 30,
  },
  {
    id: 2,
    size: 31,
  },
  {
    id: 3,
    size: 32,
  },
  {
    id: 4,
    size: 33,
  },
  {
    id: 5,
    size: 35,
  },
];
const { width: screenWidth } = Dimensions.get("window");

const MyCarousel = ({ data, changeTest }) => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);
  const [rating, setRating] = useState(4);
  const [modalVisible, setModalVisible] = useState(false);
  const goForward = () => {
    carouselRef.current.snapToNext();
  };
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  const typeSelected = (value, flag) => {
    flag ? setSize(value) : setColor(value);
  };

  useEffect(() => {
    if (data.color != null) {
      setColor(data.color.toLowerCase());
    }
  }, [data]);

  useEffect(() => {
    setEntries(ENTRIES1);
  }, []);

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item.image }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
      <Text style={styles.title}>{data.name}</Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}
      >
        <Text style={styles.price}>{vndFormat(data.price)}</Text>
        <Text style={{ marginLeft: 25, fontSize: 18 }}>Size : {data.size}</Text>
        <View
          style={{
            marginLeft: 10,
          }}
        >
          <ColorBox color={color} />
        </View>
      </View>
      <View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalText}>Choose your style</Text>
                  <View
                    style={{
                      flex: 2,
                      justifyContent: "flex-end",
                      alignSelf: "center",
                    }}
                  >
                    <AntDesign
                      name="closecircleo"
                      style={{ alignSelf: "center" }}
                      size={24}
                      onPress={() => setModalVisible(!modalVisible)}
                      color="black"
                    />
                  </View>
                </View>
                <Text>Color</Text>
                <FlatList
                  style={{ margin: 5 }}
                  data={COLOR}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableWithoutFeedback
                      onPress={() => typeSelected(item.id, false)}
                    >
                      <View
                        style={
                          color === item.id
                            ? [styles.colorClick, styles.color]
                            : [styles.color, { borderWidth: 1, opacity: 0.6 }]
                        }
                      >
                        <View>
                          <Image
                            source={{
                              uri: "https://cf.shopee.vn/file/682e173bb270482ea4747f62b5556005",
                            }}
                            style={{ width: 55, height: 50 }}
                          />
                        </View>
                        <View style={{ alignSelf: "center", marginLeft: 10 }}>
                          <Text style={{ fontSize: 17 }}>{item.color}</Text>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  )}
                />
                <Text style={{ marginTop: -80 }}>Size</Text>
                <FlatList
                  style={{ margin: 5 }}
                  data={SIZE}
                  numColumns={4}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableWithoutFeedback
                      onPress={() => typeSelected(item.id, true)}
                    >
                      <Text
                        style={
                          size === item.id
                            ? [styles.sizeClick, styles.size]
                            : [styles.size, { borderWidth: 1, opacity: 0.6 }]
                        }
                      >
                        {item.size}
                      </Text>
                    </TouchableWithoutFeedback>
                  )}
                />
                <View
                  style={{
                    width: 250,
                    borderRadius: 15,
                    marginBottom: 30,
                    marginTop: -50,
                  }}
                >
                  <Button
                    title={"Confirm"}
                    onPress={() => {
                      changeTest("30");
                      setModalVisible(!modalVisible);
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
      <View style={styles.rating}>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Rating
            count={5}
            defaultRating={4}
            startingValue={4}
            imageSize={20}
            fractions={1}
          />
          <Text
            style={{
              marginLeft: 5,
            }}
          >
            {rating}/5
          </Text>
        </View>
        <Text style={styles.soldText}>
          {data.quantity > 0 ? "In Stock" : "Out Of Stock"}
        </Text>
      </View>
    </View>
  );
};

export default MyCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: "100%",
    maxWidth: "100%",
    backgroundColor: "white",
  },

  item: {
    width: screenWidth - 20,
    height: screenWidth - 60,
  },

  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 5,
  },

  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  title: {
    fontSize: 25,
    padding: 10,
    marginLeft: 5,
  },
  price: {
    color: "red",
    fontSize: 20,
    marginLeft: 10,
  },
  rating: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingTitle: {
    fontSize: 20,
    marginLeft: 10,
  },
  soldText: {
    fontSize: 15,
    alignSelf: "center",
  },
  stylePicker: {
    alignSelf: "center",
    width: screenWidth - 60,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 3,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    height: "70%",
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalText: {
    fontSize: 25,
    textAlignVertical: "center",
    flex: 8,
    marginLeft: 75,
  },
  pickerTitle: {
    color: "gray",
    margin: 3,
    marginLeft: 20,
  },
  pickerDetail: {
    margin: 3,
    marginLeft: 20,
    fontWeight: "bold",
  },
  size: {
    width: 60,
    height: 40,
    margin: 10,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 10,
  },
  sizeClick: {
    borderWidth: 2,
    borderColor: "blue",
  },
  color: {
    flexDirection: "row",
    width: 140,
    height: 55,
    margin: 10,
    borderRadius: 5,
  },
  colorClick: {
    color: "red",
    borderWidth: 2,
    borderColor: "blue",
  },
  modalHeader: {
    flexDirection: "row",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: "#2196F3",
    width: "100%",
    height: 50,
  },
});
