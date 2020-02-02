import * as Phaser from "phaser";
// import { HUDScene, HUDSceneEvents } from "./HUDScene";
import { Train } from "../game-objects/Train";
import { Rails } from "../game-objects/Rails";
import { TrackManager } from "../game-objects/TrackManager";
import { TableGroup } from "../game-objects/TableGroup";
import { trackData } from "../../assets/sound/track_1/";

enum GameplaySceneState {
  gameStart,
  gameplay,
  gameEnd
}

export class GameplayScene extends Phaser.Scene {
  // private score: number = 0;

  // private hud: Phaser.Scene;
  private train = new Train();
  private rails = new Rails();

  private trackManager: TrackManager = new TrackManager();
  private railTables: TableGroup = new TableGroup();
  private currentState: GameplaySceneState = GameplaySceneState.gameStart;
  private init = false;

  constructor() {
    super(sceneConfig);
  }

  public preload() {
    this.trackManager.load(this, trackData);
    this.rails.load(this);
    this.train.load(this);
    this.railTables.load(this);
  }

  public create() {
    this.railTables.initialize(this);

    this.trackManager.setRailTables(this.railTables);
    this.init = false;

    this.rails.initialize(this);

    this.train.initialize(this);

    this.train.setSpeed(trackData.bpm);
    this.railTables.setSpeed(trackData.bpm);

    // this.hud = this.scene.get(HUDScene.name);
    // this.scene.launch(HUDScene.name);
    // this.input.on("pointerdown", this.addScore);
  }

  public update(t: number, dt: number) {
    switch (this.currentState) {
      case GameplaySceneState.gameStart:
        this.handleGameStart(dt);
        break;
      case GameplaySceneState.gameplay:
        if (!this.init) {
          this.trackManager.initialize(this);
          this.init = true;
        }
        this.handleGameplay(dt);
        break;
      case GameplaySceneState.gameEnd:
        this.handleGameEnd(dt);
        break;
    }
  }

  private handleGameStart = (dt: number) => {
    this.train.playIntroAnimation(
      dt,
      () => (this.currentState = GameplaySceneState.gameplay)
    );
  };

  private handleGameplay = (dt: number) => {
    this.trackManager.update(dt);
    this.train.playMoveAnimation(dt);
    this.moveEnvironment(dt);
  };

  private handleGameEnd = (dt: number) => {
    this.train.playWinAnimation(dt);
  };

  // private addScore = () => {
  //   this.score += 1;
  //   this.hud.events.emit(HUDSceneEvents.updateScoreText, this.score);
  // };

  private moveEnvironment = (dt: number) => {
    this.railTables.move(dt);
    // Move parallax
  };
}

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: GameplayScene.name
};
