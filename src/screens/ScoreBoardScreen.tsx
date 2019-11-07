import React from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import { Card, Button } from "react-native-elements";
import { NavigationStackProp } from "react-navigation-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import PlayMuteButton from "../components/PlayMuteButton";
import ExitModal from "../components/ExitModal";

interface Props {
  navigation: NavigationStackProp;
  screenProps: any;
}

const players = [
  {
    name: "Test1",
    score: 1
  },
  {
    name: "Test2",
    score: 2
  },
  {
    name: "Test3",
    score: 3
  },
  {
    name: "Test4",
    score: 4
  },
  {
    name: "Test5",
    score: 5
  },
  {
    name: "Test6",
    score: 6
  },
  {
    name: "Test7",
    score: 7
  },
  {
    name: "Test8",
    score: 8
  },
  {
    name: "Test9",
    score: 9
  },
  {
    name: "Test10",
    score: 10
  }
];

const StartGame: React.FC<Props> = ({ navigation, screenProps }) => {
  const setHighScores = async () => {
    try {
      await AsyncStorage.setItem("highscore", JSON.stringify(players));
      console.log("success!");
    } catch (error) {
      console.log(error);
    }
  };
  const getHighScores = async () => {
    try {
      const request = await AsyncStorage.getItem("highscore");
      const scores = await JSON.parse(request);
      console.log(scores);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <ExitModal navigation={navigation} />
      <PlayMuteButton {...screenProps} />
      <Card
        containerStyle={styles.cardContainer}
        title="High Scores"
        titleStyle={{ fontSize: 25 }}
      >
        {players.map((player, index) => {
          return (
            <View style={styles.scoreContainer} key={index}>
              <Text style={styles.textStyle}>{player.name}</Text>
              <Text style={styles.textStyle}>{player.score}</Text>
            </View>
          );
        })}
      </Card>
      <Button
        containerStyle={{ margin: 8, width: 200 }}
        title="Replay"
        titleStyle={{ padding: 10 }}
        raised
        icon={<MaterialCommunityIcons name="restart" size={20} color="green" />}
        onPress={() => navigation.navigate("Game")}
      />
      <Button
        containerStyle={{ margin: 8, width: 200 }}
        title="Store Data"
        titleStyle={{ padding: 10 }}
        raised
        onPress={setHighScores}
      />
      <Button
        containerStyle={{ margin: 8, width: 200 }}
        title="Retrieve Data"
        titleStyle={{ padding: 10 }}
        raised
        onPress={getHighScores}
      />
      <Button
        containerStyle={{ margin: 8, width: 200 }}
        title="Display Name"
        titleStyle={{ padding: 10 }}
        raised
        onPress={() => {
          console.log(screenProps.playerName);
        }}
      />
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
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 3
  },
  cardContainer: {
    alignSelf: "stretch",
    borderRadius: 10,
    backgroundColor: "rgb(245, 245, 245)"
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "400"
  }
});

export default StartGame;
