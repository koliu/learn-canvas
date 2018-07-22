import util from "./canvas-util.js";
import ship from "./ship.js";
import bullet from "./bullet.js";
import bigBullet from "./big-bullet.js";
import bulletKO from "./bullet-ko.js";
import battery from "./components/battery.js";

export default {
  colors: {
    white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    red: (opacity = 1) => `rgba(231, 70, 93, ${opacity})`,
    yellow: (opacity = 1) => `rgba(245,175, 95, ${opacity})`,
    blue: (opacity = 1) => `rgba(54, 118, 187, ${opacity})`,
    darkBlue: (opacity = 1) => `rgba(0, 29, 46, ${opacity})`,
    darkGreen: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
    transparent: () => "rgba(0, 0, 0, 0)"
  },
  components: {
    ship,
    bullet,
    bigBullet,
    bulletKO,
    battery
  },
  fontFamily: "Roboto,Arial,微軟正黑體",
  resources: {
    ko: document.getElementById("ko")
  },
  drawGrid(canvas, ctx, args) {
    ctx.save();

    const def = {
      strokeStyle: this.colors.darkGreen(0.3),
      lineWidth: 0.5,
      boundary: {
        w: canvas.width,
        h: canvas.height
      },
      gridWidth: 10,
      gridHeight: 10
    };
    Object.assign(def, args);

    ctx.strokeStyle = def.strokeStyle;
    ctx.lineWidth = def.lineWidth;

    const lineY = new Path2D();
    lineY.moveTo(0, 0);
    lineY.lineTo(0, def.boundary.h);
    lineY.closePath();

    // draw columns
    Array.from(Array(Math.floor(canvas.width / def.gridWidth)).keys()).forEach(
      i => {
        i++;

        ctx.translate(def.gridWidth * i, 0);
        ctx.stroke(lineY);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
    );

    const lineX = new Path2D();
    lineX.moveTo(0, 0);
    lineX.lineTo(def.boundary.w, 0);
    lineX.closePath();

    // draw rows
    Array.from(
      Array(Math.floor(canvas.height / def.gridHeight)).keys()
    ).forEach(i => {
      i++;
      ctx.translate(0, def.gridHeight * i);
      ctx.stroke(lineX);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    });

    ctx.restore();
  }
};
