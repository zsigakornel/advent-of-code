/*
The Historians use their fancy device again, this time to whisk you all away to the North Pole prototype suit manufacturing lab... in the year 1518! It turns out that having direct access to history is very convenient for a group of historians.

You still have to be careful of time paradoxes, and so it will be important to avoid anyone from 1518 while The Historians search for the Chief. Unfortunately, a single guard is patrolling this part of the lab.

Maybe you can work out where the guard will go ahead of time so that The Historians can search safely?

You start by making a map (your puzzle input) of the situation. For example:

....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
The map shows the current position of the guard with ^ (to indicate the guard is currently facing up from the perspective of the map). Any obstructions - crates, desks, alchemical reactors, etc. - are shown as #.

Lab guards in 1518 follow a very strict patrol protocol which involves repeatedly following these steps:

If there is something directly in front of you, turn right 90 degrees.
Otherwise, take a step forward.
Following the above protocol, the guard moves up several times until she reaches an obstacle (in this case, a pile of failed suit prototypes):

....#.....
....^....#
..........
..#.......
.......#..
..........
.#........
........#.
#.........
......#...
Because there is now an obstacle in front of the guard, she turns right before continuing straight in her new facing direction:

....#.....
........>#
..........
..#.......
.......#..
..........
.#........
........#.
#.........
......#...
Reaching another obstacle (a spool of several very long polymers), she turns right again and continues downward:

....#.....
.........#
..........
..#.......
.......#..
..........
.#......v.
........#.
#.........
......#...
This process continues for a while, but the guard eventually leaves the mapped area (after walking past a tank of universal solvent):

....#.....
.........#
..........
..#.......
.......#..
..........
.#........
........#.
#.........
......#v..
By predicting the guard's route, you can determine which specific positions in the lab will be in the patrol path. Including the guard's starting position, the positions visited by the guard before leaving the area are marked with an X:

....#.....
....XXXXX#
....X...X.
..#.X...X.
..XXXXX#X.
..X.X.X.X.
.#XXXXXXX.
.XXXXXXX#.
#XXXXXXX..
......#X..
In this example, the guard will visit 41 distinct positions on your map.

Predict the path of the guard. How many distinct positions will the guard visit before leaving the mapped area?
*/

const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;

  const rows = data.split("\n");

  const matrix = rows.map((row) => row.split(""));

  let [i, j] = getStartingPosition(matrix);

  console.log(solution1(matrix, i, j));
  console.log(solution2(matrix, i, j));
});

const move = (i, j, direction) => {
  if (direction === "up") {
    return [i - 1, j];
  } else if (direction === "down") {
    return [i + 1, j];
  } else if (direction === "left") {
    return [i, j - 1];
  } else if (direction === "right") {
    return [i, j + 1];
  }
};

const getStartingPosition = (matrix) => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === "^") {
        return [i + 1, j];
      }
    }
  }
};

const solution1 = (matrix, startingI, startingJ) => {
  let direction = "up";
  let visited = 0;
  let counter = 0;
  let i = startingI;
  let j = startingJ;

  while (i >= 0 && i < matrix.length && j >= 0 && j < matrix[0].length) {
    if (counter === matrix.length * matrix[0].length * 10) {
      return -1;
    }
    if (matrix[i][j] === "#") {
      if (direction === "up") {
        direction = "right";
        counter++;
        [i, j] = move(i + 1, j, direction);
      } else if (direction === "right") {
        direction = "down";
        counter++;
        [i, j] = move(i, j - 1, direction);
      } else if (direction === "down") {
        direction = "left";
        counter++;

        [i, j] = move(i - 1, j, direction);
      } else if (direction === "left") {
        direction = "up";
        counter++;

        [i, j] = move(i, j + 1, direction);
      }
    } else {
      if (matrix[i][j] !== "X") {
        visited++;
      }
      matrix[i][j] = "X";
      [i, j] = move(i, j, direction);
      counter++;
    }
  }

  return visited;
};

const solution2 = (matrix, startingI, startingJ) => {
  const i = startingI;
  const j = startingJ;

  let counter = 0;

  for (let k = 0; k < matrix.length; k++) {
    for (let l = 0; l < matrix[0].length; l++) {
      if (k !== i || l !== j) {
        const copy = JSON.parse(JSON.stringify(matrix));

        copy[k][l] = "#";

        const result = solution1(copy, i, j);

        if (result === -1) {
          counter++;
        }
      }
    }
  }

  return counter;
};
