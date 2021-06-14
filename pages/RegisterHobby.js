import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { Card, Text, Input } from "react-native-elements";

import { localbrandApi } from "../api/localbrand";
const RegisterHobby = (props) => {
  const navigation = props.navigation;

  const [job, setJob] = useState("");
  const [hobby, setHobby] = useState("");
  const [localBrands, setLocalBrands] = useState();

  const jobInputHandler = (job) => {
    setJob(job);
  };

  const hobbyInputHandler = (hobby) => {
    setHobby(hobby);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Hobby Routine",
    });
  }, [navigation]);

  useEffect(() => {
    async function fetchLocalBrands() {
      try {
        const res = await localbrandApi.getLocalbrands();
        setLocalBrands(res.data.localBrands);
      } catch (err) {
        Alert.alert("Something went wrong", "Sever errors!");
      }
    }
    fetchLocalBrands();
  }, []);

  const renderItem = (ItemData) => {
    return (
      <View>
        <Text>{ItemData.item.name}</Text>
        <Text>{ItemData.item.address}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.introduction}>
        <Text h4 style={{ fontWeight: "bold" }}>
          NOW, ALL ABOUT YOUR LIFESTYLE
        </Text>
        <Text>
          <Text>We will know what activities you're into {"\n"}</Text>
          <Text style={{ fontWeight: "bold" }}>
            to provide suitable outfits.
          </Text>
        </Text>
      </View>

      <Card>
        <Input
          inputContainerStyle={styles.input}
          placeholder="What's your job?"
          value={job}
          onChangeText={jobInputHandler}
        />
        <Input
          inputContainerStyle={styles.input}
          placeholder="Text here your most favorite hobby!"
          value={hobby}
          onChangeText={hobbyInputHandler}
        />
      </Card>
      <Card>
        <View>
          <Text>Any localbrands below familiar with?</Text>
        </View>
      </Card>
      <FlatList data={localBrands} renderItem={renderItem} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  introduction: {
    width: "100%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    paddingLeft: 10,
    width: "100%",
  },
});

export default RegisterHobby;
