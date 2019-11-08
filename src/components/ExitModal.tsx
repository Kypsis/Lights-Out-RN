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
      isVisible={show}
      height={150}
      overlayStyle={{ backgroundColor: "#E1E2E1" }}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Exit game?</Text>
        <View style={{ flexDirection: "row" }}>
          <GameButton
            title="Yes"
            iconName="check"
            iconColor="darkgreen"
            width={90}
            callback={handleExit}
          />
          <GameButton
            title="No"
            iconName="close"
            iconColor="red"
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
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 25,
    padding: 10
  }
});

export default ExitModal;
