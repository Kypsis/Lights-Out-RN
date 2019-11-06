import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";

interface Props {
  navigation: NavigationStackProp;
}

const StartGame: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Go to Start Game Screen"
        onPress={() => navigation.navigate("Start")}
      />
      <Text>Score Board Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default StartGame;
