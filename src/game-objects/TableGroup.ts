import * as Phaser from "phaser";
import { spriteAssets } from "../../assets";
import { GameObject } from "./GameObject";
import { speedFactor, zIndex } from "../data/Global";
import { Table } from "./Table";

interface TableGroupProps {
  boardSequence: string;
}

export class TableGroup extends GameObject {
  public static spriteKeyTable: string = spriteAssets.table.toString();
  public static spriteKeyRemache = spriteAssets.remache.toString();
  public static spriteKeyNotRemache = spriteAssets.notRemache.toString();
  public static spriteKeyFrontFloor = spriteAssets.railsFrontFloor.toString();
  public static spriteKeyBackFloor = spriteAssets.railsBackFloor.toString();

  private frontFloor: Phaser.GameObjects.TileSprite;
  private backFloor: Phaser.GameObjects.TileSprite;

  public speed: number = 0;
  public tables: Table[] = [];

  private distanceBetweenTables: number = 200;

  public load = (scene: Phaser.Scene) => {
    new Table().load(scene);
    scene.load.image(
      TableGroup.spriteKeyFrontFloor,
      spriteAssets.railsFrontFloor
    );
    scene.load.image(
      TableGroup.spriteKeyBackFloor,
      spriteAssets.railsBackFloor
    );
  };

  public initialize = (scene: Phaser.Scene, props: TableGroupProps) => {
    const tablesStartingX = 500;
    const tablesStartingY = 520;
    let currentTablesStartingX = tablesStartingX;

    for (let i = 0; i < props.boardSequence.length; i++) {
      const hasRivets: boolean = !parseInt(props.boardSequence[i]);
      const tableInstance = new Table();
      tableInstance.initialize(scene, {
        hasRivets,
        xPosition: currentTablesStartingX,
        yPosition: tablesStartingY
      });
      this.tables.push(tableInstance);

      currentTablesStartingX += this.distanceBetweenTables;
    }

    this.frontFloor = scene.add
      .tileSprite(640, 400, 1280, 720, TableGroup.spriteKeyFrontFloor)
      .setDepth(zIndex.froontFloor);
    this.backFloor = scene.add
      .tileSprite(640, 400, 1280, 720, TableGroup.spriteKeyBackFloor)
      .setDepth(zIndex.backFloor);
  };

  public move(dt: number, speed: number) {
    const syncSpeed = dt * (1 / speed) * this.distanceBetweenTables;

    this.tables.forEach(table => {
      table.board.setPosition(table.board.x - syncSpeed, table.board.y);

      table.bottomRivet.setPosition(
        table.bottomRivet.x - syncSpeed,
        table.bottomRivet.y
      );

      table.topRivet.setPosition(
        table.topRivet.x - syncSpeed,
        table.topRivet.y
      );
    });

    this.frontFloor.tilePositionX = this.frontFloor.tilePositionX + syncSpeed;
    this.backFloor.tilePositionX = this.backFloor.tilePositionX + syncSpeed;
  }

  public noteIsActive(section: string, noteId: number) {
    let note: string = section.split("")[noteId];
    let noteIsActive = Boolean(parseInt(note));
    return noteIsActive;
  }
}
