import * as Phaser from "phaser";
import { GameplayScene } from "./GameplayScene";
import { game } from "../main";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }

  public create() {
    this.add.rectangle(
      Phaser.Math.Between(0, game.scale.width),
      Phaser.Math.Between(0, game.scale.height),
      100,
      100,
      0x1212de
    );

    this.input.once("pointerdown", () => this.scene.start(GameplayScene.name));
  }

  public update() {
    // TODO
  }
}

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: MenuScene.name
};
