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

  public speed: number = 0;

  private tables: Table[] = [];
  private distanceBetweenTables: number = 200;

  public load = (scene: Phaser.Scene) => {
    new Table().load(scene);
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
  }

  public noteIsActive(section: string, noteId: number) {
    let note: string = section.split("")[noteId];
    let noteIsActive = Boolean(parseInt(note));
    return noteIsActive;
  }
}
