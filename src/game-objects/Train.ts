import { GameObject } from "./GameObject";
import { spriteAssets } from "../../assets/index";

export class Train extends GameObject {
  private static bodySpriteKey = spriteAssets.trainBody.toString();

  private trainParts: Array<Phaser.GameObjects.Image> = [];

  public load = (scene: Phaser.Scene) => {
    scene.load.image(Train.bodySpriteKey, spriteAssets.trainBody);
  };

  public initialize = (scene: Phaser.Scene) => {
    this.trainParts.push(scene.add.image(0, 0, Train.bodySpriteKey));
  };
}
