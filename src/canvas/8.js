export default sketch => {
  const WIDTH = 640,
        HEIGHT = 640,
        FRAME_RATE = 30,
        VERTEX_COUNT = 16,
        LINE_GAP = WIDTH / VERTEX_COUNT;

  let LINES = [];

  const periodic = (p) => {
    return 0.25 * sketch.sin(sketch.PI * p);
  };

  const offset = (x, y) => {
    return sketch.noise(x, y) * 10;
  };

  const prepareVertexes = () => {
    let odd = false;
    const t = 2.0 * sketch.frameCount / FRAME_RATE;

    for (let y = LINE_GAP / 2; y <= WIDTH; y += LINE_GAP) {
      odd = !odd;
      let line = [];
      for (let x = LINE_GAP / 4; x <= WIDTH; x += LINE_GAP) {
        let force = periodic(t - offset(x, y));

        line.push({
          x: x + force * LINE_GAP + (odd ? LINE_GAP / 2 : 0),
          y: y + force * LINE_GAP,
        });
      }

      LINES.push(line);
    }
  };

  const drawTriangle = (a, b, c) => {
    sketch.beginShape();
    sketch.fill(
        (a.x + b.x + c.x) / 4,
        (a.y + b.y + c.y) / 8,
        (a.x + b.x + c.x + a.y + b.y + c.y) / 8
    );
    sketch.vertex(a.x, a.y);
    sketch.vertex(b.x, b.y);
    sketch.vertex(c.x, c.y);
    sketch.endShape(sketch.CLOSE);
  };

  sketch.setup = () => {
    sketch.createCanvas(WIDTH, HEIGHT);
    sketch.colorMode(sketch.HSB);
    sketch.frameRate(FRAME_RATE);

    sketch.noiseSeed(+(new Date()));
  };

  sketch.draw = () => {
    sketch.background(255);

    prepareVertexes();

    sketch.push();
    let odd = true;
    for (let y = 0; y < LINES.length - 1; y++) {
      odd = !odd;
      let dotLine = [];

      for (let i = 0; i < LINES[y].length; i++) {
        dotLine.push(odd ? LINES[y][i]     : LINES[y + 1][i]);
        dotLine.push(odd ? LINES[y + 1][i] : LINES[y][i]);
      }

      for (let i = 0; i < dotLine.length - 2; i++) {
        drawTriangle(dotLine[i], dotLine[i + 1], dotLine[i + 2]);
      }
    }
    sketch.pop();

    LINES = [];
  };
};
