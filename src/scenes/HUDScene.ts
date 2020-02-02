import * as Phaser from "phaser";
import { startingLives } from "../data/Global";

export enum HUDSceneEvents {
  reduceLife = "reduceLife"
}

export class HUDScene extends Phaser.Scene {
  private livesText: Phaser.GameObjects.Text;

  constructor() {
    super(sceneConfig);
  }

  public create() {
    this.livesText = this.add.text(10, 10, `Lives: ${startingLives}`, {
      font: "48px Arial",
      fill: "#eeeeee"
    });

    this.events.on(HUDSceneEvents.reduceLife, this.showLives);
  }

  public showLives = (amount: number) => {
    this.livesText.setText(`Lives: ${amount}`);
  };
}

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: HUDScene.name
};
