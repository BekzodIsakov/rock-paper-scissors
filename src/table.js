const AsciiTable = require("ascii-table");

class Table {
  generate(moves) {
    const table = new AsciiTable();
    table.setHeading("v PC\\User >", ...moves);

    const limit = Math.floor(moves.length / 2);
    for (let i = 0; i < moves.length; i++) {
      const results = [];
      for (let j = 0; j < moves.length; j++) {
        if (i === j) {
          results.push("Draw");
        } else if (i > j) {
          if (i - j <= limit) {
            results.push("Lose");
          } else {
            results.push("Win");
          }
        } else if (i < j) {
          if (j - i <= limit) {
            results.push("Win");
          } else {
            results.push("Lose");
          }
        }
      }
      table.addRow(moves[i], ...results);
    }

    return table.toString();
  }
}

module.exports = Table;