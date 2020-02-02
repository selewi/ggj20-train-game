import * as Phaser from "phaser";
import { Button } from "../UI/Button";
import { GameplayScene } from "./GameplayScene";
import { game } from "../main";
import { soundAssets, uiAssets } from "../../assets/";

export class MenuScene extends Phaser.Scene {
  private musicAssetKey = soundAssets.menuMusic.toString();
  private backgroundKey = uiAssets.background.toString();

  private track: Phaser.Sound.BaseSound;
  private background: Phaser.GameObjects.Image;

  private playButton: Button = new Button();
  constructor() {
    super(sceneConfig);
  }

  public preload() {
    this.load.image(this.backgroundKey, uiAssets.background);
    this.playButton.load(this);
    this.load.audio(this.musicAssetKey, soundAssets.menuMusic);
  }

  public create() {
    this.track = this.sound.add(this.musicAssetKey, { loop: true, volume: 0 });
    this.track.play();
    this.tweens.add({
      targets: this.track,
      volume: 1,
      duration: 500
    });

    this.playButton.initialize(this, {
      text: "Start Ride",
      position: {
        x: game.scale.width / 2,
        y: game.scale.height * 0.94
      },
      onClick: this.startGame
    });

    this.background = this.add.image(0, 0, uiAssets.background);
    this.background.setOrigin(0, 0);
    this.background.setDisplaySize(1280, 720);
    this.background.setDepth(-1);
  }

  private startGame = () => {
    this.track.stop();
    this.scene.start(GameplayScene.name);
  };
}

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: MenuScene.name
};
