import util from './canvas-util.js';
import f2e from './f2e-week-7.js';
import Weapon from './weapon.js';

class BulletKO extends Weapon {
  constructor(args) {
    super(args);
    this.speed = 10;
    this.strength = 100;
    this.image = f2e.resources.ko;
    this.width = this.image.width;
    this.height = this.image.height;
    this.color = f2e.colors.red(0.7);
    this.borderColor = f2e.colors.yellow(0.9);
    this.shadowColor = f2e.colors.white(0.9);
    this.shadowBlur = 3;

    this.shrink = 30;
  }

  drawBullet() {
    const w = Math.min(this.width, this.shrink);
    const adjust = -w / 2;
    const o = w / 2;

    const ctx = this.ctx;
    ctx.drawImage(f2e.resources.ko, adjust, adjust - 15, w, w);
    this.shrink += 5;

    // 這段很怪，fillRect 正常，但 arc 卻是渲染 ship.cannon!!
    // ctx.fillStyle = this.color;
    // ctx.fillRect(adjust, adjust, w, w);
    // ctx.lineWith = 10;
    // ctx.arc(100, 100, 2 * this.w, 0, util.degToPI(180), false);
    // ctx.fill();
    // ctx.stroke();
  }

  _doDraw(adjustX, adjustY, scale) {
    const ctx = this.ctx;
    ctx.shadowBlur = this.shadowBlur;
    ctx.shadowColor = this.shadowColor;
    let w = this.width * 0.8; //Math.min(this.width, 40);
    let h = this.height * 0.8; //Math.min(this.height, 40);
    if (scale) {
      w *= scale;
      h *= scale;
    }
    ctx.drawImage(f2e.resources.ko, this.width * scale * 0.1, this.height * scale * 0.1, w, h);
  }

}

export default BulletKO;
