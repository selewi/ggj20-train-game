import { GameObject } from "./GameObject";
import { spriteAssets } from "../../assets/";
import { zIndex } from "../data/Global";

interface TableProps {
  hasRivets: boolean;
  xPosition: number;
  yPosition: number;
}

export class Table extends GameObject {
  public hasBoard: boolean = false;

  public board: Phaser.GameObjects.Image;
  public bottomRivet: Phaser.GameObjects.Image;
  public topRivet: Phaser.Physics.Arcade.Image;

  private static boardSpriteKey = spriteAssets.table;
  private static rivetSpriteKey = spriteAssets.remache;
  private static missingRivetSpriteKey = spriteAssets.notRemache;

  public load(scene: Phaser.Scene) {
    scene.load.image(Table.boardSpriteKey, spriteAssets.table);
    scene.load.image(Table.rivetSpriteKey, spriteAssets.remache);
    scene.load.image(Table.missingRivetSpriteKey, spriteAssets.notRemache);
  }
  public initialize(
    scene: Phaser.Scene,
    { hasRivets, xPosition, yPosition }: TableProps
  ) {
    const topRivetPositionX = xPosition + 73;
    const topRivetPositionY = yPosition + 30;
    const bottomRivetPositionX = xPosition + 22;
    const bottomRivetPositionY = yPosition + 80;
    const targetRivetSpriteKey = hasRivets
      ? Table.rivetSpriteKey
      : Table.missingRivetSpriteKey;

    this.hasBoard = hasRivets;

    this.board = scene.add
      .image(xPosition, yPosition, Table.boardSpriteKey)
      .setOrigin(0.1, 0)
      .setDepth(zIndex.railTable)
      .setVisible(hasRivets);

    this.topRivet = scene.physics.add
      .image(topRivetPositionX, topRivetPositionY, targetRivetSpriteKey)
      .setDepth(zIndex.topRivet);

    if (hasRivets) this.topRivet.disableBody();

    this.bottomRivet = scene.add
      .image(bottomRivetPositionX, bottomRivetPositionY, targetRivetSpriteKey)
      .setDepth(zIndex.bottomRivet);
  }

  public showBoard = (show: boolean = true) => {
    this.hasBoard = show;

    const targetRivetSpriteKey = show
      ? Table.rivetSpriteKey
      : Table.missingRivetSpriteKey;

    this.board.setVisible(show);
    this.topRivet.setTexture(targetRivetSpriteKey);
    this.bottomRivet.setTexture(targetRivetSpriteKey);

    if (show) this.topRivet.disableBody();
  };
}
