import * as Phaser from "phaser";
import { GameObject } from "../game-objects/GameObject";
import { uiAssets } from "../../assets";

interface ButtonProps {
  text?: string;
  position?: {
    x: number;
    y: number;
  };
  origin?: {
    x: number;
    y: number;
  };
  onClick?: () => void;
}

export class Button extends GameObject {
  private static pressedSpriteKey = uiAssets.button.pressed.toString();
  private static releasedSpriteKey = uiAssets.button.released.toString();

  private sprite: Phaser.GameObjects.Sprite;
  private text: Phaser.GameObjects.Text;

  public load(scene: Phaser.Scene) {
    scene.load.image(Button.releasedSpriteKey, uiAssets.button.released);
    scene.load.image(Button.pressedSpriteKey, uiAssets.button.pressed);
  }

  public initialize(scene: Phaser.Scene, props?: ButtonProps) {
    const {
      text = "foo",
      position = { x: 0, y: 0 },
      origin = { x: 0.5, y: 0.5 },
      onClick = () => {}
    } = props || {};

    this.sprite = scene.add
      .sprite(position.x, position.y, Button.releasedSpriteKey)
      .setInteractive();
    this.sprite.setOrigin(origin.x, origin.y);
    this.sprite.once("pointerdown", this.setPressedSprite);
    this.sprite.once("pointerup", () => {
      onClick();
      this.setPressedSprite(false);
    });
    this.text = scene.add.text(position.x, position.y, text, {
      font: "24px Kelly Slab",
      fill: "#eeeeee"
    });
    this.text.setOrigin(origin.x, origin.y);
  }

  private setPressedSprite = (isPressed: boolean = true) => {
    this.sprite.setTexture(
      isPressed ? Button.pressedSpriteKey : Button.releasedSpriteKey
    );
  };
}
