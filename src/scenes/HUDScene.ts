import * as Phaser from "phaser";
import { startingLives } from "../data/Global";
import { uiAssets } from "../../assets/";

export enum HUDSceneEvents {
  reduceLife = "reduceLife"
}

export class HUDScene extends Phaser.Scene {
  private static vignetteKey = uiAssets.vignette.toString();
  private static engineKey = uiAssets.engine.toString();

  // private livesText: Phaser.GameObjects.Text;
  private vignette: Phaser.GameObjects.Image;
  private engine: Phaser.GameObjects.Image;

  constructor() {
    super(sceneConfig);
  }

  public preload() {
    this.load.image(HUDScene.vignetteKey, uiAssets.vignette);
    this.load.image(HUDScene.engineKey, uiAssets.engine);
  }

  public create() {
    // this.livesText = this.add.text(10, 10, `Lives: ${startingLives}`, {
    //   font: "48px Arial",
    //   fill: "#eeeeee"
    // });

    this.events.on(HUDSceneEvents.reduceLife, this.showLives);

    this.vignette = this.add.image(0, 0, uiAssets.vignette);
    this.vignette.setOrigin(0, 0);
    this.vignette.setDisplaySize(1280, 720);
    this.vignette.alpha = 0.9;
    this.vignette.setDepth(-1);

    for (let i = 0; i < startingLives; i++) {
      this.renderLife(i);
    }
  }

  public renderLife = (position: number) => {
    this.engine = this.add.image(10 + 100 * position, 10, uiAssets.engine);
    this.engine.setOrigin(0, 0);
  };

  public showLives = (amount: number) => {};
}

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: HUDScene.name
};
