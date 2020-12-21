export default sketch => {
  const WIDTH = 480,
        HEIGHT = 480;

  let R = Math.floor(Math.random() * 255),
      G = Math.floor(Math.random() * 255);

  const polygon = (x, y, radius, points, color) => {
    const angle = sketch.TWO_PI / points;

    sketch.beginShape();
    for (let a = 0; a < sketch.TWO_PI; a += angle) {
      const sx = x + sketch.cos(a) * radius;
      const sy = y + sketch.sin(a) * radius;

      sketch.fill(color);
      sketch.vertex(sx, sy);
    }
    sketch.endShape(sketch.CLOSE);
  }

  sketch.setup = () => {
    sketch.createCanvas(WIDTH, HEIGHT);

    sketch.frameRate(60);
  };

  sketch.draw = () => {
    // use sine wave to get number between 0-1
    // * 0.5 so it would move faster
    // + 0.5 so it starts from a positive value
    const wave = sketch.sin(sketch.frameCount / 120 - sketch.PI / 2) * 0.5 + 0.5;

    // lerp == linear interpolation
    // value from 2-32 (2-point polygon to 32-point polygon - basically circle)
    // 3rd value is the interpolation value, use pow so it will grow bigger
    const point = sketch.lerp(2, 32, sketch.pow(wave, 2));

    const B = sketch.lerp(0, 255, sketch.pow(wave, 4));
    if (B < 0.00001) { // threshold to change color.
      R = Math.floor(Math.random() * 255);
      G = Math.floor(Math.random() * 255);
    }
    const color = sketch.color(R, G, B);

    sketch.push();
    sketch.clear();
    sketch.background(192);

    sketch.translate(WIDTH * 0.5, HEIGHT * 0.5);
    polygon(0, 0, 64, point, color);

    sketch.pop();
  };
};
