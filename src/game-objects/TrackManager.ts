import { GameObject } from "./GameObject";
import { TrackData } from "../data/TrackData";
import { TableGroup } from "./TableGroup";

interface TrackManagerProps {
  speed: number;
  successCallback: (noteIndex: number) => void;
  failCallback: () => void;
}

export class TrackManager extends GameObject {
  public railTables: TableGroup = new TableGroup();
  private trackData: TrackData;

  private readonly trackKey: string = "track";
  private readonly beepKey: string = "beep";
  private trackMusic: Phaser.Sound.BaseSound;
  private trackSeconds: number = 0;
  private trackErrorMargin: number = 120;
  private eightNoteDuration: number = 0;

  public load = (scene: Phaser.Scene, newTrackData: TrackData) => {
    this.trackData = newTrackData;

    scene.load.audio(this.trackKey, this.trackData.track);
    scene.load.audio(this.beepKey, "../../assets/sprites/beep.wav");

    this.railTables.load(scene);
  };

  public initialize = (scene: Phaser.Scene, props: TrackManagerProps) => {
    this.trackMusic = scene.sound.add(this.trackKey);

    this.eightNoteDuration = 60000 / this.trackData.bpm / 2;

    const eightNoteAmountPerSection = 16;

    let boardSequence: string = "";
    this.trackData.sections.forEach(section => {
      boardSequence = boardSequence.concat(section);
    });
    this.railTables.initialize(scene, { boardSequence });

    // Declare player input event
    scene.input.on("pointerdown", () => {
      const sectionDuration =
        this.eightNoteDuration * eightNoteAmountPerSection;
      let currentSectionId = Math.floor(this.trackSeconds / sectionDuration);
      let currentSection = this.trackData.sections[currentSectionId];
      let currentSectionPosition = Math.floor(
        this.trackSeconds - sectionDuration * currentSectionId
      );
      let currentNoteId = Math.round(
        currentSectionPosition / this.eightNoteDuration
      );
      let noteIsActive = this.railTables.noteIsActive(
        currentSection,
        currentNoteId
      );

      let currentNoteRealTime = currentNoteId * this.eightNoteDuration;

      console.log("current section id: " + currentSectionId.toString());
      console.log("current section: " + currentSection.toString());
      console.log("current note id: " + currentNoteId.toString());
      console.log("note is active: " + noteIsActive.toString());
      console.log(
        "current section position: " + currentSectionPosition.toString()
      );
      console.log("nearest note pos: " + currentNoteRealTime.toString());

      const absNoteIndex = 0;
      if (
        currentSectionPosition >= currentNoteRealTime - this.trackErrorMargin &&
        currentSectionPosition <= currentNoteRealTime + this.trackErrorMargin
      ) {
        return;
      }

      noteIsActive ? props.successCallback(absNoteIndex) : props.failCallback();
    });
  };

  public playMusic = () => {
    if (this.trackMusic.isPlaying) return;
    this.trackMusic.play();
  };

  public update(dt: number) {
    this.railTables.move(dt, this.eightNoteDuration);
  }
}
