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
    const overlay = document.querySelector('#overlay');
    overlay.style.display = 'none';
});

function getRandomPhraseAsArray(arr) {
    // function fetches a random phrase from the phrases array
    let randomNumber = Math.floor(Math.random() * arr.length);
    let phrase = arr[randomNumber];
    let phraseArray = phrase.split();
    return phraseArray;
}

console.log(getRandomPhraseAsArray(phrases));

function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        let listItems = '';
        listItems += `<li>${i}</li>`;
        let list = document.querySelector('#phrases ul');
        list.appendChild(listItem);
        if (i !== ' ') {
            listItem.className = 'letter';
        }
    }

}

