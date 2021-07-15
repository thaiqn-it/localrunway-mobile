import React, { useRef, useState, useEffect } from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { vndFormat } from "../utils";

import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Platform,
} from "react-native";
import ColorBox from "./ColorBox";
import ProductRating from "./ProductRating";
import Hashtag from "./Hashtag";

const DEFAULT_MEDIA = [
  {
    id: 1,
    mediaUrl:
      "https://www.kvbro.com/wp-content/uploads/2020/11/quan-ao-giay-dep.jpg",
  },
  {
    id: 2,
    mediaUrl:
      "https://www.kvbro.com/wp-content/uploads/2020/11/quan-ao-giay-dep.jpg",
  },
  {
    id: 3,
    mediaUrl:
      "https://www.kvbro.com/wp-content/uploads/2020/11/quan-ao-giay-dep.jpg",
  },
];

const { width: screenWidth } = Dimensions.get("window");

const MyCarousel = ({ data, changeTest }) => {
  const [entries, setEntries] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const carouselRef = useRef(null);
  const [color, setColor] = useState("");

  useEffect(() => {
    if (data.color != null) {
      setColor(data.color.toLowerCase());
    }
    if (data.media) {
      setEntries(
        data.media.map((item) => {
          return {
            mediaUrl: item.mediaUrl,
            id: item._id,
          };
        })
      );
    }
    if (Array.isArray(data.hashtags)) {
      setHashtags(data.hashtags);
    }
  }, [data]);

  useEffect(() => {
    setEntries(DEFAULT_MEDIA);
  }, []);

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item.mediaUrl }}
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
        itemWidth={screenWidth - 20}
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
      <View style={styles.rating}>
        <ProductRating rating={data.rating} />
        <Text style={styles.soldText}>
          {data.quantity > 0 ? "In Stock" : "Out Of Stock"}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginLeft: 15,
          marginTop: 10,
        }}
      >
        {hashtags.map((hashtag) => {
          return <Hashtag key={hashtag._id} hashtag={hashtag} />;
        })}
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
    height: screenWidth - 20,
  },

  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    elevation: 5,
  },

  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "contain",
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
});
