function Letter(letter) {
    this.letter = letter;
    this.isGuessed = false;
};
Letter.prototype.displayLetter = function() {
    if (this.isGuessed) return this.letter;
    else return '-';
};
Letter.prototype.checker = function(letterInput) {
    if (this.letter == letterInput) this.isGuessed = true
    else this.isGuessed == false;
};

module.exports = Letter;