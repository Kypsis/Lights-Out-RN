import React, { useEffect } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { NavigationStackProp } from "react-navigation-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import PlayMuteButton from "../components/PlayMuteButton";
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
        <Text style={styles.textRight}>Out</Text>
      </View>

      <Card
        containerStyle={styles.cardContainer}
        title="Please Enter Your Name"
        titleStyle={{ fontSize: 20 }}
      >
        <Input
          selectTextOnFocus
          leftIconContainerStyle={{ marginRight: 10 }}
          value={playerName}
          onChangeText={playerName => setPlayerName(playerName)}
          leftIcon={
            <MaterialCommunityIcons name="pencil" size={24} color="black" />
          }
        />
        <Button
          containerStyle={{ marginHorizontal: 10, marginTop: 25 }}
          raised
          title="Play"
          onPress={() => {
            navigation.navigate("Game");
          }}
        />
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
    backgroundColor: "green"
  },
  cardContainer: {
    alignSelf: "stretch",
    borderRadius: 5,
    backgroundColor: "rgba(145, 145, 145,0.7)",
    marginHorizontal: 30
  },
  titleContainer: {
    flexDirection: "row",
    backgroundColor: "teal",
    marginBottom: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "rgb(245, 245, 245)",
    elevation: 8
  },
  textLeft: {
    fontSize: 50,
    color: "orange",
    paddingLeft: 15,
    paddingRight: 5,
    textShadowColor: "darkgoldenrod",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2
  },
  textRight: {
    fontSize: 60,
    fontStyle: "italic",
    color: "gray",
    paddingLeft: 5,
    paddingRight: 15,
    textShadowColor: "rgb(99, 99, 99)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2
  }
});

export default StartGame;
