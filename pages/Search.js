import React, { useEffect, useRef, useState } from "react";
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
  Badge,
  Header,
  Icon,
  ListItem,
  SearchBar,
  Text,
} from "react-native-elements";
import { productApi } from "../api/product";
import { vndFormat } from "../utils";
import SearchItem from "../components/SearchItem";
import SearchFilter from "../components/SearchFilter";

export const DEFAULT_FILTER = {
  sort: null,
  brandIds: [],
  categoryId: null,
  prices: [],
};

export default function Search({ route }) {
  const searchBarRef = useRef(null);
  const [searchValue, setSearchValue] = useState(
    route.params?.searchValue ?? ""
  );
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filter, setFilter] = useState({
    ...DEFAULT_FILTER,
    ...(route.params?.passedFilter ?? {}),
  });

  const hasActivateFilter = () => {
    for (let p in filter) {
      if (filter[p] == null) continue;
      if (Array.isArray(filter[p]) && filter[p].length === 0) continue;
      return true;
    }
    return false;
  };

  useEffect(() => {
    setSearch(true);
  }, []);

  useEffect(() => {
    if (search) {
      setLoading(true);
      productApi
        .search({
          type: "DP",
          queryValue: searchValue,
          page,
          ...filter,
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
    setPage(1);
    setSearch(true);
  };

  const renderItem = ({ item }) => <SearchItem item={item} />;

  return (
    <View>
      <SearchFilter
        visible={filterVisible}
        setVisible={setFilterVisible}
        filter={filter}
        setFilter={setFilter}
        doneFilter={finishSearch}
      />
      <Header
        containerStyle={{
          backgroundColor: "#fff",
          shadowRadius: 10,
          shadowOpacity: 0.2,
        }}
        centerComponent={
          <SearchBar
            ref={searchBarRef}
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
        rightComponent={
          <View>
            <Icon
              name={"sliders-h"}
              type={"font-awesome-5"}
              onPress={() => {
                setFilterVisible(!filterVisible);
              }}
            />
            {hasActivateFilter() && (
              <Badge
                status={"success"}
                containerStyle={{
                  position: "absolute",
                  top: -1,
                  right: -4,
                }}
              />
            )}
          </View>
        }
        rightContainerStyle={{
          flex: 1,
          justifyContent: "center",
        }}
      />
      {!loading && products.length === 0 && (
        <Text
          style={{
            textAlign: "center",
            marginTop: 10,
          }}
        >
          No matches found
        </Text>
      )}
      <View style={styles.container}>
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
      </View>
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
