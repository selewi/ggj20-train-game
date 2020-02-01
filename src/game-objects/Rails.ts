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
    const railScale = { x: 3.5, y: 1 };
    const railOrigin = { x: 0.5, y: 0.5 };

    this.topRail = scene.add.sprite(200, 600, Rails.spriteKey);
    this.bottomRail = scene.add.sprite(200, 500, Rails.spriteKey);
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
