import { GameObject } from "./GameObject";
import { TrackData } from "../data/TrackData";

export class TrackManager extends GameObject {
  private trackData: TrackData;
  private eightNote: number = 0;

  public load = (scene: Phaser.Scene) => {};
  public initialize = (scene: Phaser.Scene) => {};

  public loadTrack = (newTrackData: TrackData) => {
    this.trackData = newTrackData;
    this.eightNote = 60000 / this.trackData.bpm / 2;

    // Random amount of sections + intro + ending
    const songSectionAmount = Math.round(Math.random() * 3 + 1) + 2;
    const eightNoteAmountPerSection = 16;

    const tablesToSpawn = eightNoteAmountPerSection * songSectionAmount;
    const distanceBetweenTables = 64;

    for (let i = 0; i <= tablesToSpawn; i++) {
      // spawnTable(spawnerPos + distanceBetweenTables * i, 500);
    }
  };
}
