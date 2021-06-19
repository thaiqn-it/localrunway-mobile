import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { Card, Text, Input, Image, Button } from "react-native-elements";
import { customerApi } from "../api/customer";

import { localBrandApi } from "../api/localbrand";
const RegisterHobby = (props) => {
  const navigation = props.navigation;

  const [job, setJob] = useState("");
  const [hobby, setHobby] = useState("");
  const [localBrands, setLocalBrands] = useState();
  const [selectedLocalBrands, setSelectedLocalBrands] = useState([]);

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
        const res = await localBrandApi.getAll();
        setLocalBrands(res.data.localBrands);
      } catch (err) {
        Alert.alert("Something went wrong", "Sever errors!");
      }
    }
    fetchLocalBrands();
  }, []);

  const selectedBrandToggleHandler = (_id) => {
    const isIn = selectedLocalBrands.findIndex((id) => id === _id);
    if (isIn < 0) {
      setSelectedLocalBrands((selectedLocalBrands) => [
        ...selectedLocalBrands,
        _id,
      ]);
    } else {
      let updatedLocalBrands = [...selectedLocalBrands];
      updatedLocalBrands.splice(isIn, 1);
      setSelectedLocalBrands(updatedLocalBrands);
    }
  };

  const submitHandler = async () => {
    let user = props.route.params.user;
    user = {
      ...user,
      job: job,
      hobby: hobby,
      // localBrands: selectedLocalBrands,
      status: "ACTIVE",
    };
    //api goes here
    let errorMsg = "";

    try {
      const response = await customerApi.register(user);
    } catch (err) {
      if (err.response.data.errorParams.phoneNumber) {
        errorMsg = errorMsg.concat(
          `\n` + err.response.data.errorParams.phoneNumber
        );
      }

      if (err.response.data.errorParams.email) {
        errorMsg = errorMsg.concat(`\n` + err.response.data.errorParams.email);
      }

      if (err.response.data.errorParams.password) {
        errorMsg = errorMsg.concat(
          `\n` + err.response.data.errorParams.password
        );
      }

      if (err.response.data.errorParams.name) {
        errorMsg = errorMsg.concat(`\n` + err.response.data.errorParams.name);
      }

      if (err.response.data.errorParams.gender) {
        errorMsg = errorMsg.concat(`\n` + err.response.data.errorParams.gender);
      }

      if (err.response.data.errorParams.height) {
        errorMsg = errorMsg.concat(`\n` + err.response.data.errorParams.height);
      }

      if (err.response.data.errorParams.weight) {
        errorMsg = errorMsg.concat(`\n` + err.response.data.errorParams.weight);
      }
    }

    if (errorMsg) {
      Alert.alert("Error", errorMsg);
    } else {
      Alert.alert("Register Successfully", "You will be navigated to Login!");
      setTimeout(() => {
        props.navigation.navigate("Login");
      }, 2000);
    }
  };

  const checkItemExist = (idToFind) => {
    const isIn = selectedLocalBrands.findIndex((id) => id === idToFind) != -1;
    return isIn;
  };

  const renderItem = (ItemData) => {
    const url = ItemData.item.logoUrl;
    return (
      <TouchableOpacity
        onPress={() => selectedBrandToggleHandler(ItemData.item._id)}
      >
        <View
          style={[
            {
              ...styles.localBrandInforContainer,
            },
            {
              backgroundColor: checkItemExist(ItemData.item._id)
                ? "#918e8e"
                : "#fff",
            },
          ]}
        >
          <Image
            style={styles.tinyLogo}
            source={{
              uri: url,
            }}
          />
          <View style={{ justifyContent: "center", marginLeft: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 17 }}>
              {ItemData.item.name}
            </Text>
            <Text style={{ width: "70%" }} numberOfLines={2}>
              {ItemData.item.address}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
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

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Card containerStyle={{ height: "24%" }}>
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
      </TouchableWithoutFeedback>

      <Card>
        <View>
          <Text>Any localbrands below familiar with?</Text>
        </View>
      </Card>
      <View
        style={{
          alignContent: "center",
          textAlign: "center",
          height: "40%",
        }}
      >
        <FlatList
          data={localBrands}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      </View>
      <View
        style={{ flexDirection: "row", justifyContent: "center", marginTop: 8 }}
      >
        <Button
          title="Sign Up"
          buttonStyle={{
            borderWidth: 1,
            borderColor: "#000000",
            width: 150,
            backgroundColor: "#000000",
            marginHorizontal: 10,
          }}
          onPress={submitHandler}
        />
      </View>
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
  tinyLogo: {
    width: 40,
    height: 40,
  },
  localBrandInforContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 10,
    width: "90%",
    marginHorizontal: 20,
    borderBottomWidth: 1,
    paddingBottom: 2,
  },
});

export default RegisterHobby;
