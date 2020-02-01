import * as Phaser from "phaser";
import { gameScenes } from "./scenes";

export const gameConfig: Phaser.Types.Core.GameConfig = {
  title: "Sample",
  type: Phaser.AUTO,
  scale: {
    width: window.innerWidth,
    height: window.innerHeight
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  },
  parent: "game",
  backgroundColor: 0x000000,
  scene: gameScenes
};
