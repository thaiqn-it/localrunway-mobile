import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  FlatList,
} from "react-native";
import { Badge, Card, Header, SearchBar, Text } from "react-native-elements";
import { FULL_HEIGHT, FULL_WIDTH, PRIMARY_FONT } from "../constants/styles";
import { localBrandApi } from "../api/localbrand";
import { hashtagApi } from "../api/hashtag";
import Hashtag from "../components/Hashtag";
import { useNavigation } from "@react-navigation/native";
import { productApi } from "../api/product";
import SearchItem from "../components/SearchItem";
import { BANNER_URLS } from "../constants/data";
import icon from "../assets/local-runway-icon.png";
import { Image as RNEImage } from "react-native-elements";

const Brand = ({ data }) => {
  const navigation = useNavigation();
  const DEFAULT_WIDTH = 100;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push("Search", {
          passedFilter: {
            brandIds: [data._id],
          },
        });
      }}
    >
      <View
        style={{
          width: DEFAULT_WIDTH,
          height: DEFAULT_WIDTH,
          marginBottom: 30,
          shadowOpacity: 0.1,
          shadowRadius: 10,
        }}
      >
        <Image
          source={{
            uri: data.logoUrl,
          }}
          style={{
            width: DEFAULT_WIDTH,
            height: DEFAULT_WIDTH,
            borderRadius: DEFAULT_WIDTH / 2,
          }}
        />
        <View
          style={{
            backgroundColor: "white",
            padding: 8,
            shadowOpacity: 0.1,
            zIndex: 10,
            maxWidth: 80,
            bottom: 20,
            borderRadius: 2,
            left: DEFAULT_WIDTH / 2 - 40,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {data.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function Feed() {
  const [searchValue, setSearchValue] = useState("");
  const [localBrands, setLocalBrands] = useState([]);
  const [bestRatingProducts, setBestRatingProducts] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    localBrandApi.getAll().then((res) => {
      setLocalBrands(res.data.localBrands);
    });
    hashtagApi.getAll().then((res) => {
      setHashtags(res.data.hashtags);
    });
    productApi
      .search({
        sort: "-rating",
        type: "DP",
      })
      .then((res) => {
        setBestRatingProducts(res.data.products);
      });
  }, []);

  return (
    <View>
      <Header
        centerComponent={
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={icon}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
              }}
            />
            <Text
              style={{
                marginLeft: 6,
                fontSize: 15,
                fontWeight: "bold",
                letterSpacing: 2,
              }}
            >
              LocalRunway
            </Text>
            <Badge
              value={"TM"}
              badgeStyle={{
                backgroundColor: "white",
              }}
              textStyle={{
                color: "black",
                fontSize: 8,
                fontWeight: "bold",
              }}
              containerStyle={{
                position: "absolute",
                right: -18,
                top: 6,
              }}
            />
          </View>
        }
        containerStyle={{
          backgroundColor: "white",
        }}
      />
      <ScrollView style={styles.inner}>
        <SearchBar
          platform={"ios"}
          placeholder={"Type search here..."}
          containerStyle={{
            backgroundColor: "rgba(0,0,0,0)",
            paddingTop: 0,
          }}
          value={searchValue}
          onChangeText={setSearchValue}
          cancelButtonTitle={"Clear"}
          inputContainerStyle={{
            backgroundColor: "#fff",
          }}
          onEndEditing={() => {
            navigation.push("Search", {
              searchValue,
            });
          }}
        />

        <View style={styles.block}>
          <Text
            style={{
              marginLeft: 5,
              color: "gray",
              marginBottom: 5,
            }}
          >
            fashionaholics usually search for:
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {hashtags.map((hashtag) => {
              return (
                <Hashtag
                  key={hashtag._id}
                  hashtag={hashtag}
                  onPress={() => {
                    navigation.push("Search", {
                      searchValue: hashtag.name,
                    });
                  }}
                />
              );
            })}
          </View>
        </View>
        <View style={styles.block}>
          <View>
            <FlatList
              horizontal={true}
              data={BANNER_URLS}
              renderItem={({ item, index }) => {
                return (
                  <View
                    key={`${index}`}
                    style={{
                      marginRight: 10,
                    }}
                  >
                    <Image
                      source={{
                        uri: item,
                        height: 250,
                        width: FULL_WIDTH * 0.75,
                      }}
                    />
                  </View>
                );
              }}
            />
          </View>
        </View>
        <View style={styles.block}>
          <Text style={styles.title}>Best Ratings</Text>
          <View>
            <FlatList
              horizontal={true}
              data={bestRatingProducts}
              renderItem={({ item, index }) => {
                return <SearchItem item={item} />;
              }}
            />
          </View>
        </View>

        <View style={styles.block}>
          <Text style={styles.title}>Featured Brands</Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
              paddingBottom: 50,
            }}
          >
            {localBrands.map((item) => (
              <Brand key={item._id} data={item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  inner: {
    padding: 10,
    backgroundColor: "white",
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 10,
  },
  block: {
    marginBottom: 20,
  },
});
