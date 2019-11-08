import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Button, ListItem } from "react-native-elements";
import { NavigationStackProp } from "react-navigation-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import PlayMuteButton from "../components/PlayMuteButton";
import ExitModal from "../components/ExitModal";
import ConfirmModal from "../components/ConfirmModal";
import GameButton from "../components/GameButton";

import { getHighScores } from "../asyncStorage";

interface Props {
  navigation: NavigationStackProp;
  screenProps: any;
}

const StartGame: React.FC<Props> = ({ navigation, screenProps }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { scoreboard, setScoreboard, fontLoaded } = screenProps;

  useEffect(() => {
    getHighScores(setScoreboard);
  }, [scoreboard]);

  return (
    <View style={styles.screenContainer}>
      <ExitModal navigation={navigation} />
      <ConfirmModal show={showConfirmModal} setShow={setShowConfirmModal} />
      <PlayMuteButton {...screenProps} />
      <View style={styles.listContainer}>
        {fontLoaded ? <Text style={styles.textStyle}>High Score</Text> : null}
        <FlatList
          data={scoreboard}
          renderItem={({ item }: any) => (
            <ListItem
              containerStyle={{
                backgroundColor: "#F5F5F6"
              }}
              title={item.name}
              badge={{
                value: item.score,
                badgeStyle: {
                  backgroundColor: "#4f5b62",
                  height: 30,
                  width: 30
                },
                textStyle: { color: "#ffe54c", fontSize: 17 }
              }}
              topDivider
              bottomDivider
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <GameButton
        title="Clear Scores"
        iconName="trash-can-outline"
        iconColor="gainsboro"
        callback={() => setShowConfirmModal(true)}
      />
      <GameButton
        title="Replay"
        iconName="restart"
        iconColor="deepskyblue"
        callback={() => navigation.navigate("Game")}
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
    backgroundColor: "rgb(25, 25, 25)"
  },
  listContainer: {
    height: 400,
    alignSelf: "stretch",
    borderRadius: 10,
    backgroundColor: "#F5F5F6",
    marginHorizontal: 20,
    padding: 10,
    marginTop: 50,
    marginBottom: 10
  },
  textStyle: {
    fontFamily: "orbitron-medium",
    alignSelf: "center",
    fontSize: 40,
    fontWeight: "400",
    paddingBottom: 10
  }
});

export default StartGame;
