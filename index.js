const Letter = require('./Letter.js');
const Word = require('./Word.js');
const inquirer = require('inquirer');
const ud = require('urban-dictionary')


function displayGameHeaderWith(definition) {
    console.log(
        `
-------------------------------------------------------------------------------
In this game you will guess an "urban" word based on the definition provided.
Good luck!!!!!

Definition: ${definition}
        `)
};

function getLetter() {
    return new Promise((resolve, reject) => {
        return inquirer
            .prompt([
                {
                    name: "guessLetter",
                    message: "Guess a letter!"
                }
            ])
            .then(function (answer) {
                resolve(answer.guessLetter);
            });
    });
};

// function displayWordHolderOf(word) {
//     const chosenWord = new Word(word);
//     const display = chosenWord.displayWord();
//     console.log(display);
//     return display;
// };

function getUrbanWord() {
    return new Promise((resolve, reject) => {
        return ud.random(function (error, entry) {
            if (error) {
                reject(error.message);
            } else {
                resolve(entry);
            };
        });
    });
};

function getLetterInputAndUpdateWord(urbanWord) {
    let correctGuessCount = 0;
    if(correctGuessCount < urbanWord.letterArray.length){

        getLetter()
            .then((letterInput) => {
                if (urbanWord.letterArray.includes(letterInput)) {
                    console.log('Correct!!!');
                    correctGuessCount++;
                }
                else console.log('Incorrect!!!');
                urbanWord.checkAllLetter(letterInput);
                urbanWord.displayWord();
                getLetterInputAndUpdateWord(urbanWord);
            })
            .catch((err) => console.error(err));
    } else console.log('Congrats!')
}

function playGame() {
    let urbanWord = {}, definition = '', example = '';
    return getUrbanWord()
        .then((entry) => {

            urbanWord = new Word(entry.word);
            console.log(urbanWord);
            definition = entry.definition;
            example = entry.example;

            displayGameHeaderWith(definition);
            urbanWord.displayWord();
            getLetterInputAndUpdateWord(urbanWord);

        })
        .catch((err) => console.error(err));
};
playGame();