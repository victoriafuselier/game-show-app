const letterButtons = document.querySelector('#qwerty');
const phraseToGuess = document.querySelector('#phrase');
let wrongGuesses = 0;
const startButton = document.querySelector('.btn__reset');
const phrases = [
    'FOOL ME ONCE SHAME ON YOU FOOL ME TWICE SHAME ON ME',
    'HOGWARTS SCHOOL OF WITCHCRAFT AND WIZARDRY',
    'ANYTHING IS POSSIBLE',
    'NO PLACE LIKE HOME',
    'JUST KEEP SWIMMING',
    'YOU IS KIND YOU IS SMART YOU IS IMPORTANT',
    'HASTA LA VISTA BABY',
    'INCONCEIVABLE',
    'TO INFINITY AND BEYOND',
    'YOU HAD ME AT HELLO',
    'ABRACADABRA'
];

startButton.addEventListener('click', () => {
    //function hides the start game overlay when 'start game' button is clicked
    const overlay = document.querySelector('#overlay');
    overlay.style.display = 'none';
});

function getRandomPhraseAsArray(arr) {
    // function fetches a random phrase from the phrases array
    let randomNumber = Math.floor(Math.random() * arr.length);
    let phrase = arr[randomNumber];
    let phraseSplitByWords = phrase.split(' ');
    return phraseSplitByWords;
}

const phraseToDisplay = getRandomPhraseAsArray(phrases);
//stores a random phrase from the phrases array and turns that phrase into an array

function addPhraseToDisplay(arr) {
    //function creates an li, adds array's text at index to li, appends li to ul, and repeats until all characters in the array are li's
        for (let i = 0; i < arr.length; i++) {
            let div = document.createElement('div');
            let characters = div.split('');
        }
        for (let i = 0; i < characters.length; i++) {
            let li = document.createElement('li');
            li.textContent = `${characters[i]}`;
            let ul = document.querySelector('#phrase ul');
            ul.appendChild(li);
            if (li.textContent ==! ' ') {
                li.classList.add('letter');                
            }
    }
}



addPhraseToDisplay(phraseToDisplay);

function checkLetter (clickedButton) {
    lettersInPhrase = document.querySelectorAll('.letter');
    let match = null;
    for (let i = 0; i < lettersInPhrase.length; i++) {
        if (clickedButton.textContent.toUpperCase() === lettersInPhrase[i].textContent) {
            lettersInPhrase[i].classList.add('show');
            match = clickedButton.textContent;
        }
    }
    return match;
}

letterButtons.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const clickedButton = e.target;
        clickedButton.classList.add('chosen');
        clickedButton.disabled = true;
        if (checkLetter(clickedButton) === null) {
            const heartsList = document.querySelector('ol');
            const hearts = document.getElementsByClassName('tries');
            heartsList.removeChild(hearts[0]);
            wrongGuesses += 1;
        } 
    }
    checkWin();
});

function checkWin () {
    letterLis = document.querySelectorAll('.letter');
    showLis = document.querySelectorAll('.show');
    if (letterLis.length === showLis.length) {
        for (let i = 0; i < showLis.length; i++) {
            showLis[i].classList.remove('show');
         }
        let overlay = document.querySelector('#overlay');
        overlay.classList.add('win');
        overlay.textContent = 'Congratulations! You won!';
        overlay.style.display = 'flex';
    }
    if (wrongGuesses > 4) {
        for (let i =0; i < showLis.length; i++) {
            showLis[i].classList.remove('show');
        }
        overlay.classList.add('lose');
        overlay.textContent = 'Uh oh! Better luck next time!';
        overlay.style.display = 'flex';
    }
}
 
