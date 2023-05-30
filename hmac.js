const crypto = require("crypto");

class Hmac {
  calculate(key, pcMove) {
    const hmac = crypto
      .createHmac("sha256", key)
      .update(pcMove)
      .digest("hex")
      .toUpperCase();
    return hmac;
  }
}

module.exports = Hmac;
