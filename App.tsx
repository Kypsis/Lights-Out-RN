import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, Platform } from "react-native";
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
    headerMode: "none",
    transparentCard: true
  }
);

const App = createAppContainer(navigator);

export default () => {
  const [playMusicState, setPlayMusicState] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [playerName, setPlayerName] = useState("Anonymous");
  const [scoreboard, setScoreboard] = useState([]);

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
    if (Platform.OS === "android")
      (async () => {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT
        );
      })();
  }, []);

  return fontLoaded ? (
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
    <View
      style={{ backgroundColor: "#090C22", flex: 1, justifyContent: "center" }}
    >
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
};
