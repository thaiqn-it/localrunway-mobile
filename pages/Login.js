import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Easing,
  StyleSheet,
  View,
  Animated,
  Image,
} from "react-native";
import {
  CLEAR_COLOR,
  COLD_COLOR,
  defaultStyles,
} from "../constants/styles";
import {
  Input,
  Text,
  Button,
  SocialIcon,
  BottomSheet,
  ListItem,
} from "react-native-elements";


const ForgotPasswordSheet = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const list = [
    { title: "List Item 1" },
    { title: "List Item 2" },
    {
      title: "Cancel",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => setIsVisible(false),
    },
  ];
  return (
    <BottomSheet
      isVisible={isVisible}
      containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.2)" }}
    >
      {list.map((l, i) => (
        <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
          <ListItem.Content>
            <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </BottomSheet>
  );
};
export default function Login({ navigation }) {
  const loginViewBottom = useRef(new Animated.Value(-300)).current;
  const [showPassword, setShowPassword] = useState(false);

  const [userPhone, setPhone] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const changePhoneHandler = (inputedPhone) => {
    setPhone(inputedPhone);
  };

  const changePasswordHandler = (inputedPassword) => {
    setUserPassword(inputedPassword);
  }

  const goToHome = () => {
    navigation.navigate("HomeTab");
  };

  React.useEffect(() => {
    Animated.timing(loginViewBottom, {
      toValue: 0,
      duration: 1000,
      easing: Easing.bounce,
    }).start();
    // goToHome() // test
  }, []);

  const [open, setOpen] = useState(false);

  const handleSubmitPress = () => {
    // setErrortext('');
    if (!userPhone) {
      alert('Please fill PhoneNumber');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    let dataToSend = {phoneNumber: userPhone, password: userPassword};

    let formBody = [];

    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join(',');
    //api url
    fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
            //toDo
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <View behavior={"padding"} style={styles.container}>
      <View style={styles.greetContainer}>
        <View style={styles.greetTitle}>
          <Image
            source={require("../assets/main-icon.png")}
            style={{ width: 200, height: 200 }}
          />
        </View>
      </View>
      <Animated.View
        style={{
          ...styles.loginContainer,
          bottom: loginViewBottom,
          left: loginViewBottom,
        }}
      >
        <Text h2 style={styles.loginTitle}>
          Sign In
        </Text>
        <KeyboardAvoidingView
          style={styles.loginInputContainer}
          behavior={"padding"}
          keyboardVerticalOffset={10}
        >
          <Input
            value={userPhone}
            onChangeText={changePhoneHandler}
            style={styles.input}
            mode={"outlined"}
            placeholder={"Phone Number"}
            underlineColor={"red"}
            keyboardType={"numbers-and-punctuation"}
          />
          <Input
            value={userPassword}
            onChangeText={changePasswordHandler}
            style={styles.input}
            secureTextEntry={!showPassword}
            mode={"outlined"}
            placeholder={"Password"}
            rightIcon={{
              type: "font-awesome-5",
              name: showPassword ? "eye" : "eye-slash",
              color: COLD_COLOR,
              onPress: () => {
                setShowPassword(!showPassword);
              },
            }}
          />
        </KeyboardAvoidingView>
        <View style={styles.loginActionContainer}>
          <Text
            style={{
              textAlign: "right",
              fontWeight: "bold",
              color: COLD_COLOR,
            }}
          >
            Forgot Password?
          </Text>
          <Button
            title={"Login"}
            buttonStyle={defaultStyles.button}
            titleStyle={defaultStyles.buttonTitle}
            // onPress={goToHome}
            onPress={handleSubmitPress}
          />

          <View style={styles.socialContainer}>
            <Text>Or sign in using your social accounts: </Text>
            <View style={styles.socialIcons}>
              <SocialIcon type={"facebook"} />
              <SocialIcon type={"google"} />
            </View>
          </View>
        </View>
        <View style={styles.skipContainer}>
          <Button
            title={"Skip"}
            onPress={goToHome}
            icon={{
              type: "font-awesome-5",
              name: "paw",
              color: COLD_COLOR,
            }}
            buttonStyle={[defaultStyles.button]}
            titleStyle={defaultStyles.buttonTitle}
          />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    // marginTop: 15,
    backgroundColor: "black",
  },
  socialIcons: {
    flexDirection: "row",
  },
  loginTitle: {
    marginLeft: 10,
    color: COLD_COLOR,
    fontWeight: "bold",
  },
  socialContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  loginActionContainer: {
    marginTop: 10,
  },
  skipButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  greetContainer: {
    marginTop: -20,
  },
  skipContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  input: {
    backgroundColor: CLEAR_COLOR,
    marginTop: 5,
  },
  loginContainer: {
    padding: 20,
    borderTopLeftRadius: 50,
    backgroundColor: CLEAR_COLOR,
    position: "absolute",
    width: "100%",
    left: 0,
    bottom: "-0%",
    shadowOffset: {},
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  loginInputContainer: {
    marginTop: 20,
  },
  greetTitle: {
    marginTop: 5,
  },
});
