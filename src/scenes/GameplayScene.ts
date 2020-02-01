import * as Phaser from "phaser";
import { HUDScene, HUDSceneEvents } from "./HUDScene";
import { Skull } from "../game-objects/Skull";

export class GameplayScene extends Phaser.Scene {
  private score: number = 0;

  private hud: Phaser.Scene;
  private skull = new Skull();

  constructor() {
    super(sceneConfig);
  }

  public preload() {
    this.skull.load(this);
  }

  public create() {
    this.skull.initialize(this);
    this.hud = this.scene.get(HUDScene.name);
    this.scene.launch(HUDScene.name);

    this.add.rectangle(400, 400, 100, 100, 0xffffff);
    this.input.on("pointerdown", this.addScore);
  }

  public update(dt: number) {
    // TODO
  }

  private addScore = () => {
    this.score += 1;
    this.hud.events.emit(HUDSceneEvents.updateScoreText, this.score);
  };
}

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: GameplayScene.name
};
