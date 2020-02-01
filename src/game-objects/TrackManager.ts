import { GameObject } from "./GameObject";
import { TrackData } from "../data/TrackData";
import { TableGroup } from "./TableGroup";

export class TrackManager extends GameObject {
  private trackData: TrackData;
  // private eightNote: number = 0;

  private railTables: TableGroup;

  private middleSectionKeys: string[] = [];
  private middleSectionAudios: Phaser.Sound.BaseSound[] = [];

  public load = (scene: Phaser.Scene, newTrackData: TrackData) => {
    this.trackData = newTrackData;
    this.trackData.middleSections.forEach((section, index) => {
      this.middleSectionKeys.push(section.toString());
      scene.load.audio(section.toString(), section);
    });
  };

  public initialize = (scene: Phaser.Scene) => {
    this.middleSectionKeys.forEach(key => {
      this.middleSectionAudios.push(scene.sound.add(key));
    });

    this.middleSectionAudios[0].play();

    // this.eightNote = 60000 / this.trackData.bpm / 2;

    // Random amount of sections + intro + ending
    const songSectionAmount = Math.round(Math.random() * 3 + 1) + 2;
    const eightNoteAmountPerSection = 16;

    const tablesToSpawn = eightNoteAmountPerSection * songSectionAmount;
    const distanceBetweenTables = 200;

    for (let i = 0; i <= tablesToSpawn; i++) {
      this.railTables.create(true, 500 + distanceBetweenTables * i, 550);
    }
  };

  public setRailTables = (newRailTables: TableGroup) => {
    this.railTables = newRailTables;
  };
}
