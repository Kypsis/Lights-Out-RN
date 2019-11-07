import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";

import PlayMuteButton from "../components/PlayMuteButton";

interface Props {
  navigation: NavigationStackProp;
  screenProps: any;
}

const StartGame: React.FC<Props> = ({ navigation, screenProps }) => {
  return (
    <View style={styles.creenContainer}>
      <View style={{ flex: 1, alignSelf: "flex-end" }}>
        <PlayMuteButton {...screenProps} />
      </View>
      <View style={{ flex: 2 }}>
        <Button
          title="Go to Game Board Screen"
          onPress={() => {
            navigation.navigate("Game");
          }}
        />
        <Text>Start Game Screen</Text>
      </View>
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
