import * as Phaser from "phaser";
import { spriteAssets } from "../../assets";
import { GameObject } from "./GameObject";

export class TableGroup extends GameObject {
  public static spriteKey: string = spriteAssets.table.toString();

  public group: Phaser.GameObjects.Group;

  public load = (scene: Phaser.Scene) => {
    scene.load.image(TableGroup.spriteKey, spriteAssets.table);
  };

  public initialize = (scene: Phaser.Scene) => {
    this.group = scene.add.group();
  };

  public create(positionX: number, positionY: number) {
    this.group.create(positionX, positionY, TableGroup.spriteKey);
  }
}
