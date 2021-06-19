import React, { useState } from "react";
import { ScrollView } from "react-native";
import { View, StyleSheet } from "react-native";
import { Text, Button, Card, CheckBox } from "react-native-elements";
import BodySlider from "../components/BodySlider";

const RegisterBody = (props) => {
  const user = props.route.params.user;
  const navigation = props.navigation;

  const [heightValue, setHeightValue] = useState(0);
  const [weightValue, setWeightValue] = useState(0);
  const [bustValue, setBustValue] = useState(0);
  const [waistValue, setWaistValue] = useState(0);
  const [hipValue, setHipValue] = useState(0);

  const [isMale, setIsMale] = useState(false);
  const [isFemale, setIsFemale] = useState(false);
  const [isOther, setIsOther] = useState(false);
  const [gender, setGender] = useState("");

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Body Measurements",
    });
  }, [navigation]);

  const submitHandler = () => {
    props.navigation.navigate("RegisterHobby", {
      user: {
        ...user,
        height: heightValue,
        weight: weightValue,
        bust: bustValue,
        waist: waistValue,
        hip: hipValue,
        gender: gender,
      },
    });
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
          WE HELP YOU FIND THE RIGHT SIZE
        </Text>
        <Text>
          <Text>We calculate the perfect fit based on {"\n"}</Text>
          <Text style={{ fontWeight: "bold" }}> your unique measurements.</Text>
        </Text>
      </View>

      <ScrollView style={{ height: "80%" }}>
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
        <BodySlider
          title={"Height (cm):"}
          maxValue={250}
          value={heightValue}
          onStretch={setHeightValue}
          result={"Your Height: " + heightValue + " cm"}
        />

        <BodySlider
          title={"Weight (kg):"}
          maxValue={200}
          value={weightValue}
          onStretch={setWeightValue}
          result={"Your Weight: " + weightValue + " kg"}
        />

        <BodySlider
          title={"Bust (cm):"}
          maxValue={150}
          value={bustValue}
          onStretch={setBustValue}
          result={"Your Bust: " + bustValue + " cm"}
        />

        <BodySlider
          title={"Waist (cm):"}
          maxValue={100}
          value={waistValue}
          onStretch={setWaistValue}
          result={"Your Waist: " + waistValue + " cm"}
        />

        <BodySlider
          title={"Hip (cm):"}
          maxValue={100}
          value={hipValue}
          onStretch={setHipValue}
          result={"Your Hip: " + hipValue + " cm"}
        />
      </ScrollView>

      <View
        style={{
          height: "10%",
          flexDirection: "row",
          justifyContent: "center",
          paddingTop: 10,
        }}
      >
        <Button
          title="Next"
          buttonStyle={{
            borderWidth: 1,
            borderColor: "#000000",
            width: 150,
            backgroundColor: "#000000",
            marginHorizontal: 10,
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
  },
});

export default RegisterBody;
