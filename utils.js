const readline = require("readline");

function promptUserResponse() {
  return new Promise((resolve) => {
    const rd = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rd.question(`Your move: `, (res) => {
      resolve(res);
      rd.close();
    });
  });
}

function validateMoves(moves) {
  if (moves.length <= 1 || moves.length % 2 === 0) {
    console.log(
      "Count of moves should be at least 3 and odd! Correct: rock paper scissors. Incorrect: rock paper paper lizard"
    );
    return false;
  }
  const duplicateMoves = {};
  const hasDuplicate = moves.some((move) => {
    if (duplicateMoves[move]) {
      console.log(
        "Moves can not contain duplicates! Correct: rock paper scissors. Incorrect: rock paper paper. "
      );
      return true;
    }
    duplicateMoves[move] = true;
  });
  if (hasDuplicate) return false;
  return true;
}

module.exports = {
  promptUserResponse,
  validateMoves,
};
