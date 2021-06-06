import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  Alert,
} from "react-native";
import { Image, Input, Button, SocialIcon } from "react-native-elements";
import {
  PRIMARY_COLOR_WHITE,
  PRIMARY_COLOR_BLACK,
  FULL_HEIGHT,
} from "../constants/styles";
import getEnvVars from "../config";
import { customerApi } from "../apis/customer";
import * as SecureStore from "expo-secure-store";
import { TOKEN_ID } from "../constants/token";

const { API_URI } = getEnvVars();
const Login = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmed, setConfirmed] = useState("false");
  const [check, setCheck] = useState("");
  

  const inputPhonenumberHandler = (inputedPhonenumber) => {
    setPhonenumber(inputedPhonenumber);
  };
  const inputPasswordHandler = (inputedPassword) => {
    setPassword(inputedPassword);
  };

  const resetInputHandler = () => {
    setPhonenumber('');
    setPassword('');
    setConfirmed(false);
  };

  const validateHandler = () => {
    if (
      isNaN(phonenumber) ||
      phonenumber.length < 10 ||
      phonenumber.length > 13
    ) {
      Alert.alert(
        "Invalid length!",
        "Phonenumber must be grater than 10 and lower than 13",
        [{ text: "Okay", style: "cancel", onPress: resetInputHandler }]
      );
      return;
    } else if (isNaN(password) || password.length < 6) {
      Alert.alert("Invalid length!", "Password must be grater than 6 chars", [
        { text: "Okay", style: "cancel", onPress: resetInputHandler },
      ]);
      return;
    }
  };

  async function goHome(value) {
    await SecureStore.setItemAsync(TOKEN_ID,value);
    // Navigation to screen
    //navigation.navigate()
  }

  const loginHandler = () => {

    // validateHandler();
    customerApi.login(phonenumber,password)
                      .then((res) => {
                        goHome(res.data.token)
                      }).catch(err => {
                        console.log(err)
                      })  
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconHeaderContainer}>
        <Image
          source={require("../assets/local-runway-icon.png")}
          style={{ width: 230, height: 220 }}
          // PlaceholderContent={<ActivityIndicator />}
        />
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.bodyContainer}
        >
          <View>
            <View style={styles.bodyHeaderContainer}>
              <Text style={styles.bodyHeader}>Log In</Text>
            </View>
            <Input
              placeholder="Phone number"
              leftIcon={{
                type: "font-awesome",
                name: "phone",
                color: PRIMARY_COLOR_BLACK,
              }}
              keyboardType={"numeric"}
              underlineColor={PRIMARY_COLOR_BLACK}
              leftIconContainerStyle={{ marginHorizontal: 10 }}
              inputContainerStyle={styles.input}
              onChangeText={inputPhonenumberHandler}
              defaultValue={phonenumber}
            />

            <Input
              inputContainerStyle={styles.input}
              secureTextEntry={!showPassword}
              // mode={"outlined"}
              placeholder={"Password"}
              leftIcon={{
                type: "font-awesome",
                name: "lock",
                color: PRIMARY_COLOR_BLACK,
              }}
              leftIconContainerStyle={{ marginHorizontal: 10 }}
              rightIcon={{
                type: "font-awesome-5",
                name: showPassword ? "eye" : "eye-slash",
                color: PRIMARY_COLOR_BLACK,
                onPress: () => {
                  setShowPassword(!showPassword);
                },
              }}
              rightIconContainerStyle={{ marginLeft: 10 }}
              onChangeText={inputPasswordHandler}
              defaultValue={password}
            />
            <View style={styles.forgotPwContainer}>
              <Pressable
                onPress={() => console.log("Press from forgot password")}
              >
                <Text style={{ textDecorationLine: "underline" }}>
                  Forgot password?
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.loginContainer}>
            <View style={styles.buttonContainer}>
              <Button
                title="Login"
                buttonStyle={styles.button}
                onPress={loginHandler}
              />
            </View>

            <View style={styles.signIn}>
              <Text style={styles.signInText}>Or Sign in with</Text>
            </View>

            <View style={styles.socialIconContainer}>
              <SocialIcon
                type={"facebook"}
                onPress={() => console.log("Press From facebook")}
              />
              <SocialIcon
                type={"google"}
                onPress={() => console.log("Press From google")}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: PRIMARY_COLOR_BLACK,
  },
  iconHeaderContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
  },
  bodyContainer: {
    width: "100%",
    marginTop: -20,
    paddingTop: 10,
    height: FULL_HEIGHT,
    backgroundColor: PRIMARY_COLOR_WHITE,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  bodyHeaderContainer: {
    marginTop: 10,
  },
  bodyHeader: {
    fontSize: 40,
    fontWeight: "bold",
    color: PRIMARY_COLOR_BLACK,
    marginLeft: 10,
    marginBottom: 5,
    paddingTop: -20,
  },
  input: {
    backgroundColor: PRIMARY_COLOR_WHITE,
    marginTop: 5,
    borderWidth: 1,
  },
  forgotPwContainer: {
    marginTop: -18,
    marginLeft: 10,
  },
  loginContainer: {
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    width: 100,
    backgroundColor: PRIMARY_COLOR_BLACK,
  },
  signIn: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 10,
  },
  signInText: {
    color: PRIMARY_COLOR_BLACK,
    fontWeight: "bold",
  },
  socialIconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 2,
    marginTop: 10,
  },
});

export default Login;
