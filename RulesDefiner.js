let HelpTable = require("./HelpTable");

class RulesDefiner {
    movesCount;
    moveSets  = [[]];
    movesResults = ["You Lose", "You Win", "Draw"];
    helpTable;

    get movSets() { return this.moveSets; }

    constructor(_moves) {
        this.movesCount = _moves.length;
        this.defineMoveSetsMatrix(_moves);
        this.helpTable = new HelpTable(this.moveSets.slice(), _moves);
    }

    defineMoveSetsMatrix(_moves) {
        let offset = Math.floor(_moves.length / 2);
        _moves.forEach((elem, index) => {
            this.moveSets[0].push(this.priorityComparator(index, offset));
        });
        while(this.moveSets.length < this.movesCount)
            this.addRulesRow(this.moveSets[this.moveSets.length - 1].slice());
    }

    addRulesRow(_template) {
        _template.unshift(_template[_template.length - 1]);
        _template.splice(_template.length - 1, 1);
        this.moveSets.push(_template);
    }

    priorityComparator(_index, _offset) {
        if (_offset - _index === _offset) return 2;
        else if (_offset - _index >= 0) return 1;
        return 0;
    }

    getMoveResult(_userMove, _computerMove) {
        console.log(this.movesResults[this.moveSets[_userMove - 1][_computerMove]]);
    }
}

module.exports = new RulesDefiner(process.argv.slice(2));