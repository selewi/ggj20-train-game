import { GameObject } from "./GameObject";
import { spriteAssets } from "../../assets/index";
import { zIndex } from "../data/Global";

export class Rails extends GameObject {
  private static spriteKey = spriteAssets.rails;

  private topRail: Phaser.GameObjects.Sprite;
  private bottomRail: Phaser.GameObjects.Sprite;

  public load = (scene: Phaser.Scene) => {
    scene.load.image(Rails.spriteKey, spriteAssets.rails);
  };

  public initialize = (scene: Phaser.Scene) => {
    const railOrigin = { x: 0, y: 0 };

    this.topRail = scene.add.sprite(0, 530, Rails.spriteKey);
    this.bottomRail = scene.add.sprite(0, 580, Rails.spriteKey);

    const railScale = {
      x: Math.round(scene.scale.width / this.topRail.width),
      y: 0.75
    };

    this.topRail
      .setScale(railScale.x, railScale.y)
      .setOrigin(railOrigin.x, railOrigin.y)
      .setDepth(zIndex.topRail);
    this.bottomRail
      .setScale(railScale.x, railScale.y)
      .setOrigin(railOrigin.x, railOrigin.y)
      .setDepth(zIndex.bottomRail);
  };

  public update = (dt: number) => {
    // real time stuff
  };
}
