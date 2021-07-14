import React, { useState } from "react";
import { Keyboard } from "react-native";
import { Alert } from "react-native";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { FULL_HEIGHT, FULL_WIDTH } from "../constants/styles";

const RegisterPhone = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const onChangePhoneNumberHandler = (phoneNumber) => {
    setPhoneNumber(phoneNumber);
  };

  const onSubmitHanlder = (event) => {
    if (phoneNumber.length === 0) {
      Alert.alert("Please input your phone number!");
    } else {
      //navigation
      let user = {
        phoneNumber: phoneNumber,
      };
      props.navigation.navigate("Register", {
        user: user,
      });
    }
  };

  //setTitle
  const navigation = props.navigation;
  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: "Phone Number",
  //   });
  // }, [navigation]);

  return (
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={9}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView>
          <ImageBackground
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/local-runway-image.appspot.com/o/registerPhone04.png?alt=media&token=8671f0f8-f516-4ad5-b481-4572160e0e7e",
            }}
            style={{ width: FULL_WIDTH, height: FULL_HEIGHT }}
          >
            <View style={styles.introduction}>
              <Text h4 style={{ fontWeight: "bold" }}>
                WELCOME TO LOCALRUNWAY
              </Text>
              <Text style={{ textAlign: "center" }}>
                <Text>Please input your phone number to continue {"\n"}</Text>
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.cardContainer}>
                <Input
                  multiline={false}
                  inputContainerStyle={styles.input}
                  placeholder="Phone number*"
                  maxLength={12}
                  value={phoneNumber}
                  onChangeText={onChangePhoneNumberHandler}
                  keyboardType="numeric"
                />
                <Button
                  onPress={onSubmitHanlder}
                  title="Next"
                  buttonStyle={{
                    borderWidth: 1,
                    borderColor: "#000000",
                    width: 200,
                    backgroundColor: "#000000",
                    height: 45,
                  }}
                  containerStyle={{
                    marginVertical: 10,
                    flexDirection: "row",
                    justifyContent: "center",
                    textAlign: "center",
                    width: "100%",
                  }}
                  titleStyle={{
                    color: "#fff",
                  }}
                />
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  inputContainer: {
    marginTop: 4,
    height: "70%",
    justifyContent: "center",
    width: "100%",
  },
  cardContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    height: 150,
    justifyContent: "center",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    borderRadius: 8,
    opacity: 0.85,
  },

  input: {
    borderWidth: 1,
    paddingLeft: 10,
    width: "100%",
  },

  action: {
    height: "20%",
  },
});

export default RegisterPhone;
