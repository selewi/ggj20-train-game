import * as Phaser from "phaser";
import { spriteAssets } from "../../assets";
import { GameObject } from "./GameObject";
import { speedFactor } from "../data/Global";

export class TableGroup extends GameObject {
  public static spriteKeyTable: string = spriteAssets.table.toString();
  public static spriteKeyRemache = spriteAssets.remache.toString();
  public static spriteKeyNotRemache = spriteAssets.notRemache.toString();

  public group: Phaser.GameObjects.Group;

  private speed: number = 0;

  public load = (scene: Phaser.Scene) => {
    scene.load.image(TableGroup.spriteKeyTable, spriteAssets.table);
    scene.load.image(TableGroup.spriteKeyRemache, spriteAssets.remache);
    scene.load.image(TableGroup.spriteKeyNotRemache, spriteAssets.notRemache);
  };

  public initialize = (scene: Phaser.Scene) => {
    this.group = scene.add.group();
  };

  public create(hasTable: boolean, positionX: number, positionY: number) {
    if (hasTable) {
      const table: Phaser.GameObjects.Image = this.group.create(
        positionX,
        positionY,
        TableGroup.spriteKeyTable,
      );
      table.setOrigin(0.1, 0);

      // Dibujar remache
      const remache: Phaser.GameObjects.Image = this.group.create(
        positionX,
        positionY,
        TableGroup.spriteKeyRemache,
      );
      remache.setOrigin(0.1, 0);
    } else {
      // Dibujar remache vacio
      const notRemache: Phaser.GameObjects.Image = this.group.create(
        positionX,
        positionY,
        TableGroup.spriteKeyNotRemache,
      );
      notRemache.setOrigin(0.1, 0);
    }
  }

  public batchCreate(
    batch: string,
    positionX: number,
    positionY: number,
    xSeparation: number,
  ) {
    let batchArray: string[] = batch.split("");

    for (let i = 0; i < batchArray.length; i++) {
      let hasTable = !Boolean(parseInt(batchArray[i]));
      this.create(hasTable, positionX + xSeparation * i, positionY);
    }
  }

  public setSpeed(newSpeed: number) {
    this.speed = newSpeed * speedFactor;
  }

  public move(dt: number, move: boolean = true) {
    const distanceBetweenTables = 200;
    const eightNoteDuration = 0.25;
    const syncSpeed = (0.001 / eightNoteDuration) * distanceBetweenTables;

    this.group.children.iterate(child => {
      const childImage = <Phaser.GameObjects.Image>child;
      childImage.setPosition(childImage.x - dt * syncSpeed, childImage.y);
    });
  }
}
