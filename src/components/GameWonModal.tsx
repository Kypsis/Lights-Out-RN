import React from "react";
import { NavigationStackProp } from "react-navigation-stack";
import { View, Text, StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";

import GameButton from "../components/GameButton";

import { setHighScores } from "../utilities/asyncStorage";

interface Props {
  navigation: NavigationStackProp;
  moves: number;
  playerName: string;
  showGameWonModal: boolean;
  setShowGameWonModal(arg: boolean);
  newGame(): void;
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
      isVisible={showGameWonModal}
      height={300}
      overlayStyle={{ backgroundColor: "#E1E2E1" }}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>You Win!</Text>
        <Text style={styles.text}>{playerName}</Text>
        <Text style={styles.text}>You won in {moves} moves.</Text>
        <View>
          <GameButton
            title="Show High Score"
            iconName="certificate"
            iconColor="gold"
            callback={showHighScore}
          />
          <GameButton
            title="Replay"
            iconName="restart"
            iconColor="darkgreen"
            callback={replay}
          />
        </View>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  heading: {
    fontSize: 36,
    padding: 10
  },
  text: {
    fontSize: 20,
    padding: 10
  }
});

export default GameWonModal;
