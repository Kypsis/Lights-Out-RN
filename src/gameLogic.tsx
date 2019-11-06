import { NavigationStackProp } from "react-navigation-stack";
import { Audio } from "expo-av";

export interface Props {
  navigation: NavigationStackProp;
  rows: number;
  columns: number;
  chanceLightStartsOn: number;
}

interface FlipCells {
  (
    coords: any,
    board: Array<Array<Boolean>>,
    columns: number,
    rows: number
  ): Array<Array<Boolean>>;
}

export const flipCells: FlipCells = (
  coords,
  board,
  columns,
  rows
): Array<Array<Boolean>> => {
  let flipBoard: Array<Array<Boolean>> = board;
  let [y, x] = coords.split("-").map(Number);

  // if this coord is actually on board, flip it
  const flipCell = (y, x): void => {
    if (x >= 0 && x < columns && y >= 0 && y < rows) {
      flipBoard[y][x] = !flipBoard[y][x];
    }
  };

  flipCell(y, x);
  flipCell(y, x + 1);
  flipCell(y, x - 1);
  flipCell(y + 1, x);
  flipCell(y - 1, x);

  return flipBoard;
};

export const solvable = (board: Array<Array<Boolean>>): boolean => {
  let qp1 = 0;
  let qp2 = 0;
  board.forEach((row: [], i) => {
    row.forEach((cell: boolean, j) => {
      cell && i !== 2 && j % 2 === 0 && qp1++;
      cell && i % 2 === 0 && j !== 2 && qp2++;
    });
  });
  return qp1 % 2 === 1 || qp2 % 2 === 1 ? false : true;
};

const soundObject = new Audio.Sound();
export const playMusic = async (play: boolean) => {
  if (play) {
    try {
      {
        if (soundObject._loaded) await soundObject.unloadAsync();
        await soundObject.loadAsync(require("../assets/theme.mp3"), {
          isLooping: true
        });
        await soundObject.playAsync();
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      if (soundObject._loaded) {
        await soundObject.stopAsync();
        await soundObject.unloadAsync();
      }
    } catch (error) {
      console.log(error);
    }
  }
};
