const Table = require("./table");
const KeyGenerator = require("./random-key");
const Hmac = require("./hmac");
const { promptUserResponse, validateMoves } = require("./utils");

class Game {
  constructor() {
    this.pcMoveIdx;
    this.userMoveIdx;
    this.moves = process.argv.slice(2);
  }

  async initGame() {
    if (!validateMoves(this.moves)) return;

    const keyGenerator = new KeyGenerator();
    const key = keyGenerator.generate();

    this.generatePCMove();

    const hmac = new Hmac();
    const hmacValue = hmac.calculate(key, this.moves[this.pcMoveIdx]);

    console.log("HMAC: " + hmacValue);
    console.log("Available moves:");
    this.moves.forEach((move, idx) => {
      console.log(`${++idx} - ${move}`);
    });
    console.log("0 - exit");
    console.log("? - help");

    const userResponse = await promptUserResponse();

    switch (userResponse) {
      case "0":
        return console.log("Exited game!");
      case "?":
        const table = new Table();
        console.log(table.generate(this.moves));
        return this.initGame();
    }

    if (!(1 <= userResponse && userResponse <= this.moves.length)) {
      console.log("Invalid input");
      return this.initGame();
    }

    this.userMoveIdx = userResponse - 1;

    console.log("Your move: " + this.moves[this.userMoveIdx]);
    console.log("Computer move: " + this.moves[this.pcMoveIdx]);
    console.log(this.getWinner());
    console.log("HMAC key: " + key);
  }

  generatePCMove() {
    const randomNumber = Math.floor(Math.random() * this.moves.length);
    this.pcMoveIdx = randomNumber;
    return this.pcMoveIdx;
  }

  getWinner() {
    const reorderedMoves = [...this.moves];
    const range = Math.floor(this.moves.length / 2);
    let result = this.userMoveIdx - range;
    if (this.userMoveIdx === this.pcMoveIdx) {
      return "Draw!";
    } else if (result < 0) {
      const nextMoves = reorderedMoves.splice(result);
      reorderedMoves.unshift(...nextMoves);
    } else {
      const prevMoves = reorderedMoves.splice(0, Math.abs(result));
      reorderedMoves.push(...prevMoves);
    }
    const userMove = this.moves[this.userMoveIdx];
    const pcMove = this.moves[this.pcMoveIdx];
    const userMoveIdx = reorderedMoves.indexOf(userMove);
    const pcMoveIdx = reorderedMoves.indexOf(pcMove);

    return pcMoveIdx < userMoveIdx ? "You win!" : "Computer wins!";
  }
}

const game = new Game();
game.initGame();
