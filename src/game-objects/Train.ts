import { GameObject } from "./GameObject";
import { spriteAssets } from "../../assets/index";
import { speedFactor } from "../data/Global";

export class Train extends GameObject {
  private static bodySpriteKey = spriteAssets.trainBody.toString();

  private trainParts: Array<Phaser.GameObjects.Image> = [];

  private requiredIntroDistance = 350;
  private timeAccumulator = 0;
  private speed = 0;

  public load = (scene: Phaser.Scene) => {
    scene.load.image(Train.bodySpriteKey, spriteAssets.trainBody);
  };

  public initialize = (scene: Phaser.Scene) => {
    this.trainParts.push(scene.add.image(0, 500, Train.bodySpriteKey));

    const screenOffset = 50;
    this.trainParts.forEach(trainPart => {
      trainPart.setOrigin(0.5, 1);
      trainPart.setPosition(-trainPart.width / 2 - screenOffset, 500);
    });
  };

  public setSpeed = (newSpeed: number) => {
    this.speed = newSpeed * speedFactor;
  };

  public playIntroAnimation = (dt: number, onAnimationEnd?: () => void) => {
    this.timeAccumulator += dt;
    this.requiredIntroDistance -= this.timeAccumulator * 0.001;

    if (this.requiredIntroDistance <= 0) {
      this.timeAccumulator = 0;
      onAnimationEnd && onAnimationEnd();
      return;
    }

    this.trainParts.forEach(trainPart => {
      const localPosition = trainPart.getBottomCenter();
      trainPart.setPosition(
        localPosition.x + this.timeAccumulator * 0.001,
        localPosition.y + Math.sin(this.timeAccumulator * 0.025 * this.speed)
      );
    });
  };

  public playMoveAnimation = (dt: number) => {
    this.timeAccumulator += dt;

    this.trainParts.forEach(trainPart => {
      const localPosition = trainPart.getBottomCenter();
      trainPart.setPosition(
        localPosition.x,
        localPosition.y + Math.sin(this.timeAccumulator * 0.025 * this.speed)
      );
    });
  };

  public playWinAnimation = () => {};
}
