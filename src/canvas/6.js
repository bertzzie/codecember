import font from 'fonts/fcmbxs.ttf';

export default sketch => {
  const WIDTH = 640,
        HEIGHT = 640;

  let calligraphy;
  const rings = [];

  sketch.preload = () => {
    calligraphy = sketch.loadFont(font);
  }

  sketch.setup = () => {
    sketch.createCanvas(WIDTH, HEIGHT);

    const count = 8;
    for (let i = 0; i < count; i++) {
      const diameter = ((i + 1) / count);
      const arcLength = sketch.random(sketch.PI * 0.05, sketch.PI * 2);
      const arcAngle = sketch.random(-1 * sketch.PI * 2, sketch.PI * 2);
      const spinSpeed = sketch.random(1, 4);

      rings.push({ spinSpeed, diameter, arcLength, arcAngle })
    }
  };

  sketch.draw = () => {
    sketch.background(0);

    const minDim = sketch.min(WIDTH, HEIGHT);

    sketch.strokeWeight(minDim * 0.0175);
    sketch.strokeCap(sketch.ROUND);

    sketch.scale(1.5);
    sketch.translate(-225, 25);

    let d = minDim;
    d -= d * 0.05;

    for (let i = 0; i < rings.length; i++) {
      const {
        diameter,
        arcLength,
        arcAngle,
        spinSpeed
      } = rings[i];
      const spin = sketch.millis() / 1000 * spinSpeed;

      sketch.push();
      sketch.noFill();
      sketch.stroke(sketch.color(i * 35, 0, 0));
      sketch.arc(
          WIDTH / 2,
          HEIGHT / 2,
          diameter * d,
          diameter * d,
          spin + arcAngle,
          spin + arcAngle + Math.PI * arcLength
      );
      sketch.pop();
    }

    sketch.push();
    sketch.textFont(calligraphy);
    sketch.textSize(64);
    sketch.fill(sketch.color(255, 255, 255, 100));
    sketch.text('機', (WIDTH / 2) - 32, (HEIGHT / 2) + 16);
    sketch.pop();
  };
};
