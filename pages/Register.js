import React, { useRef, useState } from "react";
import { Keyboard } from "react-native";
import { Alert } from "react-native";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { Input, Button, CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Facebook from "expo-facebook";

const Register = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [facebookId, setFacebookId] = useState("");

  const onChangeEmailHandler = (email) => {
    setEmail(email);
  };
  const onChangePhoneNumberHandler = (phoneNumber) => {
    setPhoneNumber(phoneNumber);
  };
  const onChangePasswordHandler = (password) => {
    setPassword(password);
  };
  const onChangeFullNameHandler = (fullName) => {
    setFullName(fullName);
  };
  const onChangeAddressHandler = (address) => {
    setAddress(address);
  };

  const onSubmitHanlder = (event) => {
    if (
      email.length === 0 ||
      phoneNumber.length === 0 ||
      password.length === 0 ||
      fullName.length === 0
    ) {
      Alert.alert("Please input full required fields");
    } else {
      //navigation
      props.navigation.navigate("RegisterBody", {
        user: {
          email: email,
          phoneNumber: phoneNumber,
          password: password,
          name: fullName,
          address: address,
          fb_userId: facebookId,
        },
      });
    }
  };

  const continueWithFacebookHandler = async () => {
    try {
      await Facebook.initializeAsync({
        appId: "319135163220953",
      });

      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email", "user_location"],
      });

      if (type === "success") {
        fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,location`
        )
          .then((response) => response.json())
          .then((data) => {
            setFacebookId(data.id);
            setEmail(data.email);
            setFullName(data.name);
          })
          .catch((e) => console.log(e));
      } else {
        Alert.alert(
          "Message",
          "If you have just canceled, please input full required fields"
        );
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  //setTitle
  const navigation = props.navigation;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Register",
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={4}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView>
          <View style={styles.continueContainer}>
            <Button
              onPress={continueWithFacebookHandler}
              icon={
                <Icon
                  name="facebook-square"
                  size={20}
                  color="#000000"
                  style={{ marginRight: 10 }}
                />
              }
              type="outline"
              title="Continue with Facebook"
              titleStyle={{ color: "#000000" }}
              buttonStyle={{
                borderWidth: 1,
                borderColor: "#000000",
              }}
              containerStyle={{
                marginVertical: 10,
                flexDirection: "row",
                justifyContent: "center",
                textAlign: "center",
                width: "100%",
              }}
            />

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{ flex: 1, height: 0.8, backgroundColor: "#000000" }}
              />
              <View>
                <Text style={{ width: 50, textAlign: "center" }}>Or</Text>
              </View>
              <View
                style={{ flex: 1, height: 0.8, backgroundColor: "#000000" }}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Input
              inputContainerStyle={styles.input}
              placeholder={"Email Address*"}
              value={email}
              onChangeText={onChangeEmailHandler}
            />

            <Input
              multiline={false}
              inputContainerStyle={styles.input}
              placeholder="Phone number*"
              maxLength={12}
              value={phoneNumber}
              onChangeText={onChangePhoneNumberHandler}
            />
            <Input
              inputContainerStyle={styles.input}
              placeholder="Password*"
              secureTextEntry={!showPassword}
              rightIcon={{
                type: "font-awesome-5",
                name: showPassword ? "eye" : "eye-slash",
                onPress: (e) => {
                  setShowPassword(!showPassword);
                },
              }}
              value={password}
              onChangeText={onChangePasswordHandler}
            />
            <Input
              inputContainerStyle={styles.input}
              placeholder="Your Name*"
              value={fullName}
              onChangeText={onChangeFullNameHandler}
            />
            <Input
              inputContainerStyle={styles.input}
              placeholder="Address"
              value={address}
              onChangeText={onChangeAddressHandler}
            />
          </View>

          <View style={styles.action}>
            <View style={styles.actionContent}>
              <CheckBox
                title="By signing up, you agree to the Terms of Service and Privacy Policy"
                checked={isCheckboxChecked}
                onPress={() =>
                  setIsCheckboxChecked(isCheckboxChecked ? false : true)
                }
                containerStyle={{ backgroundColor: "none" }}
                checkedColor="#000000"
              />
            </View>

            <Button
              disabled={isCheckboxChecked ? false : true}
              onPress={onSubmitHanlder}
              title="Next"
              buttonStyle={{
                borderWidth: 1,
                borderColor: "#000000",
                width: 200,
                backgroundColor: "#000000",
              }}
              containerStyle={{
                marginVertical: 10,
                flexDirection: "row",
                justifyContent: "center",
                textAlign: "center",
                width: "100%",
              }}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  continueContainer: {
    width: "100%",
    height: "15%",
  },
  input: {
    borderWidth: 1,
    paddingLeft: 10,
    width: "100%",
  },
  inputContainer: {
    marginTop: 4,
    height: "60%",
  },
  action: {
    height: "20%",
  },
});

export default Register;
