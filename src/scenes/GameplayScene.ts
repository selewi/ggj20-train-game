import * as Phaser from "phaser";
import { HUDScene, HUDSceneEvents } from "./HUDScene";
import { Background } from "../game-objects/Background";
import { Particles } from "../game-objects/Particles";

export class GameplayScene extends Phaser.Scene {
  private score: number = 0;
  private hud: Phaser.Scene;
  private background = new Background();
  private particles = new Particles();

  constructor() {
    super(sceneConfig);
  }

  public preload() {
    this.background.load(this);
    this.particles.load(this);
  }

  public create() {
    this.background.initialize(this);
    this.particles.initialize(this);
    this.hud = this.scene.get(HUDScene.name);
    this.scene.launch(HUDScene.name);

    this.input.on("pointerdown", this.addScore);
  }

  public update(dt: number) {
    // TODO
    this.background.moveBackground();
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
