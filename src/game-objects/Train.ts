import { GameObject } from "./GameObject";
import { spriteAssets, soundAssets } from "../../assets/";
import { speedFactor, zIndex } from "../data/Global";
import { Tweens, Scene } from "phaser";
import { Particles } from "../game-objects/Particles";

export type trainPartsTyp =
  | Phaser.GameObjects.Image
  | Phaser.Types.GameObjects.Particles.ParticleEmitterConfig;

export class Train extends GameObject {
  private static bodySpriteKey = spriteAssets.trainBody.toString();
  private static grillSpriteKey = spriteAssets.grill.toString();
  private static tailpipeSpriteKey = spriteAssets.tailpipe.toString();
  private static characterSpriteKey = spriteAssets.character.toString();
  private static rayAudioKey = soundAssets.sfx.ray.toString();
  private static runAudioKey = soundAssets.sfx.trainRun.toString();
  private static hitAudioKey = soundAssets.sfx.trainHit.toString();
  private static hornKey = soundAssets.sfx.horn.toString();
  private particles = new Particles();

  public trainBodySprite: Phaser.Physics.Arcade.Sprite;
  public grillSprite: Phaser.Physics.Arcade.Sprite;
  public tailpipeSprite: Phaser.Physics.Arcade.Sprite;

  private characterSprite: Phaser.GameObjects.Sprite;
  private trainParts: Array<Phaser.GameObjects.Image> = [];
  private runAudioTrack: Phaser.Sound.BaseSound;
  private hitAudioTrack: Phaser.Sound.BaseSound;
  private hornAudioTrack: Phaser.Sound.BaseSound;
  private rayAudioTrack: Phaser.Sound.BaseSound;

  private requiredIntroDistance = 550;
  private timeAccumulator = 0;
  private speed = 0;

  private fadeoutRunAudioTween: Tweens.Tween;

  private readonly characterAnimations = {
    idle: "idle",
    repair: "repair",
  };

  public load = (scene: Phaser.Scene) => {
    scene.load.spritesheet(Train.characterSpriteKey, spriteAssets.character, {
      frameWidth: 154,
      frameHeight: 143,
    });

    scene.load.image(Train.bodySpriteKey, spriteAssets.trainBody);
    scene.load.image(Train.grillSpriteKey, spriteAssets.grill);
    scene.load.image(Train.tailpipeSpriteKey, spriteAssets.tailpipe);
    scene.load.audio(Train.runAudioKey, soundAssets.sfx.trainRun);
    scene.load.audio(Train.hitAudioKey, soundAssets.sfx.trainHit);
    scene.load.audio(Train.hornKey, soundAssets.sfx.horn);

    scene.load.audio(Train.rayAudioKey, soundAssets.sfx.ray);
  };

  public initialize = (scene: Phaser.Scene) => {
    this.hornAudioTrack = scene.sound.add(Train.hornKey);
    this.runAudioTrack = scene.sound.add(Train.runAudioKey, { loop: true });
    this.hitAudioTrack = scene.sound.add(Train.hitAudioKey);
    this.rayAudioTrack = scene.sound.add(Train.rayAudioKey);

    this.hornAudioTrack.play();
    this.runAudioTrack.play();
    this.particles.initialize(scene);
    this.characterSprite = scene.physics.add
      .sprite(-250, 390, Train.characterSpriteKey)
      .setDepth(zIndex.character);

    scene.anims.create({
      key: this.characterAnimations.idle,
      frames: scene.anims.generateFrameNumbers(Train.characterSpriteKey, {
        start: 0,
        end: 4,
      }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: this.characterAnimations.repair,
      frames: scene.anims.generateFrameNumbers(Train.characterSpriteKey, {
        start: 5,
        end: 9,
      }),
      frameRate: 8,
      repeat: 0,
    });

    this.characterSprite.anims.play(this.characterAnimations.idle);

    this.trainBodySprite = scene.physics.add
      .sprite(-80, 590, Train.bodySpriteKey)
      .setDepth(zIndex.train);

    this.grillSprite = scene.physics.add
      .sprite(-60, 570, Train.grillSpriteKey)
      .setDepth(zIndex.grill);

    this.tailpipeSprite = scene.physics.add
      .sprite(-300, 525, Train.tailpipeSpriteKey)
      .setDepth(zIndex.tailpipe);

    this.fadeoutRunAudioTween = scene.tweens.add({
      targets: this.runAudioTrack,
      volume: 0,
      duration: 1000,
      paused: true,
      onComplete: () => this.runAudioTrack.stop(),
    });

    this.trainParts.push(this.trainBodySprite);
    this.trainParts.push(this.grillSprite);
    this.trainParts.push(this.tailpipeSprite);
    this.trainParts.push(this.characterSprite);

    this.trainParts.forEach(trainPart => {
      trainPart.setOrigin(0.5, 1);
      trainPart.setPosition(trainPart.x - trainPart.width / 2, trainPart.y);
    });
    this.particles.smokeEmitter.startFollow(this.trainBodySprite, -100, -630);
    this.particles.sparkEmitter.startFollow(this.trainBodySprite, -100, -630);
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
        localPosition.y +
          Math.sin(this.timeAccumulator * speedFactor * this.speed),
      );
    });
  };

  public playMoveAnimation = (dt: number) => {
    this.timeAccumulator += dt;

    this.trainParts.forEach(trainPart => {
      const localPosition = trainPart.getBottomCenter();

      trainPart.setPosition(
        localPosition.x,
        localPosition.y +
          Math.sin(this.timeAccumulator * speedFactor * this.speed),
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
        localPosition.y +
          Math.sin(this.timeAccumulator * speedFactor * this.speed),
      );
    });

    if (!this.fadeoutRunAudioTween.isPlaying())
      this.fadeoutRunAudioTween.play();
  };

  public crash = () => {
    this.hitAudioTrack.play();
  };

  public castRepairSpell = () => {
    this.rayAudioTrack.play();
    this.characterSprite.anims
      .play(this.characterAnimations.repair, true)
      .once("animationcomplete", () => {
        this.characterSprite.anims.play(this.characterAnimations.idle);
      });
  };
}
