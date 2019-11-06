import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { playMusic } from "../gameLogic";
import { Octicons } from "@expo/vector-icons";

interface Props {
  navigation: NavigationStackProp;
  screenProps: any;
}

const StartGame: React.FC<Props> = ({ navigation, screenProps }) => {
  useEffect(() => {
    playMusic(true);
  }, []);

  return (
    <View style={styles.creenContainer}>
      <Text>{screenProps.playMusic}</Text>
      <TouchableOpacity
        onPress={() => {
          playMusic(screenProps.playMusic);
          screenProps.setPlayMusic(!screenProps.playMusic);
        }}
      >
        {!!screenProps.playMusic ? (
          <Octicons name="mute" size={32} color="black" />
        ) : (
          <Octicons name="unmute" size={32} color="black" />
        )}
      </TouchableOpacity>
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
