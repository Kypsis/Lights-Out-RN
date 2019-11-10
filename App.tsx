import React, { useState, useEffect, Suspense } from "react";
import { ActivityIndicator } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { ScreenOrientation } from "expo";
import * as Font from "expo-font";

import StartGameScreen from "./src/screens/StartGameScreen";
import GameBoardScreen from "./src/screens/GameBoardScreen";
import ScoreBoardScreen from "./src/screens/ScoreBoardScreen";
import { playMusic, unloadMusic } from "./src/utilities/musicController";

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

  useEffect(() => {
    (async function changeScreenOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    })();
  }, []);

  return fontLoaded === true ? (
    <App
      screenProps={{
        playMusicState,
        setPlayMusicState,
        playerName,
        setPlayerName,
        scoreboard,
        setScoreboard
      }}
    />
  ) : (
    <ActivityIndicator
      style={{ flex: 1, justifyContent: "center" }}
      size="large"
      color="#00ff00"
    />
  );
};
