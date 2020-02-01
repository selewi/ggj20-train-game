import { GameObject } from "./GameObject";
import { TrackData } from "../data/TrackData";
import { TableGroup } from "./TableGroup";

export class TrackManager extends GameObject {
  // private trackData: TrackData;
  // private eightNote: number = 0;

  private tableGroup: TableGroup = new TableGroup();

  public load = (scene: Phaser.Scene) => {
    this.tableGroup.load(scene);
  };
  public initialize = (scene: Phaser.Scene) => {
    this.tableGroup.initialize(scene);
  };

  public loadTrack = (newTrackData?: TrackData) => {
    // this.trackData = newTrackData;
    // this.eightNote = 60000 / this.trackData.bpm / 2;

    // Random amount of sections + intro + ending
    const songSectionAmount = Math.round(Math.random() * 3 + 1) + 2;
    const eightNoteAmountPerSection = 16;

    const tablesToSpawn = eightNoteAmountPerSection * songSectionAmount;
    const distanceBetweenTables = 150;

    for (let i = 0; i <= tablesToSpawn; i++) {
      this.tableGroup.create(500 + distanceBetweenTables * i, 550);
    }
  };
}
