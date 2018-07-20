import util from './canvas-util.js';
import f2e from './f2e-week-7.js';
import Weapon from './weapon.js';

class BigBullet extends Weapon {
  constructor(args) {
    super(args);
    this.speed = 3;
    this.strength = 2;
    this.width = 30;
    this.height = 30;
    this.color = f2e.colors.red(0.7);
    this.borderColor = f2e.colors.yellow(0.9);
    this.shadowColor = f2e.colors.white(0.9);
    this.shadowBlur = 3;

    // adjust init position
    this.r += 10;
  }

  drawBullet() {
    const ctx = this.ctx;
    ctx.shadowBlur = this.shadowBlur;
    ctx.shadowColor = this.shadowColor;
    ctx.fillStyle = this.color;
    const adjustX = -this.width / 2;
    const adjustY = -this.height / 2;
    ctx.fillRect(adjustX, adjustY, this.width, this.height);
    ctx.strokeStyle = this.borderColor;
    ctx.strokeRect(adjustX, adjustY, this.width, this.height);
  }

}

export default BigBullet;
