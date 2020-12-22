export default sketch => {
  const WIDTH = 320,
        HEIGHT = 320,
        FRAME_PER_SECOND = 30,
        LINE_COUNT = 32,
        LINE_WIDTH = 2,
        TOP_BUFFER = 5,
        GAP = WIDTH / LINE_COUNT,
        BACKGROUND_COLOR = sketch.color(0, 0, 0),
        PRIMARY_COLOR = sketch.color(3, 160, 98);

  let Lines = [...Array(LINE_COUNT).keys()].map(lineHeight => {
    return (new Array(LINE_COUNT + 1)).fill({x: 0, y: 0})
      .map((_, i) => {
        const x = GAP * i;

        const distanceToCenter = Math.abs(x - WIDTH / 2);
        const variance = Math.max(WIDTH / 2 - 50 - distanceToCenter, 0);
        const random = Math.random() * variance / 2 * -1;

        const y = (GAP * lineHeight) + random;

        return { x, y };
      });
  });

  let CurrentLine = Lines.length - 1;

  const drawLine = (line, index) => {
    sketch.push();
    sketch.beginShape();

    sketch.strokeWeight(LINE_WIDTH);
    sketch.stroke(PRIMARY_COLOR);
    sketch.vertex(line[0].x, line[0].y);

    const isCurrentLine = index === 0;
    const maxRender = isCurrentLine ?
        sketch.frameCount % LINE_COUNT :
        line.length;

    for(let i = 0; i < maxRender; i++) {
      const points = line.slice(i, i + 2);
      const start = points[0];
      const end = points[1] || start;

      sketch.quadraticVertex(start.x, start.y, (start.x + end.x) / 2, (start.y + end.y) / 2);
    }
    if (!isCurrentLine) {
      sketch.vertex(line[line.length - 1].x, line[line.length - 1].y);
    }

    sketch.fill(BACKGROUND_COLOR);
    sketch.endShape();
    sketch.pop();
  }

  sketch.setup = () => {
    const canvas = sketch.createCanvas(WIDTH, HEIGHT);
    const context = canvas.canvas.getContext('2d');
    context.globalCompositeOperation = 'source-over';

    sketch.frameRate(FRAME_PER_SECOND);
  };

  sketch.draw = () => {
    sketch.clear();
    sketch.background(BACKGROUND_COLOR);

    Lines.slice(CurrentLine, LINE_COUNT).forEach(drawLine);

    sketch.strokeWeight(LINE_WIDTH * 2.5);
    sketch.stroke(PRIMARY_COLOR);
    const pos = sketch.frameCount % LINE_COUNT;
    sketch.point(Lines[CurrentLine][pos].x, Lines[CurrentLine][pos].y);

    if (CurrentLine <= TOP_BUFFER) {
      CurrentLine = Lines.length - 1;
    } else if (pos === LINE_COUNT - 1) {
      CurrentLine--;
    }
  };
};
