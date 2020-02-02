import * as Phaser from "phaser";
// import { HUDScene, HUDSceneEvents } from "./HUDScene";
import { Train } from "../game-objects/Train";
import { Rails } from "../game-objects/Rails";
import { TrackManager } from "../game-objects/TrackManager";
import { TableGroup } from "../game-objects/TableGroup";
import { trackData } from "../../assets/sound/track_1/";
import { Background } from "../game-objects/Background";
import { Particles } from "../game-objects/Particles";
import { HUDScene, HUDSceneEvents } from "./HUDScene";
import { startingLives } from "../data/Global";

enum GameplaySceneState {
  gameStart,
  gameplay,
  gameEnd
}

export class GameplayScene extends Phaser.Scene {
  private lives: number = startingLives;

  private hud: Phaser.Scene;
  private train = new Train();
  private rails = new Rails();
  private background = new Background();
  private particles = new Particles();

  private trackManager: TrackManager = new TrackManager();
  private railTables: TableGroup = new TableGroup();
  private currentState: GameplaySceneState = GameplaySceneState.gameStart;
  private init = false;

  constructor() {
    super(sceneConfig);
  }

  public preload() {
    this.trackManager.load(this, trackData);
    this.background.load(this);
    this.particles.load(this);
    this.rails.load(this);
    this.train.load(this);
    this.railTables.load(this);
  }

  public create() {
    this.background.initialize(this, { speed: trackData.bpm });
    this.railTables.initialize(this);

    this.trackManager.setRailTables(this.railTables);
    this.init = false;

    this.rails.initialize(this);

    this.train.initialize(this);
    this.particles.initialize(this);

    this.train.setSpeed(trackData.bpm);
    this.railTables.setSpeed(trackData.bpm);

    this.physics.add.overlap(
      this.train.trainBodySprite,
      this.railTables.missingRivets,
      (trainBodySprite, missingRivetSprite) => {
        this.handleMissingRivetCrash(
          <Phaser.Physics.Arcade.Sprite>missingRivetSprite
        );
      }
    );

    this.hud = this.scene.get(HUDScene.name);
    this.scene.launch(HUDScene.name);
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

  private moveEnvironment = (dt: number) => {
    this.railTables.move(dt);
    this.background.moveBackground();
  };

  private handleMissingRivetCrash = (
    missingRivet: Phaser.Physics.Arcade.Sprite
  ) => {
    missingRivet.disableBody();
    this.train.crash();
    this.loseLife();
  };

  private loseLife = () => {
    this.lives -= 1;
    this.hud.events.emit(HUDSceneEvents.reduceLife, this.lives);
    if (this.lives <= 0) alert("you lose :/");
  };
}

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: GameplayScene.name
};
