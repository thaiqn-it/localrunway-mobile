import React, { useEffect, useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Alert } from "react-native";
import { Button, Image, Input, Text } from "react-native-elements";
import { PRIMARY_COLOR, PRIMARY_FONT } from "../constants/styles";
import { customerApi } from "../api/customer";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { JWT_TOKEN, JWT_TOKEN_KEY, resetJWTToken } from "../constants";

export default function Login(props) {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    resetJWTToken().then((token) => {
      if (token) {
        navigation.navigate("HomeTab");
      }
    });
  }, []);

  const login = async () => {
    setLoginLoading(true);
    try {
      const res = await customerApi.login(phoneNumber, password);
      await SecureStore.setItemAsync(JWT_TOKEN_KEY, res.data.token);
      navigation.navigate("HomeTab");
    } catch (err) {
      Alert.alert("Login Status", "Wrong phone number or password");
    } finally {
      setLoginLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <View
          style={{
            shadowOpacity: 0.8,
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
          h2
          style={{
            fontWeight: "bold",
            marginTop: 20,
            fontFamily: PRIMARY_FONT,
          }}
        >
          Discover Your Styles.
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
            marginTop: 10,
            fontFamily: PRIMARY_FONT,
          }}
        >
          Or
        </Text>
        <Button
          title={"Register An Account"}
          buttonStyle={{
            padding: 15,
            borderWidth: 1,
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
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
  },
  inputContainer: {
    borderBottomColor: PRIMARY_COLOR,
  },
});
