import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { playMusic } from "../gameLogic";

interface Props {
  navigation: NavigationStackProp;
}

const StartGame: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    playMusic(true);
  }, []);

  return (
    <View style={styles.creenContainer}>
      <Button
        title="Play"
        onPress={() => {
          playMusic(true);
        }}
      />
      <Button
        title="Stop"
        onPress={() => {
          playMusic(false);
        }}
      />
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
