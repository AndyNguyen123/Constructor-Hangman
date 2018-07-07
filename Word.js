const Letter = require('./Letter.js');

function Word (word) {
    this.letterArray = word.split('').map(element => new Letter(element));
}
Word.prototype.displayWord = function () {
   return this.letterArray.map(element => element.displayLetter()).join(' ');
}
Word.prototype.checkAllLetter = function (letterInput) {
    this.letterArray.map(element => element.checker(letterInput));
}

module.exports = Word;

let chosenWord = new Word('andeptrai');
chosenWord.checkAllLetter('a');
console.log(chosenWord.displayWord());



