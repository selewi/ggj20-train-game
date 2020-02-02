import { GameObject } from "./GameObject";
import { TrackData } from "../data/TrackData";
import { TableGroup } from "./TableGroup";

export class TrackManager extends GameObject {
  private trackData: TrackData;
  // private eightNote: number = 0;

  private railTables: TableGroup;

  private readonly track: string = "track";
  private trackMusic: Phaser.Sound.BaseSound;
  //private middleSectionAudios: Phaser.Sound.BaseSound[] = [];

  public load = (scene: Phaser.Scene, newTrackData: TrackData) => {
    this.trackData = newTrackData;
    scene.load.audio(this.track, this.trackData.track);
  };

  public initialize = (scene: Phaser.Scene) => {
    this.trackMusic = scene.sound.add(this.track);

    this.trackMusic.play();

    // this.eightNote = 60000 / this.trackData.bpm / 2;

    const eightNoteAmountPerSection = 16;
    const distanceBetweenTables = 200;
    const tablesStartingX = 500;
    const tablesY = 550;

    let currentTablesStartingX = tablesStartingX;

    // Spawn intro tables
    for (let i = 0; i < this.trackData.intro.length; i++) {
      this.railTables.batchCreate(
        this.trackData.intro[i],
        currentTablesStartingX,
        tablesY,
        distanceBetweenTables
      );
      currentTablesStartingX +=
        eightNoteAmountPerSection * distanceBetweenTables;
    }

    // Spawn middleSection tables
    for (let i = 0; i < this.trackData.middleSections.length; i++) {
      this.railTables.batchCreate(
        this.trackData.middleSections[i],
        currentTablesStartingX,
        tablesY,
        distanceBetweenTables
      );
      currentTablesStartingX +=
        eightNoteAmountPerSection * distanceBetweenTables;
    }

    // Spawn outro tables
    for (let i = 0; i < this.trackData.outro.length; i++) {
      this.railTables.batchCreate(
        this.trackData.outro[i],
        currentTablesStartingX,
        tablesY,
        distanceBetweenTables
      );
      currentTablesStartingX +=
        eightNoteAmountPerSection * distanceBetweenTables;
    }
  };

  public setRailTables = (newRailTables: TableGroup) => {
    this.railTables = newRailTables;
  };
}
