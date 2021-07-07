import React, { useState } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const Splash = () => {
  const navigation = useNavigation();

  const [isShown, setIsShown] = useState(false);

  const splashTimeoutHandler = () => {
    setTimeout(() => {
      setIsShown(true);
      navigation.navigate("Login");
      return;
    }, 2500);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/splash-screen-reformat.png")}
        style={styles.image}
        onLoad={splashTimeoutHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  image: {
    height: height,
    width: width,
    resizeMode: "contain",
  },
});
export default Splash;
