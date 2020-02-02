import { GameObject } from "./GameObject";
import { spriteAssets } from "../../assets/index";

export class Background extends GameObject {
  private firstParallax: Phaser.GameObjects.Image;
  private secondParallax: Phaser.GameObjects.Image;
  private thirdParallax: Phaser.GameObjects.Image;
  private parallax: Array<Phaser.GameObjects.Image>;
}
