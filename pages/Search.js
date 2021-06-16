import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import {
  Avatar,
  Header,
  Icon,
  ListItem,
  SearchBar,
  Text,
} from "react-native-elements";
import { productApi } from "../api/product";
import { vndFormat } from "../utils";
import SearchItem from "../components/SearchItem";

export default function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setSearch(true);
  }, []);

  useEffect(() => {
    if (search) {
      setLoading(true);
      productApi
        .search({
          queryValue: searchValue,
          page,
        })
        .then((res) => {
          const data = res.data;
          const newProducts = data.products.filter((x) => {
            return !products.find((y) => y._id === x._id);
          });
          setProducts([...products, ...newProducts]);
          setPage(data.page);
          setHasNextPage(data.hasNextPage);
        })
        .finally(() => {
          setLoading(false);
          setSearch(false);
        });
    }
  }, [search]);

  const loadMore = async () => {
    if (hasNextPage) {
      setPage(page + 1);
      setSearch(true);
    }
  };
  const finishSearch = async () => {
    setProducts([]);
    setLoading(true);
    setPage(1);
    setSearch(true);
  };

  const renderItem = ({ item }) => <SearchItem item={item} />;
  return (
    <View>
      <Header
        containerStyle={{
          backgroundColor: "#fff",
          shadowRadius: 10,
          shadowOpacity: 0.2,
        }}
        centerComponent={
          <SearchBar
            platform={"ios"}
            placeholder={"Type search here..."}
            containerStyle={{
              backgroundColor: "rgba(0,0,0,0)",
            }}
            value={searchValue}
            onChangeText={setSearchValue}
            cancelButtonTitle={"Clear"}
            inputContainerStyle={{
              backgroundColor: "#fff",
            }}
            onEndEditing={finishSearch}
          />
        }
        leftContainerStyle={{
          flex: 0,
        }}
        centerContainerStyle={{
          flex: 7,
        }}
        rightComponent={<Icon name={"sliders-h"} type={"font-awesome-5"} />}
        rightContainerStyle={{
          flex: 1,
          justifyContent: "center",
        }}
      />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={products}
          contentContainerStyle={{
            paddingBottom: 180,
          }}
          onEndReachedThreshold={0.1}
          renderItem={renderItem}
          onEndReached={loadMore}
          keyExtractor={(item) => item._id}
          ListFooterComponent={() => {
            return loading ? <ActivityIndicator /> : null;
          }}
          ListFooterComponentStyle={{
            paddingVertical: 10,
          }}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    height: Dimensions.get("window").height,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
