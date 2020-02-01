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
    const railOrigin = { x: 0, y: 0 };

    this.topRail = scene.add.sprite(0, 600, Rails.spriteKey);
    this.bottomRail = scene.add.sprite(0, 500, Rails.spriteKey);

    const railScale = {
      x: Math.round(scene.scale.width / this.topRail.width),
      y: 1
    };

    this.topRail
      .setScale(railScale.x, railScale.y)
      .setOrigin(railOrigin.x, railOrigin.y);
    this.bottomRail
      .setScale(railScale.x, railScale.y)
      .setOrigin(railOrigin.x, railOrigin.y);
  };

  public update = (dt: number) => {
    // real time stuff
  };
}
