import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Cell from "../components/Cell";
import PlayMuteButton from "../components/PlayMuteButton";
import ExitModal from "../components/ExitModal";
import GameWonModal from "../components/GameWonModal";
import InstructionsModal from "../components/InstructionsModal";
import GameButton from "../components/GameButton";

import { solvable, flipCells } from "../utilities/gameLogic";
import { screenWidth } from "../utilities/screenDimensions";

interface Props {
  navigation: NavigationStackProp;
  screenProps: any;
  chanceLightStartsOn: number;
}

const StartGame: React.FC<Props> = ({
  navigation,
  screenProps,
  chanceLightStartsOn = 0.2
}) => {
  const [boardSize, setBoardSize] = useState({ rows: 5, columns: 5 });
  const [board, setBoard] = useState([]);
  const [moves, setMoves] = useState(0);
  const [showGameWonModal, setShowGameWonModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);

  let { rows, columns } = boardSize;

  useEffect(() => {
    createBoard();
  }, [boardSize]);

  const cheat = (): void => {
    boardSize.rows === 5 && boardSize.columns === 5
      ? setBoardSize({ rows: 3, columns: 3 })
      : setBoardSize({ rows: 5, columns: 5 });
  };

  const newGame = (): void => {
    setMoves(0);
    setShowGameWonModal(false);
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
    setShowGameWonModal(allLit);
  };

  return (
    <View style={styles.screenContainer}>
      <ExitModal navigation={navigation} />
      <InstructionsModal
        showInstructions={showInstructionsModal}
        setShowInstructions={setShowInstructionsModal}
      />
      <GameWonModal
        navigation={navigation}
        showGameWonModal={showGameWonModal}
        setShowGameWonModal={setShowGameWonModal}
        moves={moves}
        newGame={newGame}
        playerName={screenProps.playerName}
      />
      <PlayMuteButton {...screenProps} />
      <TouchableOpacity
        style={styles.instructionsButton}
        onPress={() => setShowInstructionsModal(true)}
      >
        <MaterialCommunityIcons
          name="information-outline"
          size={32}
          color="silver"
        />
      </TouchableOpacity>
      <TouchableWithoutFeedback onLongPress={cheat}>
        <Text style={styles.textStyle}>Moves: {moves}</Text>
      </TouchableWithoutFeedback>
      <View
        style={{
          ...styles.boardContainer,
          height: screenWidth - 20,
          width: screenWidth - 20
        }}
      >
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
        title="Go to High Scores"
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
    backgroundColor: "#455a64",
    flexWrap: "wrap",
    marginBottom: 10
  },
  rowStyle: {
    flexDirection: "row",
    flex: 1
  },
  textStyle: {
    fontFamily: "orbitron-medium",
    fontSize: 20,
    padding: 10,
    color: "white"
  },
  instructionsButton: {
    position: "absolute",
    left: 15,
    top: 45,
    zIndex: 10,
    elevation: 5
  }
});

export default StartGame;
