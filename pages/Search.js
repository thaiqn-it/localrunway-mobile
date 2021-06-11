import React, { useState } from "react";
import { View } from "react-native";
import { Header, Icon, SearchBar } from "react-native-elements";
import { PRIMARY_COLOR } from "../constants/styles";

export default function Search() {
  const [searchValue, setSearchValue] = useState("");
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
            placeholder={"Type search Here..."}
            containerStyle={{
              backgroundColor: "rgba(0,0,0,0)",
            }}
            value={searchValue}
            onChangeText={setSearchValue}
            inputContainerStyle={{
              backgroundColor: PRIMARY_COLOR,
            }}
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
    </View>
  );
}
