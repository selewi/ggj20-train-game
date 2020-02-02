import * as Phaser from "phaser";
import { GameObject } from "../game-objects/GameObject";

interface TextProps {
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

export class Title extends GameObject {
  private text: Phaser.GameObjects.Text;

  public load(scene: Phaser.Scene) {}

  public initialize(scene: Phaser.Scene, props?: TextProps) {
    const {
      text = "foo",
      position = { x: 0, y: 0 },
      origin = { x: 0.5, y: 0.5 }
    } = props || {};

    this.text = scene.add.text(position.x, position.y, text, {
      font: "200px Kelly Slab",
      fill: "#000",
      stroke: "#fff",
      strokeThickness: 6
    });
    this.text.setOrigin(origin.x, origin.y);
  }
}
