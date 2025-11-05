import { useAudioPlayer } from "expo-audio";

type SoundType = "flip" | "match" | "complete";

export const useSound = () => {
  // Create audio players for each sound
  const flipPlayer = useAudioPlayer(require("../assets/sounds/flip.mp3"));
  const matchPlayer = useAudioPlayer(require("../assets/sounds/match.mp3"));
  const completePlayer = useAudioPlayer(
    require("../assets/sounds/complete.mp3")
  );

  const playSound = async (type: SoundType) => {
    try {
      switch (type) {
        case "flip":
          flipPlayer.seekTo(0);
          flipPlayer.play();
          break;
        case "match":
          matchPlayer.seekTo(0);
          matchPlayer.play();
          break;
        case "complete":
          completePlayer.seekTo(0);
          completePlayer.play();
          break;
      }
    } catch (error) {
      console.log("Error playing sound:", error);
    }
  };

  return { playSound };
};
