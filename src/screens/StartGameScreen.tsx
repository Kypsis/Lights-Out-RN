import React, { useEffect } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
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

  useEffect(() => {
    const focusListener = navigation.addListener("didFocus", () => {
      setPlayerName("Anonymous");
    });
    return () => {
      focusListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.screenContainer}
      behavior="padding"
      enabled
    >
      <ExitModal navigation={navigation} />
      <PlayMuteButton {...screenProps} />
      <View style={styles.titleContainer}>
        <Text style={styles.textLeft}>Lights</Text>
        <Text style={styles.textRight}>On</Text>
      </View>
      <Card
        containerStyle={styles.cardContainer}
        title="Please Enter Your Name"
        titleStyle={{ fontSize: 20, color: "black" }}
      >
        <Input
          inputStyle={{ color: "#4f5b62" }}
          selectTextOnFocus
          leftIconContainerStyle={{ marginRight: 10 }}
          value={playerName}
          onChangeText={playerName => setPlayerName(playerName)}
          leftIcon={
            <MaterialCommunityIcons name="pencil" size={24} color="black" />
          }
        />
        <View style={styles.buttonContainer}>
          <GameButton
            title="Play"
            iconName="lightbulb-on"
            iconColor="gold"
            callback={() => navigation.navigate("Game")}
          />
        </View>
      </Card>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(25, 25, 25)"
  },
  cardContainer: {
    borderWidth: 0,
    alignSelf: "stretch",
    borderRadius: 5,
    backgroundColor: "#F5F5F6",
    marginHorizontal: 20
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    flexDirection: "row",
    backgroundColor: "#0277bd",
    marginHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "rgb(245, 245, 245)",
    elevation: 8,
    height: 80
  },
  buttonContainer: {
    alignSelf: "center",
    marginHorizontal: 10,
    marginTop: 25,
    marginBottom: 8,
    width: 200
  },
  textLeft: {
    fontFamily: "orbitron-medium",
    fontSize: 40,
    color: "#37474f",
    paddingLeft: 15,
    paddingRight: 5,
    paddingBottom: 5,
    textShadowColor: "#102027",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2
  },
  textRight: {
    fontFamily: "orbitron-medium",
    fontSize: 50,
    color: "#ffb300",
    paddingLeft: 5,
    paddingRight: 15,
    paddingTop: 10,
    textShadowColor: "#c68400",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2
  }
});

export default StartGame;
