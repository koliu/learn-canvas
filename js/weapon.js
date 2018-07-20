import util from './canvas-util.js';
import f2e from './f2e-week-7.js';

class Weapon {
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

    this._renewCurrentPosition();
  }

  update() {
    this.r += this.speed;
    this._renewCurrentPosition();
    // console.log(
    //   `x=${this.x}`,
    //   `y=${this.y}`,
    //   `r=${this.r}`,
    //   `current=${JSON.stringify(this.current)}`,
    // );
  }

  _renewCurrentPosition() {
    const angle = util.degToPI(this.deg - 90);
    this.current.x = this.x + this.r * Math.cos(angle);
    this.current.y = this.y + this.r * Math.sin(angle);
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

export default Weapon;
