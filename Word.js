const Letter = require('./Letter.js');

function Word(word) {
    this.letterArray = word.split('').map(element => new Letter(element));
}
Word.prototype.displayWord = function () {
    return this.letterArray.map(element => element.displayLetter()).join(' ');
}
Word.prototype.checkAllLetter = function (letterInput) {
    return this.letterArray.forEach(element => element.checker(letterInput));
}

module.exports = Word;



