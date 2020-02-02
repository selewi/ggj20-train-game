import { GameObject } from "./GameObject";
import { spriteAssets } from "../../assets/index";

export class Background extends GameObject {
  public static baseBackgroundSpriteKey = spriteAssets.baseBackground;

  public static spriteKeysBackground = [
    spriteAssets.parallaxBackground[0].toString(),
    spriteAssets.parallaxBackground[1].toString(),
    spriteAssets.parallaxBackground[2].toString()
  ];

  private BPM = 120 * 0.01;
  private parallax: Array<Phaser.GameObjects.TileSprite> = [];

  public load = (scene: Phaser.Scene) => {
    scene.load.image(
      Background.baseBackgroundSpriteKey,
      spriteAssets.baseBackground
    );
    for (let i = 0; i < spriteAssets.parallaxBackground.length; i++) {
      scene.load.image(
        Background.spriteKeysBackground[i],
        spriteAssets.parallaxBackground[i]
      );
    }
  };

  public initialize = (scene: Phaser.Scene) => {
    scene.add.sprite(0, 0, Background.baseBackgroundSpriteKey).setOrigin(0, 0);

    for (let i = 0; i < Background.spriteKeysBackground.length; i++) {
      let backgrounds = Background.spriteKeysBackground[i];
      this.parallax.push(
        scene.add.tileSprite(640, 360, 1280, 720, backgrounds)
      );
    }
  };
  public moveBackground = () => {
    for (let i = this.parallax.length - 1; i >= 0; i--) {
      if (i === 0) {
        this.parallax[i].tilePositionX += this.BPM / 10;
      } else {
        let acceleration = i * Math.pow(3, i);
        let parallaxSpeed = this.BPM + acceleration;
        this.parallax[i].tilePositionX += parallaxSpeed;
      }
    }
  };
}
