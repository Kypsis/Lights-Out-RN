import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import Cell from "../components/Cell";

import { solvable, flipCells, Props } from "../gameLogic";

const StartGame: React.FC<Props> = ({
  navigation,
  rows = 5,
  columns = 5,
  chanceLightStartsOn = 0.2
}) => {
  const [hasWon, setHasWon] = useState(false);
  const [board, setBoard] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    createBoard();
  }, []);

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
      <Button
        title="Go to Score Screen"
        onPress={() => navigation.navigate("Score")}
      />
      <Text>Game Board Screen</Text>
      <Text>Moves: {moves}</Text>
      <Text>{hasWon ? `You won in ${moves} moves!` : "Play!"}</Text>
      <View style={styles.boardContainer}>
        {board.map((cell, index) => (
          <View style={styles.row} key={index}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow"
  },
  boardContainer: {
    height: 300,
    width: 300,
    backgroundColor: "white",
    flexWrap: "wrap"
  },
  row: { flexDirection: "row" }
});

export default StartGame;
