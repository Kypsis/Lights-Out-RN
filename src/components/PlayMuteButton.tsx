import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { playMusic } from "../utilities/musicController";
import { Octicons } from "@expo/vector-icons";

interface Props {
  playMusicState: boolean;
  setPlayMusicState(playMusicState: boolean): any;
}

const PlayMuteButton: React.FC<Props> = ({
  playMusicState,
  setPlayMusicState
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          playMusic(playMusicState);
          setPlayMusicState(!playMusicState);
        }}
      >
        {!!playMusicState ? (
          <Octicons name="mute" size={32} color="silver" />
        ) : (
          <Octicons name="unmute" size={32} color="silver" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 10,
    top: 30,
    zIndex: 10,
    elevation: 5
  },
  button: {
    margin: 10
  }
});

export default PlayMuteButton;
