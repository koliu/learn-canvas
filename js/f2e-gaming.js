import util from './canvas-util.js';
import f2e from './f2e-week-7.js';

export default {
  canvas: undefined,
  animations: {
    updateId: undefined,
    drawId: undefined,
    pause: false
  },
  init() {
    // init for document
    document.body.style.backgroundColor = f2e.colors.darkBlue();
    const global = {
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
    };
    console.log(this);
    const canvas = this.canvas = util.createCanvas('gaming', {});
    const ctx = canvas.ctx;

    const drawMousePosition = () => {
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
    };

    const cancelAnimation = (args) => {
      if (!args && !args.pause) {
        return;
      }
      args.drawId && window.cancelAnimationFrame(args.drawId);
      args.updateId && window.clearInterval(args.updateId);
      args.pause = true;
    }

    let ship;
    const shipBullets = [];
    const init = () => {
      ship = new f2e.components.ship(global, ctx, {
        x: global.origin.x,
        y: global.origin.y,
        r: 60,
        r_outer: 90,
        r_shield: 110,
        deg: 0,
        weapons: [f2e.components.bullet, f2e.components.bigBullet],
        weapon: 0
      });
    }

    const update = () => {
      ctx.save();
      ship.deg = global.mousePos.x / 2;
      // console.log(ship.deg, global.mousePos.x, global.mousePos.y);
      shipBullets.forEach((bullet, index) => {
        // Remove the bullet when out of canvas bounds
        if (bullet.current.x >= canvas.width || bullet.current.x < 0 ||
          bullet.current.y >= canvas.height || bullet.current.y < 0
        ) {
          shipBullets.splice(index, 1);
          return;
        }
        bullet.update();
      });

      ctx.restore();
    }

    const draw = () => {
      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ship.draw();
      shipBullets.forEach(e => e.draw());

      drawMousePosition();

      this.animations.drawId = requestAnimationFrame(draw);
      ctx.restore();
    }

    init();
    const run = () => {
      this.animations.updateId = window.setInterval(update, 1000 / 24);
      this.animations.drawId = requestAnimationFrame(draw);
    };
    run();

    const createShipBullet = () => {
      const bullet = new ship.weapons[ship.weapon]({
        global,
        ctx,
        x: ship.x,
        y: ship.y,
        r: ship.r_outer + 17,
        deg: ship.deg
      });
      shipBullets.push(bullet);
    };

    canvas.addEventListener('mousemove', (evt) => {
      global.mousePos.x = evt.x;
      global.mousePos.y = evt.y;
    }, false);
    window.addEventListener('keydown', (evt) => {
      const key = event.which || event.keyCode;
      // console.log(key);
      switch (key) {
        case 67: // c: change weapon of ship
          if (ship.weapon < ship.weapons.length - 1) {
            ship.weapon++;
          } else {
            ship.weapon = 0;
          }
          break;
        case 32: // space: pause
          if (this.animations.pause) {
            run();
            this.animations.pause = false;
          } else {
            cancelAnimation(this.animations);
          }
          break;
        case 83: // s: shot
          createShipBullet();
          break;
          // case 39:
          //   ship.deg -= 10;
          //   break;
          // case 37:
          //   ship.deg += 10;
          //   break;
      }
    });
    canvas.addEventListener('click', () => {
      createShipBullet();
    });
    window.addEventListener('resize', function () {
      util.resizeByWindow(canvas, 'min-side')
    }, false);
  }
}
