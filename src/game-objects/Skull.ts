import { GameObject } from "./GameObject";
import { spriteAssets } from "../../assets/index";

export class Skull extends GameObject {
  private static spriteKey = spriteAssets.skull;

  private sprite: Phaser.GameObjects.Sprite;

  public load = (scene: Phaser.Scene) => {
    scene.load.image(Skull.spriteKey, spriteAssets.skull);
  };

  public initialize = (scene: Phaser.Scene) => {
    this.sprite = scene.add.sprite(0, 0, Skull.spriteKey);
    console.log(this.sprite);
  };

  public update = (dt: number) => {
    // real time stuff
  };
}
