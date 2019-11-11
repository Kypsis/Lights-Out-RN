import React from "react";
import { NavigationStackProp } from "react-navigation-stack";
import { View, Text, StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";

import GameButton from "../components/GameButton";

import { setHighScores } from "../utilities/asyncStorage";

interface Props {
  moves: number;
  navigation: NavigationStackProp;
  playerName: string;
  showGameWonModal: boolean;
  newGame(): void;
  setShowGameWonModal(arg: boolean);
}

const GameWonModal: React.FC<Props> = ({
  navigation,
  showGameWonModal,
  setShowGameWonModal,
  moves,
  newGame,
  playerName
}) => {
  const showHighScore = (): void => {
    setShowGameWonModal(false);
    setHighScores(playerName, moves);
    newGame();
    navigation.navigate("Score");
  };

  const replay = (): void => {
    setShowGameWonModal(false);
    setHighScores(playerName, moves);
    newGame();
  };

  return (
    <Overlay
      height={300}
      isVisible={showGameWonModal}
      overlayStyle={{ backgroundColor: "#1D1F33" }}
      windowBackgroundColor={"rgba(0, 0, 0, .9)"}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>You Win!</Text>
        <Text style={styles.text}>{playerName}</Text>
        <Text style={styles.text}>You won in {moves} moves.</Text>
        <View>
          <GameButton
            title="Show High Score"
            iconColor="gold"
            iconName="certificate"
            callback={showHighScore}
          />
          <GameButton
            title="Replay"
            iconColor="#327738"
            iconName="replay"
            callback={replay}
          />
        </View>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  heading: {
    color: "white",
    fontFamily: "orbitron-medium",
    fontSize: 30,
    padding: 10
  },
  text: {
    color: "white",
    fontSize: 18,
    padding: 10
  }
});

export default GameWonModal;
