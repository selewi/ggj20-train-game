import Phaser from "phaser";

export abstract class GameObject {
  public abstract load(scene: Phaser.Scene, props: {}): void;
  public abstract initialize(scene: Phaser.Scene, props: {}): void;
  public update(dt: number): void {}
}
