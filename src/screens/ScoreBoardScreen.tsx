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
    <View style={styles.screenContainer}>
      <PlayMuteButton {...screenProps} />
      <View style={{ flex: 2 }}>
        <Button
          title="Go to Start Game Screen"
          onPress={() => navigation.navigate("Start")}
        />
        <Text>Score Board Screen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red"
  }
});

export default StartGame;
