import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";

import Cell from "../components/Cell";

interface Props {
  navigation: NavigationStackProp;
  rows: number;
  columns: number;
  chanceLightStartsOn: number;
}

const StartGame: React.FC<Props> = ({
  navigation,
  rows = 5,
  columns = 5,
  chanceLightStartsOn = 0.2
}) => {
  const [hasWon, setHasWon] = useState(false);
  const [board, setBoard] = useState([]);

  useEffect(() => {
    createBoard();
  }, []);

  const solvable = board => {
    let qp1 = 0;
    let qp2 = 0;
    board.forEach((row, i) => {
      row.forEach((cell, j) => {
        cell && i !== 2 && j % 2 === 0 && qp1++;
        cell && i % 2 === 0 && j !== 2 && qp2++;
      });
    });
    return qp1 % 2 === 1 || qp2 % 2 === 1 ? false : true;
  };

  const createBoard = () => {
    const newBoard = [...Array(rows)].map(rowItem =>
      [...Array(columns)].map(
        columnItem => Math.random() <= chanceLightStartsOn
      )
    );

    console.log(solvable(newBoard));

    solvable(newBoard) ? setBoard(newBoard) : createBoard();
  };

  return (
    <View style={styles.ScreenContainer}>
      <Button
        title="Go to Score Screen"
        onPress={() => navigation.navigate("Score")}
      />
      <Text>Game Board Screen</Text>
      <Cell />
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow"
  }
});

export default StartGame;
