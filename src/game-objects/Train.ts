import { GameObject } from "./GameObject";
import { spriteAssets } from "../../assets/index";

export class Train extends GameObject {
  private static bodySpriteKey = spriteAssets.trainBody.toString();

  private trainParts: Array<Phaser.GameObjects.Image> = [];

  private requiredIntroDistance = 350;

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

  public playIntroAnimation = (dt: number, onAnimationEnd?: () => void) => {
    this.requiredIntroDistance -= dt * 0.001;

    if (this.requiredIntroDistance <= 0) {
      onAnimationEnd && onAnimationEnd();
      return;
    }

    this.trainParts.forEach(trainPart => {
      const localPosition = trainPart.getBottomCenter();
      trainPart.setPosition(
        localPosition.x + dt * 0.001,
        localPosition.y + Math.sin(dt * 0.025)
      );
    });
  };

  public playMoveAnimation = (dt: number, speed: number) => {
    this.trainParts.forEach(trainPart => {
      const localPosition = trainPart.getBottomCenter();
      trainPart.setPosition(
        localPosition.x,
        localPosition.y + Math.sin(dt * 0.01 * speed * 0.01)
      );
    });
  };

  public playWinAnimation = () => {};
}
