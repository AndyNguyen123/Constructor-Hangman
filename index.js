const game = require('./Word.js');
const inquirer = require('inquirer');
const ud = require('urban-dictionary')

const urbanWord = {};

// getUrbanWord();
function playGame() {
    console.log(
`-------------------------------------------------------------------------------
In this game you will guess an "urban" word based on the definition provided.
Good luck!!!!!

Definition: ${urbanWord.definition}
`)
    inquirer.prompt([
        {
            name: "guessLetter",
            message: "Guess a letter!"
        }
    ])
        .then(function (answer) {
            console.log(answer.guessLetter);
        })
}

function getUrbanWord () {
    ud.random(function (error, entry) {
      if (error) {
        console.error(error.message)
      } else {
        urbanWord.word = entry.word;
        urbanWord.definition = entry.definition;
        urbanWord.example = entry.example;
        console.log(urbanWord.definition);
      }
    })
};


const prom = new Promise( (res, rej) => {
     res(getUrbanWord())
     rej(err => console.log(err))
})

prom.then( foo => console.log(foo))
.catch(err => console.log(err))