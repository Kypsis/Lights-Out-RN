import React from "react";
import { Button } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  title: string;
  iconName?: string;
  iconColor?: string;
  width?: number;
  callback();
}

const GameButton: React.FC<Props> = ({
  title,
  iconName = "cross",
  iconColor = "black",
  width = 200,
  callback
}) => (
  <Button
    buttonStyle={{ borderRadius: 50, backgroundColor: "rgb(0,178,70)" }}
    containerStyle={{ margin: 8, width }}
    titleStyle={{ padding: 10 }}
    title={title}
    raised
    icon={
      <MaterialCommunityIcons name={iconName} size={20} color={iconColor} />
    }
    onPress={callback}
  />
);

export default GameButton;
