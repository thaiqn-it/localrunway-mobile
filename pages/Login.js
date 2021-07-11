import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  ImageBackground,
} from "react-native";
import { Button, Divider, Image, Input, Text } from "react-native-elements";
import {
  FULL_HEIGHT,
  FULL_WIDTH,
  PRIMARY_COLOR,
  PRIMARY_FONT,
} from "../constants/styles";
import { customerApi } from "../api/customer";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { JWT_TOKEN, JWT_TOKEN_KEY, resetJWTToken } from "../constants";
import * as Facebook from "expo-facebook";
import { loadToken } from "../api";
import bgImage from "../assets/splash-none-text.png";
import { registerForPushNotificationsAsync } from "../components/PushNotification";

export default function Login(props) {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    resetJWTToken().then(async (token) => {
      if (token) {
        await loadToken();
        // return; // test
        await pushNotification();
        navigation.navigate("HomeTab");
      }
    });
  }, []);

  const pushNotification = async () => {
    const pushToken = await registerForPushNotificationsAsync();
    customerApi.setExpoPushToken(pushToken).then(() => {
      console.log("Push Token successfully");
    });
  };

  const login = async () => {
    setLoginLoading(true);
    try {
      const res = await customerApi.login(phoneNumber, password);
      await SecureStore.setItemAsync(JWT_TOKEN_KEY, res.data.token);
      await loadToken();
      await pushNotification();
      navigation.navigate("HomeTab");
    } catch (err) {
      Alert.alert("Login Status", "Wrong phone number or password");
    } finally {
      setLoginLoading(false);
    }
  };

  const loginByFacebook = async () => {
    try {
      await Facebook.initializeAsync({
        appId: "2943143719307860",
      });
      const { token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });

      const res = await customerApi.loginWithFacebook({
        access_token: token,
      });
      await SecureStore.setItemAsync(JWT_TOKEN_KEY, res.data.token);
      await loadToken();
      await pushNotification();
      navigation.navigate("HomeTab");
    } catch ({ message }) {
      Alert.alert("Login Status", `Fail to login with Facebook`);
    }
  };

  const registerHanlder = () => {
    props.navigation.navigate("RegisterStack");
  };

  return (
    <View>
      <ImageBackground
        style={{
          width: FULL_WIDTH,
          height: FULL_HEIGHT,
        }}
        source={bgImage}
      >
        <View style={styles.container}>
          <View
            style={{
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <View
              style={{
                shadowOpacity: 0.6,
                shadowRadius: 8,
              }}
            >
              <Image
                source={require("../assets/local-runway-icon.png")}
                style={{
                  width: 150,
                  height: 150,
                }}
              />
            </View>
            <Text
              h3
              style={{
                fontWeight: "bold",
                marginTop: 20,
                fontFamily: PRIMARY_FONT,
              }}
            >
              Discover the new you
            </Text>
          </View>
          <KeyboardAvoidingView
            style={{
              marginTop: 20,
              padding: 20,
            }}
          >
            <Input
              placeholder={"Phone Number"}
              keyboardType={"numbers-and-punctuation"}
              inputContainerStyle={styles.inputContainer}
              onChangeText={setPhoneNumber}
              value={phoneNumber}
            />
            <Input
              secureTextEntry={!showPassword}
              inputContainerStyle={styles.inputContainer}
              placeholder={"Password"}
              onChangeText={setPassword}
              value={password}
              rightIcon={{
                type: "font-awesome-5",
                name: showPassword ? "eye" : "eye-slash",
                onPress: (e) => {
                  setShowPassword(!showPassword);
                },
              }}
            />
            <Button
              title={"Login"}
              onPress={login}
              loading={loginLoading}
              buttonStyle={{
                padding: 15,
                backgroundColor: PRIMARY_COLOR,
              }}
              titleStyle={{
                fontFamily: PRIMARY_FONT,
              }}
            />
            <Text
              h4
              style={{
                textAlign: "center",
                marginVertical: 10,
                fontFamily: PRIMARY_FONT,
              }}
            >
              Or
            </Text>
            <Button
              title={"Continue With Facebook"}
              icon={{
                type: "font-awesome-5",
                name: "facebook",
                color: "white",
              }}
              iconContainerStyle={{
                marginRight: 10,
              }}
              onPress={loginByFacebook}
              buttonStyle={{
                padding: 15,
                backgroundColor: "#3b5998",
              }}
              titleStyle={{
                fontFamily: PRIMARY_FONT,
              }}
            />
            <Button
              title={"Register An Account"}
              onPress={registerHanlder}
              buttonStyle={{
                padding: 15,
                borderWidth: 2,
                backgroundColor: "none",
                borderColor: PRIMARY_COLOR,
              }}
              containerStyle={{
                marginTop: 10,
              }}
              titleStyle={{
                fontFamily: PRIMARY_FONT,
                color: PRIMARY_COLOR,
              }}
            />
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    padding: 10,
    minHeight: FULL_HEIGHT,
    backgroundColor: "rgba(255,255,255, .5)",
  },
  inputContainer: {
    borderBottomColor: PRIMARY_COLOR,
  },
});
