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
    title={title}
    raised
    buttonStyle={{ borderRadius: 50, backgroundColor: "#E82256" }}
    containerStyle={{ margin: 8, width }}
    titleStyle={{ padding: 10 }}
    icon={
      <MaterialCommunityIcons name={iconName} size={20} color={iconColor} />
    }
    onPress={callback}
  />
);

export default GameButton;
