const readline = require("readline-sync");
let randomNumberSync = require("random-number");
let HMACGenerator = require("./HMACGenerator");
let RulesDefiner = require("./RulesDefiner");

class Game {
    moves = [];
    userMove = "";
    computerMove = 0;
    isEndGame = false;
    waitMessage = "Press any key to continue...";

    constructor(_moves) { this.moves = _moves; }

    hasValidSize = (_source) => _source.length > 2;
    hasOddLength = (_source) => _source.length % 2 !== 0 || _source.length === 0;
    hasUniqueItems = (_source) => (new Set(_source)).size === _source.length;

    validators = [
        {check: this.hasValidSize, message: "ERROR: Not enough arguments for starting game!"},
        {check: this.hasOddLength, message: "ERROR: The number of arguments must be odd!"},
        {check: this.hasUniqueItems, message: "ERROR: Repeating arguments found!"}
    ];

    validateInput = (_source, _validators) => _validators.filter(validator => !validator.check(_source));

    startValidation() {
        const checkResults = this.validateInput(this.moves, this.validators).map(elem => {
            return elem.message;
        });
        if (checkResults.length === 0) this.startGame();
        else checkResults.forEach(elem => console.log(elem));
    }

    startGame() {
        while (!this.isEndGame) {
            console.log("\nROCK SCISSORS PAPER");
            this.generateComputerMove();
            this.showHMAC();
            this.showMenu();
            this.readUserMove();
            if (this.showUserMove()) {
                this.showComputerMove();
                this.showMoveResults();
            }
            if (!this.isEndGame) readline.question(this.waitMessage);
        }
        console.log("Closing application..");
    }

    showMenu() {
        console.log("Available moves:");
        this.moves.forEach((elem, index) => {
            console.log(`${index + 1} -> ${elem}`);
        });
        console.log("0 -> Exit\n? -> Help");
    }

    readUserMove() {
        do {
            this.userMove = readline.question("Enter your move: ");
        } while(!this.checkUserInput());
    }

    checkUserInput() {
        if (this.userMove === "?") return true;
        else if (this.userMove.replace(/\s/g, '').length === 0
              || parseInt(this.userMove) < 0
              || parseInt(this.userMove) > this.moves.length) {
            console.log(`Incorrect input! Expected: number<0 - ${this.moves.length}>, or <?>`);
            return false;
        }
        else return true;
    }

    showUserMove() {
        switch(this.userMove) {
            case "?": { RulesDefiner.helpTable.showHelpTable(); return false; }
            case "0": { this.isEndGame = true; return false; }
            default: {
                console.log(`You move: ${this.moves[this.userMove - 1]}`); return true;
            }
        }
    }

    generateComputerMove() {
        HMACGenerator.generateRandomKey();
        this.computerMove = randomNumberSync({min: 0, max: this.moves.length - 1, integer: true});
        HMACGenerator.generateHMAC(this.moves[this.computerMove]);
    }

    showHMAC() {
        console.log(`HMAC: ${HMACGenerator.movHMAC}`);
    }

    showComputerMove() {
        console.log(`Computer move: ${this.moves[this.computerMove]}`);
    }

    showMoveKey() {
        console.log(`HMAC key: ${HMACGenerator.movKey}`);
    }

    showMoveResults() {
        RulesDefiner.getMoveResult(parseInt(this.userMove), this.computerMove);
        this.showMoveKey();
    }
}

module.exports = new Game(process.argv.slice(2));