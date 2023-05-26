const letterButtons = document.querySelectorAll('#qwerty button');
const buttonDiv = document.querySelector('#qwerty');
const phraseToGuess = document.querySelector('#phrase');
const startButton = document.querySelector('.btn__reset');
const title = document.querySelector('.title');
const heartImgs = document.querySelectorAll('.tries img');
const overlay = document.querySelector('#overlay');

let missed = 0;

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
    'ABRACADABRA',
    'SAY HELLO TO MY LITTLE FRIEND',
    'CARRY ON MY WAYWORD SON',
    'FORGET ABOUT IT',
    'CAPTAIN JACK SPARROW',
    'BECAUSE I SAID SO',
    'THE ONLY THING WE HAVE TO FEAR IS FEAR ITSELF',
    'I HAVE A DREAM',
    'HOUSTON WE HAVE A PROBLEM'
];

startButton.addEventListener('click', () => {
    //function hides the start game overlay when 'start game' button is clicked
    overlay.style.display = 'none';
    //function also resets game after win or loss
    if (startButton.textContent === 'Play again') {
        reset();
    }
});

function getRandomPhraseAsArray(arr) {
    // function fetches a random phrase from the phrases array
    let randomNumber = Math.floor(Math.random() * arr.length);
    let phrase = arr[randomNumber];
    localStorage.setItem('recentPhrase', phrase);
    let phraseSplitByWords = phrase.split(' ');
    return phraseSplitByWords;
}

let phraseToDisplay = getRandomPhraseAsArray(phrases);
//stores a random phrase from the phrases array and turns that phrase into an array

function addPhraseToDisplay(arr) {
    //function creates an li, adds array's text at index to li, appends li to ul, and repeats until all characters in the array are li's
        for (let i = 0; i < arr.length; i++) {
            let div = document.createElement('div');
            div.classList.add('word-div');
            let characters = arr[i].split('');
            for (let i = 0; i < characters.length; i++) {
                let li = document.createElement('li');
                li.textContent = `${characters[i]}`;
                let ul = document.querySelector('#phrase ul');
                ul.appendChild(div);
                div.appendChild(li);
                if (li.textContent !== ' ') {
                    li.classList.add('letter');                
                }
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

buttonDiv.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const clickedButton = e.target;
        clickedButton.classList.add('chosen');
        clickedButton.disabled = true;
        let letterFound = checkLetter(clickedButton); 
        if (letterFound === null) {
            missed += 1;
            heartImgs[heartImgs.length - missed].src = 'images/lostHeart.png';
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
        overlay.classList.add('win');
        title.textContent = 'Congratulations! You won!';
        overlay.style.display = 'flex';
        startButton.textContent = 'Play again';
    }
    if (missed > 4) {
        for (let i =0; i < showLis.length; i++) {
            showLis[i].classList.remove('show');
        }
        overlay.classList.remove('start');
        overlay.classList.add('lose');
        title.textContent = 'Uh oh! Better luck next time!';
        overlay.style.display = 'flex';
        startButton.textContent = 'Play again';
    }
}

function reset() {
    missed = 0;
    const ul = document.querySelector('#phrase ul');
    const wordDivs = document.querySelectorAll('.word-div');
    const heartsList = document.querySelector('ol');
    overlay.classList.remove('win');
    overlay.classList.remove('lose');
    for (let i = 0; i < wordDivs.length; i++) {
        ul.removeChild(wordDivs[i]);
    }
    for (let i = 0; i < letterButtons.length; i++) {
        letterButtons[i].disabled = false;
        letterButtons[i].classList.remove('chosen');
    }
    for (let i = 0; i < 5; i++) {
        heartImgs[i].src = 'images/liveHeart.png';
    }
    let newPhraseToDisplay = getRandomPhraseAsArray(phrases);
    if (localStorage.getItem('phrase') !== newPhraseToDisplay) {
        getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(newPhraseToDisplay);
    } else {
        localStorage.removeItem('phrase');
        localStorage.setItem('newPhraseToDisplay');
        newPhraseToDisplay = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(phraseToDisplay);
    }
}        
 
