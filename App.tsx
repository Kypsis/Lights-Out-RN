import React, { useState } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import StartGameScreen from "./src/screens/StartGameScreen";
import GameBoardScreen from "./src/screens/GameBoardScreen";
import ScoreBoardScreen from "./src/screens/ScoreBoardScreen";
import { playMusic } from "./src/gameLogic";

const navigator = createStackNavigator(
  {
    Start: StartGameScreen,
    Game: GameBoardScreen,
    Score: ScoreBoardScreen
  },
  {
    initialRouteName: "Start",
    headerMode: "none"
  }
);

const App = createAppContainer(navigator);

export default () => {
  const [playMusic, setPlayMusic] = useState(false);

  return <App screenProps={{ playMusic, setPlayMusic }} />;
};
