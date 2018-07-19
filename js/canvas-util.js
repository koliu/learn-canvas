export default {
  createCanvas(id, args) {
    const def = {
      context: document,
      width: window.innerWidth,
      height: window.innerHeight
    };
    Object.assign(def, args);

    const canvas = def.context.createElement('canvas');
    id && (canvas.id = id);
    canvas.width = def.width;
    canvas.height = def.height;
    canvas.ctx = canvas.getContext('2d');
    def.context.body.appendChild(canvas);
    return canvas;
  },
  degToPI(deg) {
    return deg * Math.PI / 180;
  },
  resizeByWindow(canvas, rule = "fixed") {
    const scale = {
      w: window.innerWidth / canvas.width,
      h: window.innerHeight / canvas.height
    };

    switch (rule) {
      case "min-side":
        scale.w = scale.h = Math.min(scale.w, scale.h);
        break;
      case "zoom":
        break;
      case "fixed":
      default:
        scale.w = scale.h = 1;
    }

    canvas.style['transform-origin'] = 'center top';
    canvas.style.transform = `scale(${scale.w},${scale.h})`;
  }
}
