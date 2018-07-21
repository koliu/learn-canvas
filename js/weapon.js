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

  drawIcon(args) {
    const def = {
      strokeStyle: f2e.colors.white(0.6),
      fillStyle: f2e.colors.transparent(),
      lineWidth: 1,
      width: 40,
      height: 40,
      x: 0,
      y: 0
    };
    Object.assign(def, args);

    const path = new Path2D();
    path.moveTo(0, 0);
    path.lineTo(def.width, 0);
    path.lineTo(def.width, def.height);
    path.lineTo(0, def.height);
    path.closePath();

    const ctx = this.ctx;
    ctx.save();
    ctx.translate(def.x, def.y);

    // draw box
    ctx.strokeStyle = def.strokeStyle;
    ctx.fillStyle = def.fillStyle;
    ctx.lineWidth = def.lineWidth;
    ctx.fill(path);
    ctx.stroke(path);
    ctx.restore();

    ctx.save();
    // draw remain ammo
    ctx.fillStyle = f2e.colors.red(0.5);
    const fontHeight = def.height - 10;
    ctx.font = `${fontHeight}px ${f2e.fontFamily}`;
    ctx.translate(def.x, def.y);
    // ctx.scale(1.2, 1);
    // console.log(
    //   `def.x=${def.x}`,
    //   `def.y=${def.y}`,
    //   `def.width=${def.width}`,
    //   `def.height=${def.height}`,
    // );
    ctx.fillText(def.ammo, def.width + 5, def.height - def.paddingY / 2, 36);

    ctx.restore();

    ctx.save();
    ctx.translate(def.x, def.y);
    let adjustX = def.width - this.width;
    let adjustY = def.height - this.height;
    let scale = 1;
    if (adjustX < 2 || adjustY < 2) {
      scale = (adjustX > adjustY) ?
        Math.min(def.width / this.width, 0.8) :
        Math.min(def.height / this.height, 0.8)
      // adjustX += 6 / scale;
      // adjustY += 6 / scale;
    }
    // console.log('b', adjustX, adjustY, scale);
    // ctx.scale(scale, scale);
    this._doDraw(adjustX / 2, adjustY / 2, scale);
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
