import React, { useState, useEffect } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import * as Font from "expo-font";

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
  const [playerName, setPlayerName] = useState("Anonymous");
  const [scoreboard, setScoreboard] = useState([]);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    playMusic(true);
    return () => {
      unloadMusic();
    };
  }, []);

  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        "orbitron-medium": require("./assets/Orbitron-Medium.ttf")
      });
      setFontLoaded(true);
    })();
  }, []);

  return (
    <App
      screenProps={{
        playMusicState,
        setPlayMusicState,
        playerName,
        setPlayerName,
        scoreboard,
        setScoreboard,
        fontLoaded
      }}
    />
  );
};
