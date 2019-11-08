import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Card, Button, ListItem } from "react-native-elements";
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
  const { scoreboard, setScoreboard } = screenProps;

  useEffect(() => {
    getHighScores(setScoreboard);
  }, [scoreboard]);

  return (
    <View style={styles.screenContainer}>
      <ExitModal navigation={navigation} />
      <PlayMuteButton {...screenProps} />
      <View style={styles.listContainer}>
        <Text style={styles.textStyle}>High Score</Text>
        <FlatList
          data={scoreboard}
          renderItem={({ item }) => (
            <ListItem
              containerStyle={{
                backgroundColor: "rgba(245, 245, 245,1)"
              }}
              title={item.name}
              badge={{
                value: item.score,
                badgeStyle: { backgroundColor: "black", height: 30, width: 30 }
              }}
              bottomDivider
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <Button
        containerStyle={{ margin: 8, width: 200 }}
        title="Clear Scores"
        titleStyle={{ padding: 10 }}
        raised
        onPress={clearScores}
      />
      <Button
        containerStyle={{ margin: 8, width: 200 }}
        title="Replay"
        titleStyle={{ padding: 10 }}
        raised
        icon={<MaterialCommunityIcons name="restart" size={20} color="green" />}
        onPress={() => navigation.navigate("Game")}
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
  listContainer: {
    height: 400,
    alignSelf: "stretch",
    borderRadius: 10,
    backgroundColor: "rgba(245, 245, 245,1)",
    marginHorizontal: 10,
    padding: 10,
    marginTop: 45,
    marginBottom: 10
  },
  textStyle: {
    alignSelf: "center",
    fontSize: 40,
    fontWeight: "400"
  }
});

export default StartGame;
