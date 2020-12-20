export default sketch => {
  const canvasSize = 300,
      canvasWidth = canvasSize,
      canvasHeight = canvasSize,
      strokeWidth = 2,
      length = 8,
      margin = 10,
      frameRate = 60,
      maxAngle = 305,
      minAngle = 245;

  let angle = minAngle,
      rotateDir = 1;

  const getSize = (width, length, margin) => {
    let totalLength = 0,
        noOfCols = 0;

    margin = margin || 0;

    while (totalLength < width) {
      totalLength = totalLength + margin + length;
      noOfCols++;
    }

    return noOfCols;
  }

  sketch.setup = () => {
    sketch.createCanvas(canvasWidth, canvasHeight);
    sketch.frameRate(frameRate);
  };

  sketch.draw = () => {
    sketch.background(255)

    const columns = getSize(canvasWidth, length, margin),
          rows = getSize(canvasHeight, length, margin);

    angle = angle + rotateDir;
    for (let i = 0; i < rows - 1; i++) {
      for (let j = 0; j < columns - 1; j++) {
        const currentOffset = {
          x: (j * length) + ((j + 1) * margin),
          y: ((i + 1) * margin) + (i * strokeWidth),
        };

        sketch.strokeWeight(strokeWidth);
        sketch.stroke(100);

        sketch.push();

        sketch.translate(currentOffset.x, currentOffset.y);

        sketch.angleMode(sketch.DEGREES);
        sketch.rotate(angle);

        sketch.line(0, 0, length, 0);

        sketch.pop();
      }
    }

    if (angle > maxAngle || angle < minAngle) {
      rotateDir = rotateDir * -1;
    }
  }
};
