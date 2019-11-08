import React, { useState, useEffect } from "react";
import { BackHandler } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { View, Text, StyleSheet } from "react-native";
import { Overlay, Button } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";

interface Props {
  navigation: NavigationStackProp;
}

const ExitButton: React.FC<Props> = ({ navigation }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const backhandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        setShow(true);
        return true;
      }
    );
    return () => {
      backhandler.remove();
    };
  }, []);

  const handleExit = (): void => {
    setShow(false);
    navigation.navigate("Start");
    BackHandler.exitApp();
  };

  return (
    <Overlay
      isVisible={show}
      height={150}
      overlayStyle={{ backgroundColor: "rgba(235, 235, 235,0.95)" }}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Exit game?</Text>
        <View style={{ flexDirection: "row" }}>
          <Button
            containerStyle={{ margin: 8, width: 90 }}
            title="Yes"
            titleStyle={{ padding: 10 }}
            raised
            icon={<Entypo name="check" size={20} color="green" />}
            onPress={handleExit}
          />
          <Button
            containerStyle={{ margin: 8, width: 90 }}
            title="No"
            titleStyle={{ padding: 10 }}
            raised
            icon={<Entypo name="cross" size={20} color="red" />}
            onPress={() => {
              setShow(false);
            }}
          />
        </View>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 36,
    padding: 10
  }
});

export default ExitButton;
