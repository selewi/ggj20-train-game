import { GameObject } from "./GameObject";
import { spriteAssets } from "../../assets/index";

export class Particles extends GameObject {
  public static smokeParticleSpriteKey = spriteAssets.smokeParticle;
  public static sparkParticleSpriteKey = spriteAssets.sparkParticle;
  private smokeEmitter: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig = {
    frequency: 100,
    x: { min: this.random(250, 300), max: 300 },
    y: 400,
    lifespan: this.random(1000, 2500),
    speedX: { min: -400, max: -200 },
    speedY: { min: -200, max: -100 },
    alpha: { start: 0.75, end: 0 },
    scale: { start: 0.2, end: 0.7, ease: "Power4" },
    rotate: this.random(0, 135)
  };
  private sparkEmitter: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig = {
    frequency: 50,
    x: { min: 0, max: 300 },
    y: { min: 600, max: 675 },
    speedX: {min:-400, max:-200}
    alpha: { start: 0.75, end: 0 },
    rotate: 180,
    scale: { start: 0.0, end: 0.2, ease: "Power4" }
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
