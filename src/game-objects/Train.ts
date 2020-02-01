import { GameObject } from "./GameObject";
import { spriteAssets } from "../../assets/index";

export class Train extends GameObject {
  private static bodySpriteKey = spriteAssets.trainBody.toString();

  private trainParts: Array<Phaser.GameObjects.Image> = [];

  public load = (scene: Phaser.Scene) => {
    scene.load.image(Train.bodySpriteKey, spriteAssets.trainBody);
  };

  public initialize = (scene: Phaser.Scene) => {
    this.trainParts.push(scene.add.image(0, 500, Train.bodySpriteKey));

    this.trainParts.forEach(trainPart => {
      trainPart.setOrigin(0.5, 1);
    });
  };

  public update = (dt: number) => {
    this.trainParts.forEach(trainPart => {
      const localPosition = trainPart.getBottomCenter();
      trainPart.setPosition(
        localPosition.x,
        localPosition.y + Math.sin(dt * 0.01)
      );
    });
  };
}
