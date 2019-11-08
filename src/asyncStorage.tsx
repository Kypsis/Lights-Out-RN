import { AsyncStorage } from "react-native";

export const setHighScores = async () => {
  try {
    await AsyncStorage.setItem("highscore", JSON.stringify(players));
    console.log("success!");
  } catch (error) {
    console.log(error);
  }
};

export const getHighScores = async setState => {
  try {
    const request = await AsyncStorage.getItem("highscore");
    const scores = await JSON.parse(request);
    scores ? setState(scores) : setState([]);
  } catch (error) {
    console.log(error);
  }
};

export const clearScores = async () => {
  try {
    await AsyncStorage.removeItem("highscore", () => {
      console.log("Scores removed");
    });
  } catch (error) {
    console.log(error);
  }
};

export const players = [
  {
    name: "Test1",
    score: 1
  },
  {
    name: "Test2",
    score: 2
  },
  {
    name: "Test3",
    score: 3
  },
  {
    name: "Test4",
    score: 4
  },
  {
    name: "Test5",
    score: 5
  },
  {
    name: "Test6",
    score: 6
  },
  {
    name: "Test7",
    score: 7
  },
  {
    name: "Test8",
    score: 8
  },
  {
    name: "Test9",
    score: 9
  },
  {
    name: "Test10",
    score: 10
  }
];
