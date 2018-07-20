import util from './canvas-util.js';
import f2e from './f2e-week-7.js';

class Default {
  constructor(args) {
    this.global = {}
    this.ctx = {};
    this.x = 0;
    this.y = 0;
    this.deg = 0;
    Object.assign(this, args);
  }

  update() {
    this.x += this.speed;

  }

  draw() {
    const g = this.global;
    const ctx = this.ctx;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(util.degToPI(this.deg));
    this.drawBullet();
    ctx.restore();
  }

  log() {
    console.log(
      `x=${this.x}`,
      `y=${this.y}`,
      `deg=${this.deg}`,
      `speed=${this.speed}`,
      `strength=${this.strength}`,
    )
  }
}

class Bullet extends Default {
  constructor(args) {
    super(args);
    this.speed = 4;
    this.strength = 1;
    this.width = 20;
    this.height = 10;
    this.color = f2e.colors.red(0.7);
    this.borderColor = f2e.colors.yellow(0.9);
  }

  drawBullet() {
    const ctx = this.ctx;
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.strokeStyle = this.borderColor;
    ctx.strokeRect(0, 0, this.width, this.height);
  }

}

export default Bullet;
