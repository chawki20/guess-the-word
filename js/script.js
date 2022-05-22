const guessedLettersElement = document.querySelector (".guessed-letters");
const guessButton = document.querySelector (".guess");
const letterInput = document.querySelector (".letter");
const wordInProgress = document.querySelector (".word-in-progress");
const remainingGuesses = document.querySelector (".remaining");
const remainingGuessesSpan = document.querySelector (".remaining span");
const message = document.querySelector (".message");
const playAgainButton = document.querySelector (".play-again");

const word = "magnolia";
const allGuesses = [];

//placeholders//
const placeholder = function (word) { 
    const placeholderLetters = [];
    for (const letter of word){
        console.log (letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};
placeholder(word);

//add event listener
guessButton.addEventListener ("click", function (e){
    e.preventDefault();
    message.innerText = "";
    const guess = letterInput.value;
    const goodGuess = checkInput(guess);

    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value ="";
});

//Checks the players input
const checkInput = function (input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0){
        message.innerText = "Please enter a letter A - Z!";
    } else if (input.length > 1){
        message.innerText = "Only 1 letter please.";
    } else if (!input.match(acceptedLetter)){
        message.innerText = "No numbers or special characters here, only letters please :)";
    } else {
        return input;
    }
};    

//Captures the players input    
const makeGuess = function (guess){
    guess = guess.toUpperCase ();
    if (allGuesses.includes (guess)) {
        message.innerText = "This one again? Try another letter please :)";
    } else {
        allGuesses.push(guess);
        console.log(allGuesses);
    }
};