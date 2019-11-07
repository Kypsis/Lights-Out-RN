import React, { useState, useEffect } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import StartGameScreen from "./src/screens/StartGameScreen";
import GameBoardScreen from "./src/screens/GameBoardScreen";
import ScoreBoardScreen from "./src/screens/ScoreBoardScreen";
import { playMusic, unloadMusic } from "./src/musicController";

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
  const [playMusicState, setPlayMusicState] = useState(false);

  useEffect(() => {
    playMusic(true);
    return () => {
      unloadMusic();
    };
  }, []);

  return <App screenProps={{ playMusicState, setPlayMusicState }} />;
};
