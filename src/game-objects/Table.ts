import { GameObject } from "./GameObject";
import { spriteAssets } from "../../assets/";

export class Table extends GameObject {
  private static boardSpriteKey = spriteAssets.table;
  private static rivetSpriteKey = spriteAssets.remache;
  private static missingRivetSpriteKey = spriteAssets.notRemache;

  public load(scene: Phaser.Scene) {}
  public initialize(scene: Phaser.Scene) {}
}
