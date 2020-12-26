export default sketch => {
  const WIDTH = 640,
        HEIGHT = 640,
        MARGIN = 10,
        SHAPE_COUNT = 32,
        SHAPE_SIZE = WIDTH / SHAPE_COUNT - MARGIN,
        FRAME_RATE = 60;

  const periodic = (p) => {
    return 1.0 * sketch.sin(sketch.TWO_PI * p);
  };

  const offset = (x, y) => {
    return sketch.noise(x, y);
  };

  const shape = (x, y, value, color) => {
    sketch.push();
    sketch.noStroke();

    sketch.fill(color);

    const px = sketch.cos(value) * 5;
    const py = sketch.cos(value) * 5;

    sketch.translate(x, y);
    sketch.rect(px, py, SHAPE_SIZE);

    sketch.pop();
  }

  sketch.setup = () => {
    sketch.createCanvas(WIDTH, HEIGHT);
    sketch.frameRate(FRAME_RATE);
    sketch.rectMode(sketch.CENTER);
  };

  sketch.draw = () => {
    sketch.background(0);

    const t = 1.0 * sketch.frameCount / FRAME_RATE;

    for(let i = 0; i < SHAPE_COUNT; i++) {
      for (let j = 0; j < SHAPE_COUNT; j++) {
        const x = sketch.map(i, 0, SHAPE_COUNT - 1, WIDTH / 8, WIDTH * 7 / 8);
        const y = sketch.map(j, 0, SHAPE_COUNT - 1, HEIGHT / 8, HEIGHT * 7 / 8);

        const value = periodic(t - offset(x, y));

        shape(x, y, value, sketch.color(y, i * j, x));
      }
    }
  };
};
