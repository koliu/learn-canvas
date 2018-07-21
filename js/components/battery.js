import f2e from '../f2e-week-7.js';

class ComponentBattery {
  constructor(unit = 10) {
    this.unit = unit;
  }

  head() {
    return new Path2D(`M${this.unit} 0 h ${this.unit * 2} v ${this.unit} h ${- this.unit * 2} Z`);
  };

  body() {
    return new Path2D(`M0 0 h ${this.unit * 4} v ${this.unit * 6} h ${- this.unit * 4} Z`);
  };

  foot() {
    return new Path2D(`M0 0 h ${this.unit * 4} v ${this.unit} h ${- this.unit * 4} Z`);
  }
  bolt() {
    const path = new Path2D();
    path.moveTo(this.unit * 0, this.unit * 0);
    path.lineTo(this.unit * 1.5, this.unit * 0);
    path.lineTo(this.unit * -1, this.unit * 2.5);
    path.closePath();
    return path;
  }

  draw(ctx, x = 0, y = 0, scaleX = 1, scaleY = 1, energy = 100) {
    ctx.translate(x, y);
    ctx.scale(scaleX, scaleY);
    ctx.save();

    const unit = this.unit;
    const colors = f2e.colors;

    // head
    ctx.fillStyle = colors.white();
    ctx.fill(this.head());
    ctx.restore();

    // body
    ctx.save();
    ctx.fillStyle = colors.yellow();
    ctx.strokeStyle = colors.yellow();
    ctx.translate(0, unit);
    ctx.fill(this.body());
    ctx.stroke(this.body());
    if (energy < 100) {
      ctx.fillStyle = colors.darkBlue();
      ctx.scale(1, (100 - energy) / 100)
      ctx.fill(this.body());
    }
    ctx.restore();

    // bottom
    ctx.save();
    ctx.fillStyle = colors.yellow();
    ctx.strokeStyle = colors.yellow();
    ctx.translate(0, unit * 7.5);
    ctx.fill(this.foot());
    ctx.stroke(this.foot());
    ctx.restore();

    // bolt
    ctx.save();
    ctx.fillStyle = colors.white();
    ctx.translate(unit * 2, unit * 3.75);
    ctx.fill(this.bolt(), "nonzero");
    ctx.translate(0, unit * 0.5);
    ctx.rotate(Math.PI);
    ctx.fill(this.bolt(), "nonzero");
    ctx.restore();

  }
}

export default ComponentBattery;
