let randomNumber = require("random-number");
sha3_256 = require("js-sha3").sha3_256;

class HMACGenerator {
    moveKey = 0;
    moveHMAC = "";

    get movKey() { return this.moveKey }
    get movHMAC() { return this.moveHMAC }

    generateRandomKey() {
        let temp = "0b";
        while (temp.length < 258) temp += randomNumber({min: 0, max: 1, integer: true});
        this.moveKey = BigInt(temp).toString(16).toUpperCase();
    }

    generateHMAC(_computerMove) {
        this.moveHMAC = sha3_256(this.moveKey + _computerMove).toUpperCase();
    }
}

module.exports = new HMACGenerator();