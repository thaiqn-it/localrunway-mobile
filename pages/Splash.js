import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";

// const { width, height } = Dimensions.get("window");
const Splash = () => {
  const navigation = useNavigation();

  const [isShown, setIsShown] = useState(false);

  const splashTimeoutHandler = () => {
    setTimeout(() => {
      setIsShown(true);
      navigation.navigate("Login");
      return;
    }, 3000);
    
  };

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <View style={styles.container}>
      <Video
        onLoad={splashTimeoutHandler}
        ref={video}
        style={styles.video}
        source={require("../assets/splash-video.mp4")}
        useNativeControls
        resizeMode="contain"
        shouldPlay
        onPlaybackStatusUpdate={() => video.current.playAsync()}
      />
      {/* <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    alignSelf: "center",
    width: 600,
    height: 500,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Splash;
