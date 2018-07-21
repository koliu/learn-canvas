import util from './canvas-util.js';
import f2e from './f2e-week-7.js';
import Weapon from './weapon.js';

class BigBullet extends Weapon {
  constructor(args) {
    super((() => {
      // adjust init position
      args.r += 15;
      return args;
    })());
    this.speed = 3;
    this.strength = 2;
    this.width = 30;
    this.height = 30;
    this.color = f2e.colors.red(0.7);
    this.borderColor = f2e.colors.yellow(0.9);
    this.shadowColor = f2e.colors.white(0.9);
    this.shadowBlur = 3;
  }

  drawBullet() {
    const adjustX = -this.width / 2;
    const adjustY = -this.height / 2;
    this._doDraw(adjustX, adjustY);
  }

  _doDraw(adjustX, adjustY, scale) {
    const ctx = this.ctx;
    ctx.shadowBlur = this.shadowBlur;
    ctx.shadowColor = this.shadowColor;
    let w = this.width;
    let h = this.height;
    if (scale) {
      w *= scale;
      h *= scale;
    }
    // console.log('big-bullet', scale, w, h);
    ctx.fillStyle = this.color;
    ctx.fillRect(adjustX, adjustY, w, h);
    ctx.strokeStyle = this.borderColor;
    ctx.strokeRect(adjustX, adjustY, w, h);
  }

}

export default BigBullet;
