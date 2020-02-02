import { GameObject } from "./GameObject";
import { TrackData } from "../data/TrackData";
import { TableGroup } from "./TableGroup";

export class TrackManager extends GameObject {
  private trackData: TrackData;
  // private eightNote: number = 0;

  private railTables: TableGroup;

  private readonly trackKey: string = "track";
  private readonly beepKey: string = "beep";
  private trackMusic: Phaser.Sound.BaseSound;
  private trackSeconds: number = 0;
  private trackErrorMargin: number = 0.1;
  private noteOk: Phaser.Sound.BaseSound;

  public load = (scene: Phaser.Scene, newTrackData: TrackData) => {
    this.trackData = newTrackData;
    scene.load.audio(this.trackKey, this.trackData.track);
    scene.load.audio(this.beepKey, "assets/sound/sfx/beep.wav");
  };

  public initialize = (scene: Phaser.Scene) => {
    this.trackMusic = scene.sound.add(this.trackKey);

    this.trackMusic.play();

    const eightNoteDuration = 60000 / this.trackData.bpm / 2;

    const eightNoteAmountPerSection = 16;
    const distanceBetweenTables = 200;
    const tablesStartingX = 500;
    const tablesY = 500;

    let currentTablesStartingX = tablesStartingX;

    // Spawn tables
    for (let i = 0; i < this.trackData.sections.length; i++) {
      this.railTables.batchCreate(
        this.trackData.sections[i],
        currentTablesStartingX,
        tablesY,
        distanceBetweenTables,
      );
      currentTablesStartingX +=
        eightNoteAmountPerSection * distanceBetweenTables;
    }

    // Declare player input event
    scene.input.on("pointerdown", () => {
      console.log("uhhhh you touch my tralalah");
      const sectionDuration = eightNoteDuration * eightNoteAmountPerSection;
      let currentSection = Math.floor(this.trackSeconds / sectionDuration);
      let currentSectionPosition = Math.floor(
        this.trackSeconds - sectionDuration * currentSection,
      );
      let nearestNoteToCurPosition = Math.round(
        currentSectionPosition / eightNoteDuration,
      );
      let nearestNoteRealTime = nearestNoteToCurPosition * eightNoteDuration;

      if (
        this.trackSeconds >= nearestNoteRealTime - this.trackErrorMargin ||
        this.trackSeconds <= nearestNoteRealTime + this.trackErrorMargin
      ) {
        // Note entered
        this.noteOk.play();
      }

      //let timestampHasNote = this.trackSeconds;
    });
  };

  public setRailTables = (newRailTables: TableGroup) => {
    this.railTables = newRailTables;
  };

  public update(dt: number) {
    this.trackSeconds += dt;
  }
}
