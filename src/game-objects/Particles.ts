import { GameObject } from "./GameObject";
import { spriteAssets } from "../../assets/index";

export class Particles extends GameObject {
  public static smokeParticleSpriteKey = spriteAssets.smokeParticle;
  public static sparkParticleSpriteKey = spriteAssets.sparkParticle;
  private smokeEmitter: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig = {
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
  private sparkEmitter: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig = {
    frequency: 0,
    x: { min: 300, max: 350 },
    y: { min: 600, max: 630 },
    lifespan: { min: 250, max: 800 },
    speedY: { min: -10, max: 60 },
    speedX: { min: -1500, max: 10 },
    gravityY: 1000,
    gravityX: -500,
    scaleX: { min: 1, max: 2 },
    alpha: { min: 0.1, max: 0.75 },
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

  public initialize = (scene: Phaser.Scene) => {
    let smokeParticle = scene.add.particles(Particles.smokeParticleSpriteKey);
    let smokeEmitter = smokeParticle.createEmitter(this.smokeEmitter);
    smokeEmitter.emitCallback;

    let sparkParticles = scene.add.particles(Particles.sparkParticleSpriteKey);
    let sparkEmitter = sparkParticles.createEmitter(this.sparkEmitter);
    sparkEmitter.emitCallback;
  };

  public random(min: number, max: number) {
    return Phaser.Math.Between(min, max);
  }
}
