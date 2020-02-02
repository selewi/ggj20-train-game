import * as Phaser from "phaser";
import { spriteAssets } from "../../assets";
import { GameObject } from "./GameObject";
import { speedFactor, zIndex } from "../data/Global";

export class TableGroup extends GameObject {
  public static spriteKeyTable: string = spriteAssets.table.toString();
  public static spriteKeyRemache = spriteAssets.remache.toString();
  public static spriteKeyNotRemache = spriteAssets.notRemache.toString();

  public group: Phaser.GameObjects.Group;
  public missingRivets: Phaser.Physics.Arcade.Group;

  public speed: number = 0;

  public load = (scene: Phaser.Scene) => {
    scene.load.image(TableGroup.spriteKeyTable, spriteAssets.table);
    scene.load.image(TableGroup.spriteKeyRemache, spriteAssets.remache);
    scene.load.image(TableGroup.spriteKeyNotRemache, spriteAssets.notRemache);
  };

  public initialize = (scene: Phaser.Scene) => {
    this.group = scene.add.group();
    this.missingRivets = scene.physics.add.group();
  };

  public create(hasTable: boolean, positionX: number, positionY: number) {
    const topRivetPositionX = positionX + 73;
    const topRivetPositionY = positionY + 30;
    const bottomRivetPositionX = positionX + 22;
    const bottomRivetPositionY = positionY + 80;

    if (hasTable) {
      const table: Phaser.GameObjects.Image = this.group.create(
        positionX,
        positionY,
        TableGroup.spriteKeyTable
      );
      table.setOrigin(0.1, 0).setDepth(zIndex.railTable);

      // Draw top rivet
      this.group
        .create(
          topRivetPositionX,
          topRivetPositionY,
          TableGroup.spriteKeyRemache
        )
        .setDepth(zIndex.topRivet);

      // Draw bottom rivet
      this.group
        .create(
          bottomRivetPositionX,
          bottomRivetPositionY,
          TableGroup.spriteKeyRemache
        )
        .setDepth(zIndex.bottomRivet);
    } else {
      // Draw empty top rivet
      Phaser.GameObjects.Image = this.missingRivets
        .create(
          topRivetPositionX,
          topRivetPositionY - 10,
          TableGroup.spriteKeyNotRemache
        )
        .setDepth(zIndex.topRivet);

      // Draw empty bottom rivet
      this.group
        .create(
          bottomRivetPositionX,
          bottomRivetPositionY - 10,
          TableGroup.spriteKeyNotRemache
        )
        .setDepth(zIndex.bottomRivet);
    }
  }

  public batchCreate(
    batch: string,
    positionX: number,
    positionY: number,
    xSeparation: number
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

    this.missingRivets.children.iterate(rivet => {
      const rivetImage = <Phaser.GameObjects.Image>rivet;
      rivetImage.setPosition(rivetImage.x - dt * syncSpeed, rivetImage.y);
    });
  }

  public noteIsActive(section: string, noteId: number) {
    let note: string = section.split("")[noteId];
    let noteIsActive = Boolean(parseInt(note));
    return noteIsActive;
  }
}
