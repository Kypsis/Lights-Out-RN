import { AsyncStorage } from "react-native";

export const setHighScores = async (name: string, score: any) => {
  try {
    const request = await AsyncStorage.getItem("highscore");
    const scores = await JSON.parse(request);
    let newScores = scores ? [...scores, { name, score }] : [{ name, score }];
    await AsyncStorage.setItem("highscore", JSON.stringify(newScores));
  } catch (error) {
    console.log(error);
  }
};

export const getHighScores = async setState => {
  try {
    const request = await AsyncStorage.getItem("highscore");
    const scores = await JSON.parse(request);
    if (scores) {
      const sortedScores = scores.sort((a, b) => (a.score > b.score ? 1 : -1));
      setState(sortedScores);
    } else {
      setState([]);
    }
  } catch (error) {
    console.log(error);
  }
};

export const clearScores = async () => {
  try {
    await AsyncStorage.removeItem("highscore");
  } catch (error) {
    console.log(error);
  }
};
