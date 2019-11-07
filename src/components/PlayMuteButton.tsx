import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { playMusic } from "../musicController";
import { Octicons } from "@expo/vector-icons";

interface Props {
  playMusicState: any;
  setPlayMusicState: any;
}

const PlayMuteButton: React.FC<Props> = ({
  playMusicState,
  setPlayMusicState
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        playMusic(playMusicState);
        setPlayMusicState(!playMusicState);
      }}
    >
      {!!playMusicState ? (
        <Octicons name="mute" size={32} color="black" />
      ) : (
        <Octicons name="unmute" size={32} color="black" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 50,
    marginHorizontal: 20
  }
});

export default PlayMuteButton;
