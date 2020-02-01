import * as Phaser from "phaser";
import { Button } from "../UI/Button";
import { GameplayScene } from "./GameplayScene";
import { game } from "../main";

export class MenuScene extends Phaser.Scene {
  private playButton: Button = new Button();

  constructor() {
    super(sceneConfig);
  }

  public preload() {
    this.playButton.load(this);
  }

  public create() {
    this.playButton.initialize(this, {
      text: "Start Ride",
      position: {
        x: game.scale.width / 2,
        y: game.scale.height * 0.75
      },
      onClick: this.startGame
    });
  }

  private startGame = () => {
    this.scene.start(GameplayScene.name);
  };
}

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: MenuScene.name
};
