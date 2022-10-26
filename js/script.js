//Global Variables
const guessedLettersList = document.querySelector (".guessed-letters");
const guessButton = document.querySelector (".guess");
const letterInput = document.querySelector (".letter");
const wordInProgress = document.querySelector (".word-in-progress");
const remainingGuessesPara = document.querySelector (".remaining");
const remainingGuessesSpan = document.querySelector (".remaining span");
const message = document.querySelector (".message");
const playAgainButton = document.querySelector (".play-again"); 

let word = "magnolia"; //starter word, replace with API
const guessedLetters = []; //array of guessed letters
let remainingGuesses = 8;

//Add Async function
const getWord = async function () {
    const response = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text ();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

//starts game
getWord();

//placeholders//
const placeholder = function (word) { 
    const placeholderLetters = [];
    for (const letter of word){
        console.log (letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

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
        remainingGuessCount (guess);
        updateWord(guessedLetters);
    }
};

//Function to Show Guessed Letters
const showGuessedLetters = function (){
    guessedLettersList.innerText = "";
    for (const letter of guessedLetters){
        const li = document.createElement ("li");
        li.innerText = letter;
        guessedLettersList.append (li);
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

//Function to Count Remaining Guesses
const remainingGuessCount = function (guess) {
    const upperWord = word.toUpperCase(); 
    if (!upperWord.includes(guess)){
        message.innerText = "Not this time ☹️ ... try again.";
        remainingGuesses -= 1;
    } else {
        message.innerText = "🤩Great job! What letter next?";
    }

    if (remainingGuesses === 0){
        message.innerText = `😩 Game over... The word is ${word}.`;
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `only 1 guess`;
    } else  {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

//Create function to check if player won
    const checkIfWon = function () {
        if (word.toUpperCase() === wordInProgress.innerText) {
            message.classList.add("win");
            message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
       
            startOver();
        }
    };

//Create a function to hide,show elements
const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuessesPara.classList.add("hide");
    guessedLettersList.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

    //6/28 Next:Add a Click Event to the Play Again Button
    //10/26 Add Click Even to Play Again Button

    //add event listener
playAgainButton.addEventListener ("click", function (){
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersList.innerHTML = "";
    message.innerText = "";
    // Grab new word
    getWord();

    //show the right UI elements
    guessLetterButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remainingGuessesPara.classList.remove("hide");
    guessedLettersList.classList.remove("hide");
});