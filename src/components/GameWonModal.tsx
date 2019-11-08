import React, { useState, useEffect } from "react";
import { NavigationStackProp } from "react-navigation-stack";
import { View, Text, StyleSheet } from "react-native";
import { Overlay, Button } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { setHighScores } from "../asyncStorage";

interface Props {
  navigation: NavigationStackProp;
  hasWon: boolean;
  moves: number;
  playerName: string;
  newGame(): void;
}

const GameWonModal: React.FC<Props> = ({
  navigation,
  hasWon,
  moves,
  newGame,
  playerName
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(hasWon);
  }, [hasWon]);

  const showHighScore = (): void => {
    setShow(false);
    setHighScores(playerName, moves);
    newGame();
    navigation.navigate("Score");
  };

  const replay = (): void => {
    setShow(false);
    setHighScores(playerName, moves);
    newGame();
  };

  return (
    <Overlay
      isVisible={show}
      height={300}
      overlayStyle={{ backgroundColor: "#E1E2E1" }}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>You Win!</Text>
        <Text style={styles.text}>{playerName}</Text>
        <Text style={styles.text}>You won in {moves} moves.</Text>
        <View>
          <Button
            containerStyle={{ margin: 8, width: 200 }}
            titleStyle={{ padding: 10 }}
            title="Show High Score"
            raised
            icon={
              <MaterialCommunityIcons
                name="certificate"
                size={20}
                color="gold"
              />
            }
            onPress={showHighScore}
          />
          <Button
            containerStyle={{ margin: 8, width: 200 }}
            titleStyle={{ padding: 10 }}
            title="Replay"
            raised
            icon={
              <MaterialCommunityIcons name="restart" size={20} color="green" />
            }
            onPress={replay}
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
