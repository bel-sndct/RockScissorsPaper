let tableModule = require("table");

class HelpTable {
    allMoves;
    moveSetsScheme;
    movesCount;
    data = [[]];

    constructor(_moveSets, _moves) {
        this.allMoves = _moves;
        this.moveSetsScheme = _moveSets.flat();
        this.movesCount = _moveSets.length;
        this.parseData();
    }

    parseData() {
        this.data[0].push("Moves");
        this.allMoves.forEach(elem => { this.data[0].push(elem); });
        this.setScheme();
    }

    setScheme() {
        let dataIndex = 1, movesIndex = 0;
        this.data.push([this.allMoves[movesIndex]]);
        this.moveSetsScheme.forEach((elem, index) => {
            this.data[dataIndex].push(this.codes2Status(elem));
            if ((index + 1) % this.movesCount === 0 && index !== this.moveSetsScheme.length - 1) {
                this.data.push([this.allMoves[++movesIndex]]);
                dataIndex++;
            }
        });
    }

    codes2Status(_elem) {
        if (_elem === 2) return "Draw";
        else if (_elem === 1) return "Win";
        return "Lose";
    }

    showHelpTable() {
        console.log(tableModule.table(this.data));
    }
}

module.exports = HelpTable;