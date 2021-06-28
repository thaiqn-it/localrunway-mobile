import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { Card, Header, SearchBar, Text } from "react-native-elements";
import { FULL_HEIGHT, PRIMARY_FONT } from "../constants/styles";
import { localBrandApi } from "../api/localbrand";
import { hashtagApi } from "../api/hashtag";
import Hashtag from "../components/Hashtag";
import { useNavigation } from "@react-navigation/native";

const Brand = ({ data }) => {
  const DEFAULT_WIDTH = 100;
  return (
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
            fontFamily: PRIMARY_FONT,
            fontSize: 10,
            textAlign: "center",
          }}
        >
          {data.name}
        </Text>
      </View>
    </View>
  );
};

export default function Feed() {
  const [localBrands, setLocalBrands] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    localBrandApi.getAll().then((res) => {
      setLocalBrands(res.data.localBrands);
    });
    hashtagApi.getAll().then((res) => {
      setHashtags(res.data.hashtags);
    });
  }, []);

  return (
    <View>
      <Header
        centerComponent={{
          text: "Home",
          style: {
            fontWeight: "bold",
          },
        }}
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
          cancelButtonTitle={"Clear"}
          inputContainerStyle={{
            backgroundColor: "#fff",
          }}
        />

        <View style={styles.block}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {hashtags.map((hashtag) => {
              return <Hashtag hashtag={hashtag} />;
            })}
          </View>
        </View>
        <View style={styles.block}>
          <Text style={styles.title}>Best Ratings</Text>
        </View>
        <View style={styles.block}>
          <Text style={styles.title}>Brands</Text>
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
    marginBottom: 20,
  },
  block: {
    marginBottom: 20,
  },
});
