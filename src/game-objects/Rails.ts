import { GameObject } from "./GameObject";
import { spriteAssets } from "../../assets/index";

export class Rails extends GameObject {
  private static spriteKey = spriteAssets.rails;

  private topRail: Phaser.GameObjects.Sprite;
  private bottomRail: Phaser.GameObjects.Sprite;

  public load = (scene: Phaser.Scene) => {
    scene.load.image(Rails.spriteKey, spriteAssets.rails);
  };

  public initialize = (scene: Phaser.Scene) => {
    this.topRail = scene.add.sprite(200, 600, Rails.spriteKey);
    this.bottomRail = scene.add.sprite(200, 500, Rails.spriteKey);
    this.topRail.setScale(3.5, 1);
    this.bottomRail.setScale(3.5, 1);
  };

  public update = (dt: number) => {
    // real time stuff
  };
}
