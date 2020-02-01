import * as Phaser from "phaser";
import { spriteAssets } from "../../assets";
import { GameObject } from "./GameObject";

export class TableGroup extends GameObject {
  public static spriteKey: string = spriteAssets.table.toString();

  public group: Phaser.GameObjects.Group;

  private speed: number = 0;

  public load = (scene: Phaser.Scene) => {
    scene.load.image(TableGroup.spriteKey, spriteAssets.table);
  };

  public initialize = (scene: Phaser.Scene) => {
    this.group = scene.add.group();
  };

  public create(hasRemache: boolean, positionX: number, positionY: number) {
    if (hasRemache) {
      const table: Phaser.GameObjects.Image = this.group.create(
        positionX,
        positionY,
        TableGroup.spriteKey,
      );
      table.setOrigin(0.1, 0);

      // Dibujar remache
    } else {
      // Dibujar remache vacio
    }
  }

  public setSpeed(newSpeed: number) {
    this.speed = newSpeed * speedFactor;
  }

  public move(dt: number, move: boolean = true) {
    this.group.children.iterate(child => {
      const childImage = <Phaser.GameObjects.Image>child;
      childImage.setPosition(childImage.x - dt * this.speed, childImage.y);
    });
  }
}
