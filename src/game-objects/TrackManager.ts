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
  private trackErrorMargin: number = 120;
  private noteOk: Phaser.Sound.BaseSound;
  private text: Phaser.GameObjects.Text;

  public load = (scene: Phaser.Scene, newTrackData: TrackData) => {
    this.trackData = newTrackData;
    scene.load.audio(this.trackKey, this.trackData.track);
    scene.load.audio(this.beepKey, "../../assets/sprites/beep.wav");
  };

  public initialize = (scene: Phaser.Scene) => {
    this.text = scene.add.text(16, 16, this.trackSeconds.toString());

    this.trackMusic = scene.sound.add(this.trackKey);
    this.noteOk = scene.sound.add(this.beepKey);

    this.trackMusic.play();

    const eightNoteDuration = 60000 / this.trackData.bpm / 2;

    console.log("8th note " + eightNoteDuration.toString());

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
      const sectionDuration = eightNoteDuration * eightNoteAmountPerSection;
      let currentSectionId = Math.floor(this.trackSeconds / sectionDuration);
      let currentSection = this.trackData.sections[currentSectionId];
      let currentSectionPosition = Math.floor(
        this.trackSeconds - sectionDuration * currentSectionId,
      );
      let currentNoteId = Math.round(
        currentSectionPosition / eightNoteDuration,
      );
      let noteIsActive = this.railTables.noteIsActive(
        currentSection,
        currentNoteId,
      );

      let currentNoteRealTime = currentNoteId * eightNoteDuration;

      console.log("current section id: " + currentSectionId.toString());
      console.log("current section: " + currentSection.toString());
      console.log("current note id: " + currentNoteId.toString());
      console.log("note is active: " + noteIsActive.toString());
      console.log(
        "current section position: " + currentSectionPosition.toString(),
      );
      console.log("nearest note pos: " + currentNoteRealTime.toString());

      if (
        currentSectionPosition >= currentNoteRealTime - this.trackErrorMargin &&
        currentSectionPosition <= currentNoteRealTime + this.trackErrorMargin
      ) {
        if (noteIsActive) {
          // Note entered
          this.noteOk.play();
        } else {
          // Failed: destroy current table
        }
      } else {
      }
    });
  };

  public setRailTables = (newRailTables: TableGroup) => {
    this.railTables = newRailTables;
  };

  public update(dt: number) {
    this.trackSeconds += dt;

    this.text.text = this.trackSeconds.toString();
  }
}
