import util from "./canvas-util.js";
import f2e from "./f2e-week-7.js";

export default {
  canvas: undefined,
  animations: {
    updateId: undefined,
    drawId: undefined,
    pause: true
  },
  global: {
    w: window.innerWidth,
    h: window.innerHeight,
    origin: {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    },
    unitW: 10,
    unitH: 10,
    fontFamily: f2e.fontFamily,
    mousePos: {
      x: 0,
      y: 0
    }
  },
  ship: {
    bullets: []
  },
  init() {
    // init for document
    document.body.style.backgroundColor = f2e.colors.darkBlue();
    const global = this.global;

    const canvas = (this.canvas = util.createCanvas("gaming", {}));
    const ctx = canvas.ctx;

    const ship = (this.ship = new f2e.components.ship(global, ctx, {
      x: global.origin.x,
      y: global.origin.y,
      r: 60,
      r_outer: 90,
      r_shield: 110,
      deg: 0,
      weapons: [
        f2e.components.bullet,
        f2e.components.bigBullet,
        f2e.components.bulletKO
      ],
      ammo: [5, 2, 99],
      currentWeapon: 0,
      bullets: []
    }));

    this.run();

    const createShipBullet = () => {
      if (ship.ammo[ship.currentWeapon] <= 0) {
        return;
      }
      ship.ammo[ship.currentWeapon]--;
      const bullet = new ship.weapons[ship.currentWeapon]({
        global,
        ctx,
        x: ship.x,
        y: ship.y,
        r: ship.r_outer + 17,
        deg: ship.deg,
        ammo: ship.ammo[ship.currentWeapon]
      });
      ship.bullets.push(bullet);

      // auto switch to next available weapon
      if (ship.ammo[ship.currentWeapon] <= 0) {
        const nextWeapon = ship.ammo.findIndex(e => e > 0);
        // ship.currentWeapon = nextWeapon > -1 ? nextWeapon : ship.currentWeapon;
        if (nextWeapon > -1) {
          ship.currentWeapon = nextWeapon;
        } else {
          this.showGameOver();
        }
      }
    };

    canvas.addEventListener(
      "mousemove",
      evt => {
        global.mousePos.x = evt.x;
        global.mousePos.y = evt.y;
      },
      false
    );
    window.addEventListener("keydown", evt => {
      const key = event.which || event.keyCode;
      // console.log(key);
      switch (key) {
        case 67: // c: change weapon of ship
          if (ship.currentWeapon < ship.weapons.length - 1) {
            ship.currentWeapon++;
          } else {
            ship.currentWeapon = 0;
          }
          break;
        case 32: // space: pause
          if (this.animations.pause) {
            this.run();
            return;
          }
          this.pause();
          break;
        case 83: // s: shot
          createShipBullet();
          break;
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
          let index = key % 49;
          if (index < this.ship.weapons.length) this.ship.currentWeapon = index;
          break;
          // case 39:
          //   ship.deg -= 10;
          //   break;
          // case 37:
          //   ship.deg += 10;
          //   break;
      }
    });
    canvas.addEventListener("click", () => {
      createShipBullet();
    });
    window.addEventListener(
      "resize",
      function () {
        util.resizeByWindow(canvas, "min-side");
      },
      false
    );
  },
  update() {
    const canvas = this.canvas;
    const ctx = canvas.ctx;
    ctx.save();
    this.ship.deg = this.global.mousePos.x / 2;
    this.ship.bullets.forEach((bullet, index) => {
      // Remove the bullet when out of canvas bounds
      if (
        bullet.current.x >= canvas.width ||
        bullet.current.x < 0 ||
        bullet.current.y >= canvas.height ||
        bullet.current.y < 0
      ) {
        this.ship.bullets.splice(index, 1);
        return;
      }
      bullet.update();
    });

    ctx.restore();
  },
  draw() {
    const canvas = this.canvas;
    const ctx = canvas.ctx;
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    f2e.drawGrid(canvas, ctx, {
      strokeStyle: f2e.colors.darkGreen(0.3),
      gridWidth: 40,
      gridHeight: 40
    });

    this.ship.draw();
    this.ship.bullets.forEach(e => e.draw());

    this.drawMousePosition();
    this.drawKeyButtons(this.ship);

    this.animations.drawId = window.requestAnimationFrame(this.draw.bind(this));
    ctx.restore();
  },
  drawMousePosition() {
    const ctx = this.canvas.ctx;
    const global = this.global;
    ctx.save();
    ctx.translate(global.mousePos.x, global.mousePos.y);
    ctx.beginPath();
    ctx.moveTo(-20, 0);
    ctx.lineTo(20, 0);
    ctx.lineWidth = 2;
    ctx.strokeStyle = f2e.colors.red(0.7);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -20);
    ctx.lineTo(0, 20);
    ctx.stroke();
    ctx.font = `14px ${global.fontFamily}`;
    ctx.fillStyle = f2e.colors.yellow(0.7);
    ctx.fillText(`(${global.mousePos.x},${global.mousePos.y})`, 3, -8);
    ctx.restore();
  },
  run() {
    if (this.animations.pause) {
      this.animations.updateId = window.setInterval(
        this.update.bind(this),
        1000 / 24
      );
      this.animations.drawId = window.requestAnimationFrame(
        this.draw.bind(this)
      );
      this.animations.pause = false;
    }
  },
  pause() {
    if (!this.animations.pause) {
      this.cancelAnimation();
      this.animations.pause = true;
    }
  },
  cancelAnimation() {
    this.animations.drawId &&
      (this.animations.drawId = window.cancelAnimationFrame(
        this.animations.drawId
      ));
    this.animations.updateId &&
      (this.animations.updateId = window.clearInterval(
        this.animations.updateId
      ));
  },
  drawKeyButtons(ship) {
    const ctx = this.canvas.ctx;
    ctx.save();

    let pos = {
      x: 5,
      y: 10
    };
    const global = this.global;
    ship.weapons.forEach((e, i) => {
      ctx.save();

      const args = {
        x: pos.x,
        y: pos.y,
        width: 40,
        height: 40,
        ammo: ship.ammo[i],
        paddingX: 5,
        paddingY: 20
      };
      args.y += (args.height + args.paddingY) * i;

      if (i === ship.currentWeapon) {
        args.strokeStyle = f2e.colors.red(0.6);
        args.fillStyle = f2e.colors.yellow(0.3);
      }
      new e({
        global,
        ctx
      }).drawIcon(args);

      ctx.restore();
    });

    ctx.restore();
  },
  destroy() {
    this.pause();
    this.canvas.remove();
    this.canvas = undefined;
  },
  showGameOver() {
    document.getElementById("game-over").style["display"] = "flex";
  }
};
