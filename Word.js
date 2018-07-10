const Letter = require('./Letter.js');

function Word(word) {
    this.word = word;
    this.letterArray = word.split('');
    this.letterObjectArray = this.letterArray.map(element => new Letter(element));
}
Word.prototype.displayWord = function () {
    console.log(this.letterObjectArray.map(element => element.displayLetter()).join(' '));
    return this.letterObjectArray.map(element => element.displayLetter()).join(' ');
}
Word.prototype.checkAllLetter = function (letterInput) {
    return this.letterObjectArray.forEach(element => element.checker(letterInput));
}

module.exports = Word;



