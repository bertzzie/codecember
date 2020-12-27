export default sketch => {
  const WIDTH = 720,
        HEIGHT = 400,
        CELL_SIZE = 20,
        COLUMNS = Math.floor(WIDTH / CELL_SIZE),
        ROWS = Math.floor(HEIGHT / CELL_SIZE);

  // We use multiple board here just like a frame buffer
  // so we can calculate the next board state and just
  // swap those. This will be faster and simpler
  // compared to calculating and updating the board.
  let Board = Array.from(Array(COLUMNS), () => new Array(ROWS)),
      NextBoard = Array.from(Array(COLUMNS), () => new Array(ROWS));

  const dead = () => {
    return { value: 0, gen: 0 };
  }

  const reproduce = (cell) => {
    return { value: 1, gen: cell.gen + 1 };
  };

  const survive = (cell) => {
    return Object.assign({}, cell, { gen: cell.gen + 1 });
  };

  const calculateColor = (generation) => {
    return sketch.color(generation, generation, generation);
  };

  const initializeBoard = () => {
    for (let i = 0; i < COLUMNS; i++) {
      for (let j = 0; j < ROWS; j++) {
        // edges
        if (i === 0 || j === 0 || i === COLUMNS - 1 || j === ROWS - 1) {
          Board[i][j] = dead();
        } else {
          Board[i][j] = { value: sketch.floor(sketch.random(2)), gen: 0 };
        }

        NextBoard[i][j] = dead();
      }
    }
  };

  const calculateNextGeneration = () => {
    for (let x = 1; x < COLUMNS - 1; x++) {
      for (let y = 1; y < ROWS - 1; y++) {

        // Neighbour value is either -1, 0, +1
        // from each direction. We loop through
        // it here.
        let neighbours = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            // We add all values except the center (0,0),
            // in other words (x,y) which is the value
            // being checked itself.
            if (i !== 0 || j !== 0) {
              neighbours += Board[x + i][y + j].value;
            }
          }
        }

        // Conway rules of life
        if      (Board[x][y].value === 1 && neighbours <   2) NextBoard[x][y] = dead();                 // dies of underpopulation
        else if (Board[x][y].value === 1 && neighbours >   3) NextBoard[x][y] = dead();                 // dies of overpopulation
        else if (Board[x][y].value === 0 && neighbours === 3) NextBoard[x][y] = reproduce(Board[x][y]); // reproduction
        else                                                  NextBoard[x][y] = survive(Board[x][y]);   // survived to next gen
      }
    }

    // Swap the "buffer" board.
    let temp = Board;
    Board = NextBoard;
    NextBoard = temp;
  };

  const drawCanvasBorders = () => {
    const el = document.querySelector('#container > canvas');
    el.style.border = '2px solid rgba(120, 120, 120, 0.5)';
    el.style.borderRadius = '15px';
  };

  sketch.setup = () => {
    sketch.createCanvas(WIDTH, HEIGHT);
    sketch.colorMode(sketch.HSB);
    sketch.noStroke();

    drawCanvasBorders();
    initializeBoard();
  };

  sketch.draw = () => {
    sketch.background(255);

    calculateNextGeneration();

    // Draw the board
    for (let i = 0; i < COLUMNS; i++) {
      for (let j = 0; j < ROWS; j++) {
        if (Board[i][j].value === 1) {
          sketch.fill(calculateColor(Board[i][j].gen));
        } else {
          sketch.fill(255);
        }

        sketch.rect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
      }
    }
  };
};
