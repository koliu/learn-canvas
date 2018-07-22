import util from "./canvas-util.js";
import f2e from "./f2e-week-7.js";

export default {
  canvas: undefined,
  start: undefined,
  animations: {
    updateId: undefined,
    drawId: undefined,
    pause: false
  },
  global: {
    batteryEnergy: 0,
    $w: 0,
    $h: 0,
    $cx: 0,
    $cy: 0,
    $angle360: (Math.PI * 2) / 180,
    $divides: 3,
    $bw: 0,
    $bh: 0,
    fontFamily: f2e.fontFamily
  },
  battery: new f2e.components.battery(10),
  init() {
    const global = this.global;
    const colors = f2e.colors;
    const canvas = (this.canvas = util.createCanvas("welcome", {
      width: 720,
      height: 480
    }));
    const ctx = canvas.ctx;

    global.$w = canvas.offsetWidth;
    global.$h = canvas.offsetHeight;
    global.$cx = global.$w / 2;
    global.$cy = global.$h / 2;
    global.$divides = 3;
    /* base width */
    global.$bw = global.$w / global.$divides;
    /* base height */
    global.$bh = global.$h / global.$divides;
    let tempX, tempY;

    const that = this;
    this.animations.updateId = setInterval(that.update.bind(that), 1000 / 24);
    this.animations.drawId = requestAnimationFrame(that.draw.bind(that));

    this.appendStartButton();
  },
  update() {
    const global = this.global;
    global.batteryEnergy =
      global.batteryEnergy >= 100 ? 0 : global.batteryEnergy + 5;
  },
  draw() {
    const canvas = this.canvas;
    const ctx = canvas.ctx;
    const global = this.global;
    const colors = f2e.colors;
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const circle = new Path2D();
    circle.arc(0, 0, global.$h / 2, 0, global.$angle360, true);
    circle.closePath();

    f2e.drawGrid(canvas, ctx, {
      strokeStyle: colors.darkGreen(0.3),
      gridWidth: 20,
      gridHeight: 20
    });

    ctx.save();

    let tempScale = 0.01;
    // draw origin
    ctx.translate(global.$cx, global.$cy);
    ctx.scale(tempScale, tempScale);
    ctx.fillStyle = colors.darkGreen(0.3);
    ctx.fill(circle);
    ctx.setTransform(1, 0, 0, 1, global.$cx, global.$cy);

    // draw outer circle
    tempScale = 0.44 + 1 / 3;
    ctx.scale(tempScale, tempScale);
    ctx.strokeStyle = colors.white(0.3);
    ctx.stroke(circle);
    ctx.setTransform(1, 0, 0, 1, global.$cx, global.$cy);

    // draw inner circle
    tempScale = 0.55;
    ctx.scale(tempScale, tempScale);
    ctx.strokeStyle = colors.white();
    ctx.lineWidth = 3;
    ctx.stroke(circle);
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // top-right yellow circle
    ctx.beginPath();
    ctx.arc(
      global.$bw * 2.5,
      (global.$bh / 3) * 1.8,
      0.2 * global.$bh,
      0,
      (Math.PI * 2) / 180,
      true
    );
    ctx.fillStyle = colors.yellow();
    ctx.fill();

    // bottom triangle
    let tempX = global.$bw * 2.2;
    let tempY = global.$bh * 2.1;
    ctx.beginPath();
    ctx.moveTo(tempX, tempY);
    ctx.lineTo(tempX - 45, tempY + 70);
    ctx.lineTo(tempX + 35, tempY + 75);
    ctx.fillStyle = colors.blue();
    ctx.fill();

    // top-left hexagon
    tempX = global.$bw * 0.17;
    tempY = global.$bh * 0.8;
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
    tempX = global.$bw * 0.13;
    tempY = global.$bh * 2.5;
    ctx.font = `14px ${global.fontFamily}`;
    ctx.fillText("你身負著運送能量電池的任務", tempX, tempY);
    ctx.fillText("卻遭到幾何星人的埋伏", tempX, tempY + 20);
    ctx.fillText("請協助從他們的手中奪回能量電池", tempX, tempY + 40);

    tempScale = 10;
    ctx.font = `70px ${global.fontFamily}`;
    ctx.fillText("R", global.$cx - 10, global.$cy - 20);

    ctx.font = `20px ${global.fontFamily}`;
    ctx.fillText("Radio Defence", global.$cx - 64, global.$cy + 10);

    ctx.moveTo(global.$cx - 50, global.$cy - 50);

    this.battery.draw(
      ctx,
      global.$cx - 35,
      global.$cy - 59,
      0.5,
      0.45,
      global.batteryEnergy
    );

    ctx.restore();
    ctx.restore();
    this.animations.drawId = requestAnimationFrame(this.draw.bind(this));
  },
  appendStartButton() {
    const start = (this.start = document.createElement("button"));
    start.innerText = "Start Game";
    start.id = "start-game";
    document.body.appendChild(start);
  },
  cancelAnimation() {
    this.animations.drawId &&
      window.cancelAnimationFrame(this.animations.drawId);
    this.animations.updateId && window.clearInterval(this.animations.updateId);
    this.animations.pause = true;
  },
  destroy() {
    this.cancelAnimation();
    this.canvas.remove();
    this.canvas = undefined;
    this.start.style['display'] = 'none';
  }
};
