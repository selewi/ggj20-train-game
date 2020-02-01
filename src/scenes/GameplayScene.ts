import * as Phaser from "phaser";
import { SectionGroup } from "../game-objects/TableGroup";

export class GameplayScene extends Phaser.Scene {
  private currentTimePassed = 0;
  private sectionGroup = new SectionGroup();

  constructor() {
    super(sceneConfig);
  }

  public preload() {
    this.sectionGroup.load(this);
  }

  public create() {
    this.sectionGroup.initialize(this);
  }

  public update(dt: number) {
    this.currentTimePassed += dt * 1000000;

    console.log(this.currentTimePassed);

    if (this.currentTimePassed >= 1) {
      this.currentTimePassed = 0;

      this.sectionGroup.create([
        Math.random() > 0.5 ? true : false,
        Math.random() > 0.5 ? true : false,
        Math.random() > 0.5 ? true : false,
        Math.random() > 0.5 ? true : false,
      ]);
    }
  }
}

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: GameplayScene.name,
};
