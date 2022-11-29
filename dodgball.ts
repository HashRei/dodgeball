const inputData = {
  T: 2,
  testCases: [
    {
      N: 11,
      players: [
        [0, 4],
        [1, 4],
        [2, 1],
        [3, 5],
        [4, 5],
        [4, 9],
        [5, 1],
        [5, 4],
        [5, 5],
        [6, 5],
        [6, 8],
        [8, 5],
      ],
      startingDirection: "W",
      startingPlayer: 2,
    },
    {
      N: 2,
      players: [
        [0, 0],
        [9, 9],
      ],
      startingDirection: "W",
      startingPlayer: 1,
    },
  ],
};

// Main run process
// let sortedList = sortCoordinates(inputData.testCases[0].players);
let maxGridValues = maxGridValue(inputData.testCases[0].players);
let completGrid = gridCreation(
  maxGridValues[0],
  maxGridValues[1],
  inputData.testCases[0].players
);

startGame(
  inputData.testCases[0].startingDirection,
  inputData.testCases[0].startingPlayer,
  inputData.testCases[0].players,
  maxGridValues[0],
  maxGridValues[1],
  completGrid
);

// function sortCoordinates(array: number[][]) {
//   array.sort(function (a, b) {
//     return a[0] - b[0];
//   });
// }

function maxGridValue(array: number[][]) {
  //  Initialize maxX and maxY
  let maxX = Number.MIN_VALUE;
  let maxY = Number.MIN_VALUE;

  //  Length of the given array
  let n = array.length;

  //  Get maximum X & Y coordinates
  for (let i = 0; i < n; i++) {
    maxX = Math.max(maxX, array[i][0]);
    maxY = Math.max(maxY, array[i][1]);
  }

  //  Check if the required point
  //  i.e., (maxX, maxY) is present
  for (let i = 0; i < n; i++) {
    //   If powith maximum X and
    //   Y coordinates is present
    if (maxX == array[i][0] && maxY == array[i][1]) {
      return [maxX, maxY];
    }
  }
  return [maxX, maxY];
}

function gridCreation(maxX: number, maxY: number, list: number[][]) {
  // Loop to create grid
  const rows = maxX + 1;
  const cols = maxY + 1;

  // Create a 2d boolean array
  const nestedArray = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => false)
  );

  // Implement player positions
  list.forEach(function (element) {
    nestedArray[element[0]][element[1]] = true;
  });

  console.log(nestedArray);
  return nestedArray;
}

function startGame(
  startingDirection: String,
  startingPlayer: number,
  list: number[][],
  maxX: number,
  maxY: number,
  grid: boolean[][]
) {
  let direction: String = startingDirection;

  let ballPosition: number[] = list[startingPlayer - 1];

  setValueToFalse(ballPosition[0], ballPosition[1], grid);

  direction = nextDirection(direction);

  let counter: number = 0;

  let secondCounter = 0;

  while (counter <= inputData.testCases[0].N && secondCounter <= 300) {
    secondCounter++;

    setValueToFalse(ballPosition[0], ballPosition[1], grid);

    let playerRes: number[] = checkForPlayer(
      ballPosition[0],
      ballPosition[1],
      maxX,
      maxY,
      grid,
      direction
    );

    if (playerRes[0] != ballPosition[0] || playerRes[1] != ballPosition[1]) {
      counter++;
      (ballPosition[0] = playerRes[0]), (ballPosition[1] = playerRes[1]);
      console.log("New ball posiition", ballPosition);
    }

    direction = nextDirection(direction);
  }

  console.log("counter", counter);
}

function nextDirection(direction: String) {
  let res = direction;
  switch (direction) {
    case "W":
      res = "NW";
      break;
    case "NW":
      res = "N";
      break;
    case "N":
      res = "NE";
      break;
    case "NE":
      res = "E";
      break;
    case "E":
      res = "SE";
      break;
    case "SE":
      res = "S";
      break;
    case "S":
      res = "SW";
      break;
    case "SW":
      res = "W";
      break;
  }
  return res;
}

function setValueToFalse(
  xPosition: number,
  yPosition: number,
  list: boolean[][]
) {
  list[xPosition][yPosition] = false;
}

function checkForPlayer(
  xPosition: number,
  yPosition: number,
  xGridMaximum: number,
  yGridMaximum: number,
  list: boolean[][],
  direction: String
) {
  let xGridMinimum = 0;
  let yGridMinimum = 0;

  let res = [xPosition, yPosition];
  switch (direction) {
    case "W":
      for (let i = yPosition; i >= yGridMinimum; i--) {
        if (list[xPosition][i] === true) {
          // return player position
          let res = [xPosition, i];
          setValueToFalse(xPosition, i, list);
          // break;
          return res;
        }
      }
      break;

    case "NW":
      for (
        let i = xPosition, j = yPosition;
        i >= xGridMinimum && j >= yGridMinimum;
        i--, j--
      ) {
        if (list[i][j] === true) {
          // return player position
          let res = [i, j];
          setValueToFalse(i, j, list);
          // break;
          return res;
        }
      }
      break;

    case "N":
      for (let i = xPosition; i >= xGridMinimum; i--) {
        if (list[i][yPosition] === true) {
          // return player position
          let res = [i, yPosition];
          setValueToFalse(i, yPosition, list);
          // break;
          return res;
        }
      }
      break;

    case "NE":
      for (
        let i = xPosition, j = yPosition;
        i >= xGridMinimum && j < yGridMaximum;
        i--, j++
      ) {
        if (list[i][j] === true) {
          // return player position
          let res = [i, j];
          setValueToFalse(i, j, list);
          // break;
          return res;
        }
      }
      break;

    case "E":
      for (let i = yPosition; i < yGridMaximum; i++) {
        if (list[xPosition][i] === true) {
          // return player position
          let res = [xPosition, i];
          setValueToFalse(xPosition, i, list);
          // break;
          return res;
        }
      }
      break;

    case "SE":
      for (
        let i = xPosition, j = yPosition;
        i < xGridMaximum && j <= yGridMaximum;
        i++, j++
      ) {
        if (list[i][j] === true) {
          // return player position
          let res = [i, j];
          setValueToFalse(i, j, list);
          // break;
          return res;
        }
      }
      break;

    case "S":
      for (let i = xPosition; i < xGridMaximum; i++) {
        if (list[i][yPosition] === true) {
          // return player position
          let res = [i, yPosition];
          setValueToFalse(i, yPosition, list);
          return res;
          // break;
        }
      }
      break;

    case "SW":
      for (
        let i = xPosition, j = yPosition;
        i < xGridMaximum && j >= yGridMinimum;
        i++, j--
      ) {
        if (list[i][j] === true) {
          // return player position
          let res = [i, j];
          setValueToFalse(i, j, list);
          return res;
          // break;
        }
      }
      break;
  }
  return res;
}
