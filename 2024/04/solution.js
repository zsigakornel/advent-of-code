/* 
"Looks like the Chief's not here. Next!" One of The Historians pulls out a device and pushes the only button on it. After a brief flash, you recognize the interior of the Ceres monitoring station!

As the search for the Chief continues, a small Elf who lives on the station tugs on your shirt; she'd like to know if you could help her with her word search (your puzzle input). She only has to find one word: XMAS.

This word search allows words to be horizontal, vertical, diagonal, written backwards, or even overlapping other words. It's a little unusual, though, as you don't merely need to find one instance of XMAS - you need to find all of them. Here are a few ways XMAS might appear, where irrelevant characters have been replaced with .:


..X...
.SAMX.
.A..A.
XMAS.S
.X....
The actual word search will be full of letters instead. For example:

MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
In this word search, XMAS occurs a total of 18 times; here's the same word search again, but where letters not involved in any XMAS have been replaced with .:

....XXMAS.
.SAMXMS...
...S..A...
..A.A.MS.X
XMASAMX.MM
X.....XA.A
S.S.S.S.SS
.A.A.A.A.A
..M.M.M.MM
.X.X.XMASX
Take a look at the little Elf's word search. How many times does XMAS appear?
*/

const fs = require("fs");

const word = "XMAS";
const word2 = "MAS";

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;

  const rows = data.split("\n");

  const matrix = rows.map((row) => row.split(""));

  const verticalPaddedMatrix = matrix.map((row) => {
    return [" ", " ", " ", " ", " ", ...row, " ", " ", " ", " ", " "];
  });

  const lineLength = verticalPaddedMatrix[0].length;

  const fullyPaddedMatrix = [
    ...Array(5).fill(Array(lineLength).fill(" ")),
    ...verticalPaddedMatrix,
    ...Array(5).fill(Array(lineLength).fill(" ")),
  ];

  console.log(checkWords(fullyPaddedMatrix));
  console.log(checkCrossWords(fullyPaddedMatrix));
  
});

const checkRight = (matrix, i, j) => {
  for (let k = 0; k < word.length; k++) {
    if (matrix[i][j + k] !== word[k]) {
      return false;
    }
  }

  return true;
};

const checkLeft = (matrix, i, j) => {
  for (let k = 0; k < word.length; k++) {
    if (matrix[i][j - k] !== word[k]) {
      return false;
    }
  }

  return true;
};

const checkDown = (matrix, i, j) => {
  for (let k = 0; k < word.length; k++) {
    if (matrix[i + k][j] !== word[k]) {
      return false;
    }
  }

  return true;
};

const checkUp = (matrix, i, j) => {
  for (let k = 0; k < word.length; k++) {
    if (matrix[i - k][j] !== word[k]) {
      return false;
    }
  }

  return true;
};

const checkDiagonal1 = (matrix, i, j) => {
  for (let k = 0; k < word.length; k++) {
    if (matrix[i + k][j + k] !== word[k]) {
      return false;
    }
  }

  return true;
};

const checkDiagonal2 = (matrix, i, j) => {
  for (let k = 0; k < word.length; k++) {
    if (matrix[i - k][j + k] !== word[k]) {
      return false;
    }
  }

  return true;
};

const checkDiagonal3 = (matrix, i, j) => {
  for (let k = 0; k < word.length; k++) {
    if (matrix[i + k][j - k] !== word[k]) {
      return false;
    }
  }

  return true;
};

const checkDiagonal4 = (matrix, i, j) => {
  for (let k = 0; k < word.length; k++) {
    if (matrix[i - k][j - k] !== word[k]) {
      return false;
    }
  }

  return true;
};

const checkWords = (matrix) => {
  let count = 0;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === word[0]) {
        if (checkRight(matrix, i, j)) {
          count++;
        }
        if (checkLeft(matrix, i, j)) {
          count++;
        }
        if (checkDown(matrix, i, j)) {
          count++;
        }
        if (checkUp(matrix, i, j)) {
          count++;
        }
        if (checkDiagonal1(matrix, i, j)) {
          count++;
        }
        if (checkDiagonal2(matrix, i, j)) {
          count++;
        }
        if (checkDiagonal3(matrix, i, j)) {
          count++;
        }
        if (checkDiagonal4(matrix, i, j)) {
          count++;
        }
      }
    }
  }

  return count;
};

const checkCrossWords = (matrix) => {
  let count = 0;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === word2[1]) {
        if (
          matrix[i - 1][j - 1] === word2[0] &&
          matrix[i + 1][j + 1] === word2[2] &&
          matrix[i + 1][j - 1] === word2[0] &&
          matrix[i - 1][j + 1] === word2[2]
        ) {
          count++;
        } else if (
          matrix[i - 1][j - 1] === word2[2] &&
          matrix[i + 1][j + 1] === word2[0] &&
          matrix[i + 1][j - 1] === word2[2] &&
          matrix[i - 1][j + 1] === word2[0]
        ) {
          count++;
        } else if (
          matrix[i - 1][j - 1] === word2[0] &&
          matrix[i + 1][j + 1] === word2[2] &&
          matrix[i + 1][j - 1] === word2[2] &&
          matrix[i - 1][j + 1] === word2[0]
        ) {
          count++;
        } else if (
          matrix[i - 1][j - 1] === word2[2] &&
          matrix[i + 1][j + 1] === word2[0] &&
          matrix[i + 1][j - 1] === word2[0] &&
          matrix[i - 1][j + 1] === word2[2]
        ) {
          count++;
        }
      }
    }
  }

  return count;
};
