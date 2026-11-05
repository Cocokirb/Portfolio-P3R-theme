import { useContext } from "react";
import { AudioContext } from "./audioContext";

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    return {
      playHover: () => {},
      playConfirm: () => {},
      playCancel: () => {},
      playOpenDetail: () => {},
      playCloseDetail: () => {},
      ensureBGM: () => {},
      musicVolume: 0.3,
      effectsVolume: 0.2,
      updateMusicVolume: () => {},
      updateEffectsVolume: () => {},
    };
  }
  return context;
}