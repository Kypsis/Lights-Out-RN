import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { ListItem } from "react-native-elements";
import { NavigationStackProp } from "react-navigation-stack";

import PlayMuteButton from "../components/PlayMuteButton";
import ExitModal from "../components/ExitModal";
import ConfirmModal from "../components/ConfirmModal";
import GameButton from "../components/GameButton";

import { getHighScores } from "../utilities/asyncStorage";
import { screenHeight } from "../utilities/screenDimensions";

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
      <View style={{ ...styles.listContainer, height: screenHeight - 240 }}>
        <Text style={styles.textStyle}>High Score</Text>
        <FlatList
          data={scoreboard}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }: any) => (
            <ListItem
              title={item.name}
              bottomDivider
              topDivider
              containerStyle={{
                backgroundColor: "#1D1F33"
              }}
              titleStyle={{ color: "white" }}
              badge={{
                value: item.score,
                badgeStyle: {
                  backgroundColor: "#4f5b62",
                  height: 30,
                  width: 30,
                  borderColor: "#090C22"
                },
                textStyle: { color: "#ffe54c", fontSize: 17 }
              }}
            />
          )}
        />
      </View>
      <GameButton
        title="Clear Scores"
        iconColor="gainsboro"
        iconName="trash-can-outline"
        callback={() => setShowConfirmModal(true)}
      />
      <GameButton
        title="Back to Play"
        iconColor="#327738"
        iconName="backburger"
        callback={() => navigation.navigate("Game")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    alignItems: "center",
    backgroundColor: "#090C22",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  listContainer: {
    alignSelf: "stretch",
    backgroundColor: "#1D1F33",
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    paddingVertical: 20,
    marginTop: 50
  },
  textStyle: {
    alignSelf: "center",
    color: "white",
    fontFamily: "orbitron-medium",
    fontSize: 40,
    fontWeight: "400",
    paddingBottom: 10
  }
});

export default StartGame;
