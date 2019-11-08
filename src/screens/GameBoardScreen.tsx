import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";

import Cell from "../components/Cell";
import PlayMuteButton from "../components/PlayMuteButton";
import ExitModal from "../components/ExitModal";
import GameWonModal from "../components/GameWonModal";
import GameButton from "../components/GameButton";

import { solvable, flipCells } from "../gameLogic";

interface Props {
  navigation: NavigationStackProp;
  screenProps: any;
  rows: number;
  columns: number;
  chanceLightStartsOn: number;
}

const StartGame: React.FC<Props> = ({
  navigation,
  screenProps,
  rows = 5,
  columns = 5,
  chanceLightStartsOn = 0.2
}) => {
  const [board, setBoard] = useState([]);
  const [moves, setMoves] = useState(0);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    createBoard();
  }, []);

  const newGame = (): void => {
    setBoard([]);
    setMoves(0);
    setHasWon(false);
    createBoard();
  };

  const createBoard = (): void => {
    const newBoard: Array<Array<Boolean>> = [...Array(rows)].map(rowItem =>
      [...Array(columns)].map(
        columnItem => Math.random() <= chanceLightStartsOn
      )
    );
    solvable(newBoard) ? setBoard(newBoard) : createBoard();
  };

  const handlePress = (coords): void => {
    const flipBoard = flipCells(coords, board, columns, rows);
    let allLit: boolean = flipBoard.every(array =>
      array.every(item => item === true)
    );

    setMoves(prevState => prevState + 1);
    setBoard([...flipBoard]);
    setHasWon(allLit);
  };

  return (
    <View style={styles.screenContainer}>
      <ExitModal navigation={navigation} />
      <GameWonModal
        navigation={navigation}
        hasWon={hasWon}
        moves={moves}
        newGame={newGame}
        playerName={screenProps.playerName}
      />
      <PlayMuteButton {...screenProps} />
      {screenProps.fontLoaded ? (
        <Text style={styles.textStyle}>Moves: {moves}</Text>
      ) : null}
      <View style={styles.boardContainer}>
        {board.map((cell, index) => (
          <View style={styles.rowStyle} key={index}>
            {cell.map((innerCell, innerIndex) => (
              <Cell
                coords={`${index}-${innerIndex}`}
                key={`${index}-${innerIndex}`}
                isLit={board[index][innerIndex]}
                handlePress={handlePress}
              />
            ))}
          </View>
        ))}
      </View>
      <GameButton
        title="Go to Score Screen"
        iconName="certificate"
        iconColor="gold"
        callback={() => navigation.navigate("Score")}
      />
      <GameButton
        title="Restart Game"
        iconName="restart"
        iconColor="deepskyblue"
        callback={newGame}
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
  boardContainer: {
    borderRadius: 10,
    borderWidth: 5,
    borderColor: "#263238",
    padding: 5,
    height: 300,
    width: 300,
    backgroundColor: "#455a64",
    flexWrap: "wrap",
    marginBottom: 10
  },
  rowStyle: { flexDirection: "row", flex: 1 },
  textStyle: {
    fontFamily: "orbitron-medium",
    fontSize: 20,
    padding: 10,
    color: "white"
  }
});

export default StartGame;
