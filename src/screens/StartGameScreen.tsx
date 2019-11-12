import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from "react-native";
import { Input, Card } from "react-native-elements";
import { NavigationStackProp } from "react-navigation-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import PlayMuteButton from "../components/PlayMuteButton";
import GameButton from "../components/GameButton";
import ExitModal from "../components/ExitModal";

interface Props {
  navigation: NavigationStackProp;
  screenProps: any;
}

const StartGame: React.FC<Props> = ({ navigation, screenProps }) => {
  const { playerName, setPlayerName } = screenProps;

  const input: any = React.createRef();

  useEffect(() => {
    const focusListener = navigation.addListener("didFocus", () => {
      setPlayerName("Anonymous");
    });
    return () => {
      focusListener.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => input.current.blur()}>
      <View style={styles.screenContainer}>
        <ExitModal navigation={navigation} />
        <PlayMuteButton {...screenProps} />
        <Image
          source={require("../../assets/logo.png")}
          style={styles.imageStyle}
        />
        <KeyboardAvoidingView
          behavior="position"
          enabled
          style={styles.keyboardAvoidingViewStyle}
        >
          <Card
            title="Please Enter Your Name"
            containerStyle={styles.cardContainer}
            titleStyle={styles.titleStyle}
          >
            <Input
              ref={input}
              selectTextOnFocus
              value={playerName}
              inputStyle={{ color: "white" }}
              leftIconContainerStyle={styles.leftIconContainerStyle}
              leftIcon={
                <MaterialCommunityIcons
                  name="pencil"
                  size={24}
                  color="#8F8F9C"
                />
              }
              onChangeText={playerName => setPlayerName(playerName)}
            />
            <View style={styles.buttonContainer}>
              <GameButton
                title="Play"
                iconColor="gold"
                iconName="lightbulb-on"
                callback={() => navigation.navigate("Game")}
              />
            </View>
          </Card>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    alignItems: "center",
    backgroundColor: "#090C22",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  cardContainer: {
    alignSelf: "stretch",
    backgroundColor: "#1D1F33",
    borderRadius: 5,
    borderWidth: 0,
    marginHorizontal: 20
  },
  buttonContainer: {
    alignSelf: "center",
    marginHorizontal: 10,
    marginBottom: 8,
    marginTop: 25,
    width: 200
  },
  imageStyle: {
    height: 182,
    width: 250
  },
  keyboardAvoidingViewStyle: {
    alignSelf: "stretch",
    marginTop: 20
  },
  titleStyle: {
    color: "white",
    fontSize: 20
  },
  leftIconContainerStyle: {
    marginRight: 10
  }
});

export default StartGame;
