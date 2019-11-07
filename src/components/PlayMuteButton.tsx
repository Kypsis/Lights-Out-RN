import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { playMusic } from "../musicController";
import { Octicons } from "@expo/vector-icons";

interface Props {
  playMusicState: boolean;
  setPlayMusicState: any;
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
          <Octicons name="mute" size={32} color="black" />
        ) : (
          <Octicons name="unmute" size={32} color="black" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignSelf: "flex-end" },
  button: {
    marginTop: 50,
    marginHorizontal: 20
  }
});

export default PlayMuteButton;
