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
      let player;
      switch (type) {
        case "flip":
          player = flipPlayer;
          break;
        case "match":
          player = matchPlayer;
          break;
        case "complete":
          player = completePlayer;
          break;
      }

      if (player) {
        player.pause();
        player.seekTo(0);
        player.play();
      }
    } catch (error) {
      console.log(`Error playing ${type} sound:`, error);
    }
  };

  return { playSound };
};
