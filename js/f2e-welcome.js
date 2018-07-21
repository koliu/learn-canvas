import util from './canvas-util.js';
import f2e from './f2e-week-7.js';

export default {
  canvas: undefined,
  start: undefined,
  animations: {
    batteryEnergy: undefined,
    outerCircle: undefined,
    pause: false
  },
  init() {
    const colors = f2e.colors;
    const canvas = this.canvas = util.createCanvas('welcome', {
      width: 720,
      height: 480
    });

    const $w = canvas.offsetWidth;
    const $h = canvas.offsetHeight;
    const $cx = $w / 2;
    const $cy = $h / 2;
    const $divides = 3;
    /* base width */
    const $bw = $w / $divides;
    /* base height */
    const $bh = $h / $divides;
    const $angle360 = Math.PI * 2 / 180;
    const fontFamily = f2e.fontFamily;
    let tempX, tempY;

    const ComponentBattery = class ComponentBattery {
      constructor(unitX = 10, unitY = 10) {
        this.unitX = unitX;
        this.unitY = unitY;
      }

      head() {
        return new Path2D(`M${this.unitX} 0 h ${this.unitX * 2} v ${this.unitY} h ${- this.unitX * 2} Z`);
      };

      body() {
        return new Path2D(`M0 0 h ${this.unitX * 4} v ${this.unitY * 6} h ${- this.unitX * 4} Z`);
      };

      foot() {
        return new Path2D(`M0 0 h ${this.unitX * 4} v ${this.unitY} h ${- this.unitX * 4} Z`);
      }
      bolt() {
        const path = new Path2D();
        path.moveTo(this.unitX * 0, this.unitY * 0);
        path.lineTo(this.unitX * 1.5, this.unitY * 0);
        path.lineTo(this.unitX * -1, this.unitY * 2.5);
        path.closePath();
        return path;
      }
    };

    const icons = {
      battery: {
        draw: function (ctx, x = 0, y = 0, scaleX = 1, scaleY = 1, energy = 100) {
          ctx.translate(x, y);
          ctx.scale(scaleX, scaleY);
          ctx.save();

          const unit = 10;
          const componentBattery = new ComponentBattery(unit, unit);


          // head
          ctx.fillStyle = colors.white();
          ctx.fill(componentBattery.head());
          ctx.restore();

          // body
          ctx.save();
          ctx.fillStyle = colors.yellow();
          ctx.strokeStyle = colors.yellow();
          ctx.translate(0, unit);
          ctx.fill(componentBattery.body());
          ctx.stroke(componentBattery.body());
          if (energy < 100) {
            ctx.fillStyle = colors.darkBlue();
            ctx.scale(1, (100 - energy) / 100)
            ctx.fill(componentBattery.body());
          }
          ctx.restore();

          // bottom
          ctx.save();
          ctx.fillStyle = colors.yellow();
          ctx.strokeStyle = colors.yellow();
          ctx.translate(0, unit * 7.5);
          ctx.fill(componentBattery.foot());
          ctx.stroke(componentBattery.foot());
          ctx.restore();

          // bolt
          ctx.save();
          ctx.fillStyle = colors.white();
          ctx.translate(unit * 2, unit * 3.75);
          ctx.fill(componentBattery.bolt(), "nonzero");
          ctx.translate(0, unit * 0.5);
          ctx.rotate(Math.PI);
          ctx.fill(componentBattery.bolt(), "nonzero");
          ctx.restore();

        }
      }
    }

    const ctx = canvas.ctx;

    const circle = new Path2D();
    circle.arc(0, 0, $h / 2, 0, $angle360, true);
    circle.closePath();

    f2e.drawGrid(canvas, ctx, {
      strokeStyle: colors.darkGreen(0.3),
      gridWidth: 20,
      gridHeight: 20
    });

    ctx.save();

    let tempScale = 0.01;
    // draw origin
    ctx.translate($cx, $cy);
    ctx.scale(tempScale, tempScale);
    ctx.fillStyle = colors.darkGreen(0.3);
    ctx.fill(circle);
    ctx.setTransform(1, 0, 0, 1, $cx, $cy);

    // draw outer circle
    tempScale = 0.44 + 1 / 3;
    ctx.scale(tempScale, tempScale);
    ctx.strokeStyle = colors.white(0.3);
    ctx.stroke(circle);
    ctx.setTransform(1, 0, 0, 1, $cx, $cy);

    // draw inner circle
    tempScale = 0.55;
    ctx.scale(tempScale, tempScale);
    ctx.strokeStyle = colors.white();
    ctx.lineWidth = 3;
    ctx.stroke(circle);
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // top-right yellow circle
    ctx.beginPath();
    ctx.arc($bw * 2.5, $bh / 3 * 1.8, 0.2 * $bh, 0, Math.PI * 2 / 180, true);
    ctx.fillStyle = colors.yellow();
    ctx.fill();

    // bottom triangle
    tempX = $bw * 2.2;
    tempY = $bh * 2.1;
    ctx.beginPath();
    ctx.moveTo(tempX, tempY);
    ctx.lineTo(tempX - 45, tempY + 70);
    ctx.lineTo(tempX + 35, tempY + 75);
    ctx.fillStyle = colors.blue();
    ctx.fill();

    // top-left hexagon
    tempX = $bw * 0.17;
    tempY = $bh * 0.8;
    ctx.beginPath();
    ctx.moveTo(tempX - 5, tempY + 5);
    ctx.lineTo(tempX + 35, tempY - 10);
    ctx.lineTo(tempX + 70, tempY + 5);
    ctx.lineTo(tempX + 75, tempY + 30);
    ctx.lineTo(tempX + 55, tempY + 60);
    ctx.lineTo(tempX + 10, tempY + 45);
    ctx.fillStyle = colors.red();
    ctx.fill();

    // draw text
    ctx.fillStyle = colors.white();
    tempX = $bw * 0.13;
    tempY = $bh * 2.5;
    ctx.font = `14px ${fontFamily}`;
    ctx.fillText('你身負著運送能量電池的任務', tempX, tempY);
    ctx.fillText('卻遭到幾何星人的埋伏', tempX, tempY + 20);
    ctx.fillText('請協助從他們的手中奪回能量電池', tempX, tempY + 40);

    tempScale = 10;
    ctx.font = `70px ${fontFamily}`;
    ctx.fillText('R', $cx - 15, $cy - 20);

    ctx.font = `20px ${fontFamily}`;
    ctx.fillText('Radio Defence', $cx - 60, $cy + 10);

    // ctx.font = `15px ${fontFamily}`;
    // ctx.fillText('Start Game', $cx - 32, $cy + 62);

    ctx.moveTo($cx - 50, $cy - 50);

    let batteryEnergy = 0;
    this.animations.batteryEnergy = setInterval(() => {
      ctx.save();
      icons.battery.draw(ctx, $cx - 40, $cy - 59, 0.5, 0.45, (batteryEnergy >= 100) ? batteryEnergy = 0 : batteryEnergy += 5);
      ctx.restore();
    }, 100);

    this.appendStartButton();
  },
  appendStartButton() {
    const start = this.start = document.createElement("button");
    start.innerText = "Start Game";
    start.id = "start-game";
    document.body.appendChild(start);
  },
  cancelAnimation() {
    if (this.animations.pause) {
      return;
    }
    this.animations.batteryEnergy && window.cancelAnimationFrame(this.animations.batteryEnergy);
    this.animations.outerCircle && window.clearInterval(this.animations.outerCircle);
    this.animations.pause = true;
  },
  destroy() {
    this.cancelAnimation();
    this.canvas.remove();
    this.canvas = undefined;
    this.start.remove();
    this.start = undefined;
  }
}
