import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import StartGameScreen from "./src/screens/StartGameScreen";
import GameBoardScreen from "./src/screens/GameBoardScreen";
import ScoreBoardScreen from "./src/screens/ScoreBoardScreen";

const navigator = createStackNavigator(
  {
    Start: StartGameScreen,
    Game: GameBoardScreen,
    Score: ScoreBoardScreen
  },
  {
    initialRouteName: "Start",
    defaultNavigationOptions: {
      title: "Lights Out Game"
    }
  }
);

export default createAppContainer(navigator);
