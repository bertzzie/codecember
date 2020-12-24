export default sketch => {
  const WIDTH = 480,
        HEIGHT = 480,
        ITERATIONS = 150,
        BACKGROUND_COLOR = sketch.color(0, 0, 0),
        FOREGROUND_COLOR = sketch.color(255, 255, 255, 5),
        // perlin noise works like audio frequency,
        // computed over several octaves then summed.
        // Thus scale here is to determine the range.
        // We also divide the scale instead of multiplying it
        // so 85 here means 1 / 85
        SCALE = 85,
        // space between lines
        SPACING = 8,
        // strand length multiplier
        LENGTH = 4;

  let points = [];

  const getForce = (x, y) => {
    return (sketch.noise(x / SCALE, y / SCALE) - 0.5) * 2 * sketch.TWO_PI;
  }

  sketch.setup = () => {
    sketch.createCanvas(WIDTH, HEIGHT);
    sketch.noiseSeed(+(new Date())); // current unix timestamp, in ms

    sketch.background(BACKGROUND_COLOR);

    for(let x = 0; x < WIDTH; x += SPACING) {
      for (let y = 0; y < HEIGHT; y += SPACING) {
        points.push({ x, y });
      }
    }
  };

  sketch.draw = () => {
    if (sketch.frameCount > ITERATIONS) {
      sketch.noLoop();
    }

    for (let p of points) {
      const rad = getForce(p.x, p.y);
      let nx = p.x + sketch.cos(rad) * LENGTH;
      let ny = p.y + sketch.sin(rad) * LENGTH;

      sketch.strokeWeight(2);
      sketch.stroke(FOREGROUND_COLOR);
      sketch.line(p.x, p.y, nx, ny);

      p.x = nx;
      p.y = ny;
    }
  };
};
