import React, { useState, useEffect } from "react";
import { BackHandler } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { View, Text, StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";

import GameButton from "../components/GameButton";

interface Props {
  navigation: NavigationStackProp;
}

const ExitModal: React.FC<Props> = ({ navigation }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const backhandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        setShow(true);
        return true;
      }
    );
    return () => {
      backhandler.remove();
    };
  }, []);

  const handleExit = (): void => {
    setShow(false);
    navigation.navigate("Start");
    BackHandler.exitApp();
  };

  return (
    <Overlay
      height={150}
      isVisible={show}
      overlayStyle={{ backgroundColor: "#1D1F33" }}
      windowBackgroundColor={"rgba(0, 0, 0, .9)"}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Exit game?</Text>
        <View style={{ flexDirection: "row" }}>
          <GameButton
            title="Yes"
            iconColor="#327738"
            iconName="check"
            width={90}
            callback={handleExit}
          />
          <GameButton
            title="No"
            iconColor="#8214A0"
            iconName="close"
            width={90}
            callback={() => setShow(false)}
          />
        </View>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 25,
    padding: 10
  }
});

export default ExitModal;
