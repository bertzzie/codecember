export default sketch => {
  const WIDTH = 600,
        HEIGHT = 600,
        ITERATION = 10000,
        FRAME_RATE = 60,
        ZOOM = 5;

  let params = {
    a: 10,
    b: 28,
    c: 8.0 / 3.0,
    dt: 0.01,
  };

  let points = []

  const splitter = [0, 1, 2, 3].map(i => ({
    start: (length) => length * i / 4,
    end: (length) => length * (i + 1) / 4,
    color: sketch.color(
        (i % 2 === 0) ? Math.floor(Math.random() * 256): 0,
        (i % 3 === 0) ? Math.floor(Math.random() * 256) : 0,
        (i === 1) ? Math.floor(Math.random() * 256) : 0,
    )
  }));

  sketch.setup = () => {
    sketch.createCanvas(WIDTH, HEIGHT, sketch.WEBGL);
    sketch.frameRate(FRAME_RATE);

    for (let i = 0; i < ITERATION; i++) {
      const dx = (params.a * (y - x)) * params.dt;
      const dy = (x * (params.b - z) - y) * params.dt;
      const dz = (x * y - params.c * z) * params.dt;

      x = x + dx;
      y = y + dy;
      z = z + dz;

      points.push({ x, y, z });
    }
  };

  let x = 0.01, y = 0, z = 0;
  sketch.draw = () => {
    sketch.background(0);

    sketch.translate(0, 125);
    sketch.rotateY(sketch.millis() / 1000)
    sketch.scale(ZOOM);
    sketch.rotateX(45);
    sketch.rotateZ(45);
    sketch.noFill();

    const boundaries = [0, 1, 2, 3].map(i => ({
      start: splitter[i].start(points.length),
      end: splitter[i].end(points.length),
      color: splitter[i].color
    }));

    for(let b of boundaries) {
      sketch.beginShape(sketch.TESS);
      sketch.stroke(b.color);
      for(let i = b.start; i < b.end; i++) {
        sketch.vertex(points[i].x, points[i].y, points[i].z);
      }
      sketch.endShape();
    }
  };
};
