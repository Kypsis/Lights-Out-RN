import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";

import PlayMuteButton from "../components/PlayMuteButton";
import ExitModal from "../components/ExitModal";

interface Props {
  navigation: NavigationStackProp;
  screenProps: any;
}

const StartGame: React.FC<Props> = ({ navigation, screenProps }) => {
  return (
    <View style={styles.creenContainer}>
      <ExitModal navigation={navigation} />
      <PlayMuteButton {...screenProps} />
      <Button
        title="Go to Game Board Screen"
        onPress={() => {
          navigation.navigate("Game");
        }}
      />
      <Text>Start Game Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  creenContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green"
  }
});

export default StartGame;
