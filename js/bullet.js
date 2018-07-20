import util from './canvas-util.js';
import f2e from './f2e-week-7.js';

class Default {
  constructor(args) {
    this.global = {}
    this.ctx = {};
    this.r = 1;
    this.deg = 0;
    Object.assign(this, args);
    this.current = {
      x: 0,
      y: 0
    }
  }

  update() {
    this.r += this.speed;
    const angle = util.degToPI(this.deg - 90);
    this.current.x = this.x + this.r * Math.cos(angle);
    this.current.y = this.y + this.r * Math.sin(angle);
    // console.log(
    //   `x=${this.x}`,
    //   `y=${this.y}`,
    //   `r=${this.r}`,
    //   `current=${JSON.stringify(this.current)}`,
    // );
  }

  draw() {
    const g = this.global;
    const ctx = this.ctx;

    ctx.save();
    ctx.translate(this.current.x, this.current.y);
    ctx.rotate(util.degToPI(this.deg));
    this.drawBullet();
    ctx.restore();
  }

  log() {
    console.log(
      `x=${this.x}`,
      `y=${this.y}`,
      `r=${this.r}`,
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
    this.shadowColor = f2e.colors.white(0.9);
    this.shadowBlur = 3;
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

export default Bullet;
