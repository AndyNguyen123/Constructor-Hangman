function Letter(letter) {
    this.string = letter;
    this.isGuessed = false;
};
Letter.prototype.displayLetter = function() {
    if(this.isGuessed) return this.string;
    else return '-';
};
Letter.prototype.checker = function(letterInput) {
    if(this.string == letterInput) this.isGuessed = true
    else this.isGuessed == false;
};

module.exports = Letter;