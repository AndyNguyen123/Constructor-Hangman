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

function getLetterInputAndUpdateWord(urbanWord, example) {
    const correctGuessCount = urbanWord.letterObjectArray.map(element => element.isGuessed).filter(element => element === true).length;
    if (correctGuessCount < urbanWord.letterArray.length) {
        getLetter()
            .then((answer) => {
                const letterInput = answer.toLowerCase();
                urbanWord.checkAllLetter(letterInput);
                if (urbanWord.letterArray.includes(letterInput)) {
                    console.log('Correct!!!');
                }
                else console.log('Incorrect!!!');
                urbanWord.displayWord();
                getLetterInputAndUpdateWord(urbanWord, example);
            })
            .catch((err) => console.error(err));
    } else {
        console.log('\n' + example);
    }
}

function playGame() {
    let udW = {}, def = '', ex = '';
    return getUrbanWord()
        .then((entry) => {
            udW = new Word(entry.word.toLowerCase());

            //using regex to replace the keyword in the definition to []
            let re = new RegExp(udW.word, "gi");
            def = entry.definition.replace(re, '[...]');
            ex = entry.example;

            displayGameHeaderWith(def);
            udW.checkAllLetter(' ');
            udW.checkAllLetter('-');
            udW.displayWord();
            getLetterInputAndUpdateWord(udW, ex);
        })
        .catch((err) => console.error(err));
};
playGame();