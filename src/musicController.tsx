import { Audio } from "expo-av";

const soundObject = new Audio.Sound();
let firstRun: boolean = true;
export const playMusic = async (play: boolean) => {
  if (play) {
    try {
      {
        if (firstRun && soundObject._loaded) {
          await soundObject.unloadAsync();
          firstRun = false;
        }
        if (!soundObject._loaded) {
          await soundObject.loadAsync(require("../assets/theme.mp3"), {
            isLooping: true
          });
        }
        await soundObject.playAsync();
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      if (soundObject._loaded) {
        await soundObject.pauseAsync();
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const unloadMusic = async () => {
  try {
    await soundObject.unloadAsync();
  } catch (error) {
    console.log(error);
  }
};
