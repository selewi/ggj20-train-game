import { GameObject } from "./GameObject";
import { spriteAssets, soundAssets } from "../../assets/";
import { speedFactor } from "../data/Global";
import { Tweens } from "phaser";

export class Train extends GameObject {
  private static bodySpriteKey = spriteAssets.trainBody.toString();
  private static runAudioKey = soundAssets.sfx.trainRun.toString();

  private trainParts: Array<Phaser.GameObjects.Image> = [];
  private runAudioTrack: Phaser.Sound.BaseSound;

  private requiredIntroDistance = 400;
  private timeAccumulator = 0;
  private speed = 0;

  private fadeoutRunAudioTween: Tweens.Tween;

  public load = (scene: Phaser.Scene) => {
    scene.load.image(Train.bodySpriteKey, spriteAssets.trainBody);
    scene.load.audio(Train.runAudioKey, soundAssets.sfx.trainRun);
  };

  public initialize = (scene: Phaser.Scene) => {
    this.runAudioTrack = scene.sound.add(Train.runAudioKey, { loop: true });
    this.runAudioTrack.play();

    this.fadeoutRunAudioTween = scene.tweens.add({
      targets: this.runAudioTrack,
      volume: 0,
      duration: 1000,
      paused: true,
      onComplete: () => this.runAudioTrack.stop()
    });

    this.trainParts.push(scene.add.image(0, 630, Train.bodySpriteKey));

    this.trainParts.forEach(trainPart => {
      trainPart.setOrigin(0.5, 1);
      trainPart.setPosition(-trainPart.width / 2, 630);
    });
  };

  public setSpeed = (newSpeed: number) => {
    this.speed = newSpeed * speedFactor;
  };

  public playIntroAnimation = (dt: number, onAnimationEnd?: () => void) => {
    this.timeAccumulator += dt;
    this.requiredIntroDistance -= this.timeAccumulator * 0.01;

    if (this.requiredIntroDistance <= 0) {
      this.timeAccumulator = 0;
      onAnimationEnd && onAnimationEnd();
      return;
    }

    this.trainParts.forEach(trainPart => {
      const localPosition = trainPart.getBottomCenter();
      trainPart.setPosition(
        localPosition.x + this.timeAccumulator * 0.01,
        localPosition.y + Math.sin(this.timeAccumulator * 0.025 * this.speed)
      );
    });
  };

  public playMoveAnimation = (dt: number) => {
    this.timeAccumulator += dt;

    this.trainParts.forEach(trainPart => {
      const localPosition = trainPart.getBottomCenter();
      trainPart.setPosition(
        localPosition.x,
        localPosition.y + Math.sin(this.timeAccumulator * 0.025 * this.speed)
      );
    });
  };

  public playWinAnimation = (dt: number) => {
    this.timeAccumulator += dt;
    this.requiredIntroDistance -= this.timeAccumulator * 0.01;

    this.trainParts.forEach(trainPart => {
      const localPosition = trainPart.getBottomCenter();
      trainPart.setPosition(
        localPosition.x + this.timeAccumulator * 0.01,
        localPosition.y + Math.sin(this.timeAccumulator * 0.025 * this.speed)
      );
    });

    if (!this.fadeoutRunAudioTween.isPlaying())
      this.fadeoutRunAudioTween.play();
  };
}
