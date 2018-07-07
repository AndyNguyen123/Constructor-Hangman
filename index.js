const game = require('./Word.js');
const inquirer = require('inquirer');
const ud = require('urban-dictionary')

function displayGameHeader(entry) {
    console.log(
        `-------------------------------------------------------------------------------
        In this game you will guess an "urban" word based on the definition provided.
        Good luck!!!!!
        
        Definition: ${entry.definition}
        `)
}

function inquirerGuessLetter() {
    inquirer.prompt([
        {
            name: "guessLetter",
            message: "Guess a letter!"
        }
    ])
        .then(function (answer) {
            console.log(answer.guessLetter);
        });
}

playGame();
function playGame() {
    return getUrbanWord()
        .then((entry) => displayGameHeader(entry))
        .catch((error) => console.error(error));
};


function getUrbanWord() {
    return new Promise((resolve, reject) => {
        return ud.random(function (error, entry) {
            if (error) {
                reject(error.message);
            } else {
                // console.log(entry);
                resolve(entry);
            };
        });
    });
};
