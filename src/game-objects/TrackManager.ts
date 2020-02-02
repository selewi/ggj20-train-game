import { GameObject } from "./GameObject";
import { TrackData } from "../data/TrackData";
import { TableGroup } from "./TableGroup";

interface TrackManagerProps {
  successCallback: (noteIndex: number) => void;
  failCallback: () => void;
}

export class TrackManager extends GameObject {
  private trackData: TrackData;
  private railTables: TableGroup;

  private readonly trackKey: string = "track";
  private readonly beepKey: string = "beep";
  private trackMusic: Phaser.Sound.BaseSound;
  private trackSeconds: number = 0;
  private trackErrorMargin: number = 120;
  private text: Phaser.GameObjects.Text;

  public load = (scene: Phaser.Scene, newTrackData: TrackData) => {
    this.trackData = newTrackData;
    scene.load.audio(this.trackKey, this.trackData.track);
    scene.load.audio(this.beepKey, "../../assets/sprites/beep.wav");
  };

  public initialize = (scene: Phaser.Scene, props: TrackManagerProps) => {
    this.text = scene.add.text(16, 16, this.trackSeconds.toString());

    this.trackMusic = scene.sound.add(this.trackKey);
    this.trackMusic.play();

    const eightNoteDuration = 60000 / this.trackData.bpm / 2;

    const eightNoteAmountPerSection = 16;
    const distanceBetweenTables = 200;
    const tablesStartingX = 500;
    const tablesY = 520;

    let currentTablesStartingX = tablesStartingX;

    // Spawn tables
    for (let i = 0; i < this.trackData.sections.length; i++) {
      this.railTables.batchCreate(
        this.trackData.sections[i],
        currentTablesStartingX,
        tablesY,
        distanceBetweenTables
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
        this.trackSeconds - sectionDuration * currentSectionId
      );
      let currentNoteId = Math.round(
        currentSectionPosition / eightNoteDuration
      );
      let noteIsActive = this.railTables.noteIsActive(
        currentSection,
        currentNoteId
      );

      let currentNoteRealTime = currentNoteId * eightNoteDuration;

      console.log("current section id: " + currentSectionId.toString());
      console.log("current section: " + currentSection.toString());
      console.log("current note id: " + currentNoteId.toString());
      console.log("note is active: " + noteIsActive.toString());
      console.log(
        "current section position: " + currentSectionPosition.toString()
      );
      console.log("nearest note pos: " + currentNoteRealTime.toString());

      if (
        currentSectionPosition <= currentNoteRealTime - this.trackErrorMargin &&
        currentSectionPosition >= currentNoteRealTime + this.trackErrorMargin
      ) {
        return;
      }

      const absNoteIndex = 0;
      noteIsActive ? props.successCallback(absNoteIndex) : props.failCallback();
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
