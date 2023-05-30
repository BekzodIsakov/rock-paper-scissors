const secureRandom = require("secure-random");

class KeyGenerator {
  generate() {
    const key = secureRandom(32, { type: "Buffer" })
      .toString("hex")
      .toUpperCase();
    return key;
  }
}

module.exports = KeyGenerator;
