const guessedLettersElement = document.querySelector (".guessed-letters");
const guessButton = document.querySelector (".guess");
const letterInput = document.querySelector (".letter");
const wordInProgress = document.querySelector (".word-in-progress");
const remainingGuesses = document.querySelector (".remaining");
const remainingGuessesSpan = document.querySelector (".remaining span");
const message = document.querySelector (".message");
const playAgainButton = document.querySelector (".play-again");

const word = "magnolia"; //starter word, replace with API
const guessedLetters = []; //array of guessed letters

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
    if (guessedLetters.includes (guess)) {
        message.innerText = "This one again? Try another letter please :)";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuessedLetters();
        updateWord(guessedLetters);
    }
};

//Function to Show Guessed Letters
const showGuessedLetters = function (){
    guessedLettersElement.innerText = "";
    for (const letter of guessedLetters){
        const li = document.createElement ("li");
        li.innerText = letter;
        guessedLettersElement.append (li);
    }
};

//Function to Update Work in Progress
const updateWord = function (guessedLetters){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split ("");
    console.log(wordArray);
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes (letter)){
            revealWord.push (letter.toUpperCase());
        } else {
            revealWord.push("●");
         }
      }
      wordInProgress.innerText = revealWord.join("");  
      checkIfWon();
    };

    //Create function to check if player won
    const checkIfWon = function () {
        if (word.toUpperCase() === wordInProgress.innerText) {
            message.classList.add("win");
            message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
        }
    };