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
import { FULL_WIDTH } from "../constants/styles";

const RegisterBody = (props) => {
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
    user = {
      ...user,
      gender: gender,
      hobby: hobby,
      job: job,
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
      Alert.alert("Failed", errorMsg);
    } else {
      Alert.alert(
        "Register Successfully",
        "You will be navigated automatically to Login!"
      );
      setTimeout(() => {
        props.navigation.navigate("Login");
      }, 2000);
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
      <View style={styles.introduction}>
        <Text h4 style={{ fontWeight: "bold" }}>
          NOW IS YOUR TURN
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
      <ImageBackground
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/local-runway-image.appspot.com/o/media%2Fhobby.png?alt=media&token=32b484ef-aa0c-4589-a1e1-6a989cea31be",
        }}
        style={{ width: FULL_WIDTH, height: 450 }}
      >
        <ScrollView style={{ height: "70%", marginTop: "15%" }}>
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

          {/* <Image
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/local-runway-image.appspot.com/o/media%2Fregister-quote.png?alt=media&token=0347aa44-367f-4e93-8e81-4669525c582a",
          }}
          style={{ width: FULL_WIDTH, height: FULL_HEIGHT }}
        /> */}
        </ScrollView>
      </ImageBackground>

      <View
        style={{
          height: "10%",
          flexDirection: "row",
          justifyContent: "center",
          paddingTop: 10,
        }}
      >
        <Button
          title="Submit"
          buttonStyle={{
            borderWidth: 1,
            borderColor: "#000000",
            width: 150,
            backgroundColor: "#000000",
            marginHorizontal: 10,
            backgroundColor: "#f5f5f5",
          }}
          titleStyle={{
            color: "#000000",
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
    marginBottom: "5%",
  },
  input: {
    borderWidth: 1,
    paddingLeft: 10,
    width: "100%",
  },
});

export default RegisterBody;
