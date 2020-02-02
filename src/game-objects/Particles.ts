import { GameObject } from "./GameObject";
import { spriteAssets } from "../../assets/index";
import { zIndex } from "../data/Global";

export class Particles extends GameObject {
  public static smokeParticleSpriteKey = spriteAssets.smokeParticle;
  public static sparkParticleSpriteKey = spriteAssets.sparkParticle;
  public smokeEmitterConfig: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig = {
    frequency: 180,
    x: { min: this.random(100, 150), max: 150 },
    y: 350,
    lifespan: this.random(1000, 1500),
    speedX: { min: -400, max: -200 },
    speedY: { min: -200, max: -100 },
    alpha: { start: 0.75, end: 0 },
    scale: { start: 0.2, end: 0.7, ease: "Power4" },
    rotate: this.random(0, 135)
  };
  public smokeParticle: Phaser.GameObjects.Particles.ParticleEmitterManager;
  public sparkParticle: Phaser.GameObjects.Particles.ParticleEmitterManager;
  public sparkEmitter: Phaser.GameObjects.Particles.ParticleEmitter;
  public smokeEmitter: Phaser.GameObjects.Particles.ParticleEmitter;

  public sparkEmitterConfig: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig = {
    frequency: 1,
    x: { min: 300, max: 350 },
    y: { min: 580, max: 600 },
    lifespan: { min: 250, max: 800 },
    speedY: { min: -260, max: -120 },
    speedX: { min: -1500, max: 10 },
    gravityY: 1000,
    gravityX: -500,
    scaleX: { min: 1, max: 2 },
    alpha: 1,
    rotate: { min: 45, max: 135 }
  };
  public load = (scene: Phaser.Scene) => {
    scene.load.image(
      Particles.smokeParticleSpriteKey,
      spriteAssets.smokeParticle
    );
    scene.load.image(
      Particles.sparkParticleSpriteKey,
      spriteAssets.sparkParticle
    );
  };

  public update = () => {};

  public initialize = (scene: Phaser.Scene) => {
    this.smokeParticle = scene.add.particles(Particles.smokeParticleSpriteKey);
    this.smokeEmitter = this.smokeParticle.createEmitter(
      this.smokeEmitterConfig
    );

    this.sparkParticle = scene.add.particles(Particles.sparkParticleSpriteKey);
    this.sparkEmitter = this.sparkParticle.createEmitter(
      this.sparkEmitterConfig
    );
    this.sparkParticle.setDepth(zIndex.sparkParticles);
  };

  public random(min: number, max: number) {
    return Phaser.Math.Between(min, max);
  }
}
