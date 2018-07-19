import util from './canvas-util.js';

class Ship {
  constructor(globalAttributes, ctx, args) {
    this.global = globalAttributes;
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.r = 1;
    this.r_outer = 31;
    this.r_shield = 61;
    this.deg = util.degToPI(0);
    Object.assign(this, args);
  }

  draw() {
    const ctx = this.ctx;
    ctx.save();

    ctx.translate(this.x, this.y);
    ctx.rotate(util.degToPI(this.deg));
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    ctx.shadowColor = "white";

    this._drawBody();
    this._drawOuterCircle();
    this._drawShield();
    this._drawCannon();

    ctx.restore();
  }

  _drawBody() {
    const ctx = this.ctx;
    ctx.save();

    // Inner Circle
    ctx.beginPath();
    ctx.arc(0, 0, this.r, 0, util.degToPI(360), true);
    ctx.lineWidth = 9;
    ctx.shadowBlur = 20;
    ctx.stroke();

    // Benz Sign
    [0, 1, 2].forEach(i => {
      ctx.beginPath();
      ctx.rotate(util.degToPI(120));
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -this.r);
      ctx.lineWidth = 4;
      ctx.stroke();
    });

    ctx.restore();
  }

  _drawOuterCircle() {
    const ctx = this.ctx;
    ctx.save();
    Array.from(Array(61).keys()).forEach(i => {
      if (!i % 3) {
        return;
      }
      ctx.rotate(util.degToPI(6));
      ctx.beginPath();
      ctx.arc(0, 0, this.r_outer, 0, util.degToPI(-3), true);
      ctx.lineWidth = 2;
      ctx.closePath();
      ctx.stroke();
    });
    ctx.restore();
  }

  _drawShield() {
    const ctx = this.ctx;
    ctx.save();
    ctx.rotate(util.degToPI(135));
    ctx.beginPath();
    ctx.arc(0, 0, this.r_shield, 0, util.degToPI(-90), true);
    ctx.shadowBlur = 20;
    ctx.lineWidth = 8;
    ctx.stroke();
    ctx.restore();
  }

  _drawCannon() {
    const ctx = this.ctx;
    ctx.save();
    const w_front = 6;
    const w = 11;
    const h = 17;
    ctx.beginPath();
    ctx.moveTo(0, -this.r_outer - h);
    ctx.lineTo(w_front, -this.r_outer - h);
    ctx.lineTo(w, -this.r_outer);
    ctx.lineTo(w, -this.r_outer + h);
    ctx.lineTo(-w, -this.r_outer + h);
    ctx.lineTo(-w, -this.r_outer);
    ctx.lineTo(-w_front, -this.r_outer - h);
    ctx.closePath();
    ctx.lineWidth = 8;
    ctx.shadowBlur = 5;
    ctx.fill();
    ctx.restore();
  }
}

export default Ship;
