import * as Phaser from "phaser";
import { HUDScene, HUDSceneEvents } from "./HUDScene";
import { Train } from "../game-objects/Train";

enum GameplaySceneState {
  gameStart,
  gameplay,
  gameEnd
}

export class GameplayScene extends Phaser.Scene {
  private score: number = 0;

  private hud: Phaser.Scene;
  private train = new Train();

  private currentState: GameplaySceneState = GameplaySceneState.gameStart;

  constructor() {
    super(sceneConfig);
  }

  public preload() {
    this.train.load(this);
  }

  public create() {
    this.train.initialize(this);

    this.hud = this.scene.get(HUDScene.name);
    this.scene.launch(HUDScene.name);

    this.add.rectangle(400, 400, 100, 100, 0xffffff);
    this.input.on("pointerdown", this.addScore);
  }

  public update(dt: number) {
    switch (this.currentState) {
      case GameplaySceneState.gameStart:
        this.handleGameStart(dt);
        break;
      case GameplaySceneState.gameplay:
        this.handleGameplay(dt);
        break;
      case GameplaySceneState.gameEnd:
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
    this.train.playMoveAnimation(dt, 120);
  };

  // private handleGameEnd = (dt: number) => {};

  private addScore = () => {
    this.score += 1;
    this.hud.events.emit(HUDSceneEvents.updateScoreText, this.score);
  };
}

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: GameplayScene.name
};
