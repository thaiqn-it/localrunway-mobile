import React, { useState } from "react";
import { Keyboard } from "react-native";
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

const Register = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  //setTitle
  const navigation = props.navigation;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Register",
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={5}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
        <ScrollView style={styles.container}>
          <View style={styles.continueContainer}>
            <Button
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
                marginVertical: 15,
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
              multiline={false}
              inputContainerStyle={styles.input}
              placeholder="Phone number*"
              maxLength={12}
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
            />
            <Input
              inputContainerStyle={styles.input}
              placeholder="Email Address"
            />

            <Input
              inputContainerStyle={styles.input}
              placeholder="First Name"
            />
            <Input inputContainerStyle={styles.input} placeholder="Last Name" />
            <Input inputContainerStyle={styles.input} placeholder="Adress" />
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
              onPress={() => props.navigation.navigate("RegisterBody")}
              title="Sign Up"
              buttonStyle={{
                borderWidth: 1,
                borderColor: "#000000",
                width: 300,
                backgroundColor: "#000000",
              }}
              containerStyle={{
                marginVertical: 15,
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
    marginTop: 10,
    height: "60%",
  },
  action: {
    height: "15%",
  },
});

export default Register;
