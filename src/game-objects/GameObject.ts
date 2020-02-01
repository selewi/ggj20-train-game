import Phaser from "phaser";

export abstract class GameObject {
  public abstract load(scene: Phaser.Scene): void;
  public abstract initialize(scene: Phaser.Scene): void;
  public update(dt: number): void {}
}
