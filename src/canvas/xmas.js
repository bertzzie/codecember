export default sketch => {
  const WIDTH = 480,
        HEIGHT = 480,
        TREE_ITERATION = 200,
        STROKE_WEIGHT = 4,
        FRAME_RATE = 60,
        CHRISTMAS_GREEN = sketch.color(0, 135, 62),
        CHRISTMAS_GOLD = sketch.color(255, 188, 2);

  let points = [];

  const star = (x, y, z, radius1, radius2, nPoints) => {
    let angle = sketch.TWO_PI / nPoints;
    let halfAngle = angle / 2.0;

    sketch.beginShape();
    for(let a = 0; a < sketch.TWO_PI; a += angle) {
      let sx = x + sketch.cos(a) * radius2;
      let sy = y + sketch.sin(a) * radius2;
      sketch.vertex(sx, sy, z);

      sx = x + sketch.cos(a + halfAngle) * radius1;
      sy = y + sketch.sin(a + halfAngle) * radius1;
      sketch.vertex(sx, sy, z);
    }
    sketch.endShape(sketch.CLOSE);
  }

  sketch.setup = () => {
    sketch.createCanvas(WIDTH, HEIGHT, sketch.WEBGL);
    sketch.blendMode(sketch.REMOVE);
    sketch.frameRate(FRAME_RATE);

    for(let i = 0; i < TREE_ITERATION; i++) {
      const x = i * sketch.cos(6 * i);
      const y = i * sketch.sin(6 * i);
      const z = i;

      points.push({ x, y, z });
    }
  };

  sketch.draw = () => {
    if (sketch.frameCount > TREE_ITERATION) {
      sketch.noLoop();
    }

    sketch.stroke(CHRISTMAS_GREEN);
    sketch.strokeWeight(STROKE_WEIGHT);
    sketch.noFill();

    sketch.translate(0, -150);
    sketch.rotateX(45.2);
    sketch.rotateY(135.1);

    sketch.push();
    sketch.beginShape();
    for(let i = 0; i < sketch.frameCount - 1; i++) {
      sketch.vertex(points[i].x, points[i].y, points[i].z);
    }
    sketch.endShape();
    sketch.pop();

    if (sketch.frameCount === TREE_ITERATION - 1) {
      sketch.push();
      sketch.stroke(CHRISTMAS_GOLD);
      sketch.translate(0, 0, -30);
      sketch.rotateX(45);
      sketch.rotateZ(-65);
      star(0, 0, 0, 15.0, 40.0, 5);
      sketch.pop();
    }
  };
};
