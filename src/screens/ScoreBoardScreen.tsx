import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Button } from "react-native-elements";
import { NavigationStackProp } from "react-navigation-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import PlayMuteButton from "../components/PlayMuteButton";
import ExitModal from "../components/ExitModal";

import { getHighScores, setHighScores, clearScores } from "../asyncStorage";

interface Props {
  navigation: NavigationStackProp;
  screenProps: any;
}

const StartGame: React.FC<Props> = ({ navigation, screenProps }) => {
  const [playersAndScores, setPlayersAndScores] = useState([]);

  return (
    <View style={styles.screenContainer}>
      <ExitModal navigation={navigation} />
      <PlayMuteButton {...screenProps} />
      <Card
        containerStyle={styles.cardContainer}
        title="High Scores"
        titleStyle={{ fontSize: 25 }}
      >
        {playersAndScores.map((player, index) => {
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
        onPress={() =>
          setHighScores("Test", Math.floor(Math.random() * 10) + 1)
        }
      />
      <Button
        containerStyle={{ margin: 8, width: 200 }}
        title="Retrieve Data"
        titleStyle={{ padding: 10 }}
        raised
        onPress={() => {
          getHighScores(setPlayersAndScores);
        }}
      />
      <Button
        containerStyle={{ margin: 8, width: 200 }}
        title="Clear Scores"
        titleStyle={{ padding: 10 }}
        raised
        onPress={clearScores}
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
    backgroundColor: "rgba(245, 245, 245,1)"
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "400"
  }
});

export default StartGame;
