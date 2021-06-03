import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import { Image, Input, Button, SocialIcon } from "react-native-elements";
import {
  PRIMARY_COLOR_WHITE,
  PRIMARY_COLOR_BLACK,
  FULL_HEIGHT,
} from "../constants/styles";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
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
              // onChangeText={}
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
              <Button title="Login" buttonStyle={styles.button} />
            </View>

            <View style={styles.signIn}>
              <Text style={styles.signInText}>Or Sign in with</Text>
            </View>

            <View style={styles.socialIconContainer}>
              <SocialIcon type={"facebook"} onPress={() => console.log('Press From facebook')} />
              <SocialIcon type={"google"} onPress={() => console.log('Press From google')} />
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
    backgroundColor: PRIMARY_COLOR_BLACK
  },
  iconHeaderContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
  },
  bodyContainer: {
    width: "100%",
    marginTop: 10,
    height: FULL_HEIGHT,
    backgroundColor: PRIMARY_COLOR_WHITE,
    borderTopRightRadius: 30,
  },
  bodyHeaderContainer: {
    marginTop: 10,
  },
  bodyHeader: {
    fontSize: 40,
    fontWeight: "bold",
    color: PRIMARY_COLOR_BLACK,
    marginLeft: 2,
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
  },
});

export default Login;
