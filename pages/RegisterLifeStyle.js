import React, { useState } from "react";
import { ScrollView, Alert } from "react-native";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from "react-native";
import { Text, Button, Card, CheckBox, Input } from "react-native-elements";
import { customerApi } from "../api/customer";
import { FULL_HEIGHT, FULL_WIDTH } from "../constants/styles";

const RegisterLifeStyle = (props) => {
  const user = props.route.params.user;
  const navigation = props.navigation;

  const [isMale, setIsMale] = useState(false);
  const [isFemale, setIsFemale] = useState(false);
  const [isOther, setIsOther] = useState(false);
  const [gender, setGender] = useState("");
  const [job, setJob] = useState("");
  const [hobby, setHobby] = useState("");

  const jobInputHandler = (job) => {
    setJob(job);
  };

  const hobbyInputHandler = (hobby) => {
    setHobby(hobby);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Find Your Style",
    });
  }, [navigation]);

  const submitHandler = async () => {
    let user = props.route.params.user;

    if (gender.length !== 0) {
      user = {
        ...user,
        gender: gender,
      };
    }

    if (hobby.length !== 0) {
      user = {
        ...user,
        hobby: hobby,
      };
    }

    if (job.length !== 0) {
      user = {
        ...user,
        job: job,
      };
    }

    console.log(user);

    //api goes here
    let errorMsgLifeStyle = "";
    let errorMsgInfor = "";
    let errorMsgPhoneNumber = "";
    try {
      await customerApi.register(user);
    } catch (err) {
      if (err.response.data.errorParams.phoneNumber) {
        errorMsgPhoneNumber = errorMsgPhoneNumber.concat(
          err.response.data.errorParams.phoneNumber
        );
      }

      if (err.response.data.errorParams.email) {
        errorMsgInfor = errorMsgInfor.concat(
          `\n` + err.response.data.errorParams.email
        );
      }

      if (err.response.data.errorParams.password) {
        errorMsgInfor = errorMsgInfor.concat(
          `\n` + err.response.data.errorParams.password
        );
      }

      if (err.response.data.errorParams.name) {
        errorMsgInfor = errorMsgInfor.concat(
          `\n` + err.response.data.errorParams.name
        );
      }

      if (err.response.data.errorParams.gender) {
        errorMsgLifeStyle = errorMsgLifeStyle.concat(
          `\n` + err.response.data.errorParams.gender
        );
      }
    }

    if (errorMsgLifeStyle) {
      Alert.alert("Failed", errorMsgLifeStyle);
    } else if (errorMsgInfor) {
      Alert.alert("Failed", errorMsgInfor, [
        {
          text: "Go Back",
          onPress: () => {
            props.navigation.navigate("Register");
          },
        },
        {
          text: "OK",
          onPress: () => {
            props.navigation.navigate("Register");
          },
        },
      ]);
    } else if (errorMsgPhoneNumber) {
      Alert.alert("Failed", errorMsgPhoneNumber, [
        {
          text: "Go Back",
          onPress: () => {
            props.navigation.navigate("RegisterPhone");
          },
        },
        {
          text: "OK",
          onPress: () => {
            props.navigation.navigate("RegisterPhone");
          },
        },
      ]);
    } else {
      Alert.alert(
        "Register Successfully",
        "You will be navigated automatically to Login!"
      );
      setTimeout(() => {
        props.navigation.navigate("Login");
      }, 3000);
    }
  };

  const maleChoice = () => {
    setIsMale(true);
    setIsOther(false);
    setIsFemale(false);
    setGender("MALE");
  };

  const femaleChoice = () => {
    setIsMale(false);
    setIsOther(false);
    setIsFemale(true);
    setGender("FEMALE");
  };

  const otherChoice = () => {
    setIsMale(false);
    setIsOther(true);
    setIsFemale(false);
    setGender("OTHER");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/local-runway-image.appspot.com/o/hobby05.png?alt=media&token=35f06a1b-9fe2-4fcc-a882-a49703f3e9e7",
        }}
        style={{ width: FULL_WIDTH, height: FULL_HEIGHT }}
      >
        <View style={{ marginTop: 60 }}>
          <View style={styles.introduction}>
            <Text h4 style={{ fontWeight: "bold" }}>
              NOW IT'S YOUR TURN
            </Text>
            <Text style={{ textAlign: "center" }}>
              <Text>We will know what activities you're into {"\n"}</Text>
              <Text>to </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  flexDirection: "row",
                }}
              >
                provide suitable outfits.
              </Text>
            </Text>
          </View>

          <ScrollView style={{ height: "70%", marginTop: "5%" }}>
            <Card>
              <Text>Your Gender: </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  width: "100%",
                  marginRight: 20,
                }}
              >
                <CheckBox
                  center
                  title="Male"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={isMale}
                  containerStyle={{ width: "29%" }}
                  onPress={maleChoice}
                />
                <CheckBox
                  center
                  title="Female"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  containerStyle={{ width: "29%" }}
                  checked={isFemale}
                  onPress={femaleChoice}
                />
                <CheckBox
                  center
                  title="Other"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  containerStyle={{ width: "29%" }}
                  checked={isOther}
                  onPress={otherChoice}
                />
              </View>
            </Card>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <Card>
                <Input
                  inputContainerStyle={styles.input}
                  placeholder="Input your job"
                  label="What is your job?"
                  value={job}
                  onChangeText={jobInputHandler}
                />
                <Input
                  inputContainerStyle={styles.input}
                  placeholder="Text here your most favorite hobby!"
                  label="Some of your hobbies?"
                  value={hobby}
                  onChangeText={hobbyInputHandler}
                />
              </Card>
            </TouchableWithoutFeedback>
            <View
              style={{
                height: "20%",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 30,
              }}
            >
              <Button
                title="Submit"
                buttonStyle={{
                  borderWidth: 1,
                  borderColor: "#000000",
                  width: 150,
                  height: 45,
                  marginHorizontal: 10,
                  backgroundColor: "#000000",
                }}
                titleStyle={{
                  color: "#fff",
                }}
                onPress={submitHandler}
              />
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // marginTop: 80,
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

export default RegisterLifeStyle;
