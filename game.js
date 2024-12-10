const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const winMessage = document.querySelector('.win-message');
const winText = document.querySelector('.win-text');
const restartButton = document.querySelector('.restart-button');

// Escondendo a mensagem de vitória e o botão de reinício no início
winMessage.classList.add('hidden');
restartButton.style.display = 'none';

const stitch = [
    'stitch01',
    'stitch02',
    'stitch03',
    'stitch04',
    'stitch05',
    'stitch06',
    'stitch08',
    'stitch09',
    'stitch10',
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 18) {
        clearInterval(this.loop);
        winText.innerHTML = `Congrats ${spanPlayer.innerHTML}! Your time was ${timer.innerHTML} secs!!`;
        winMessage.classList.remove('hidden');  // Mostrar a mensagem de vitória
        restartButton.style.display = 'block';  // Mostrar o botão de reinício
    }
}

const checkCards = () => {
    const firstStitch = firstCard.getAttribute('data-stitch');
    const secondStitch = secondCard.getAttribute('data-stitch');

    if (firstStitch === secondStitch) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 500);
    }
}

const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
        checkCards();
    }
}

const createCard = (stitch) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('./images/${stitch}.png')`;

    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener('click', revealCard);
    card.setAttribute('data-stitch', stitch);

    return card;
}

const loadGame = () => {
    const duplicateStitch = [...stitch, ...stitch];
    const shuffledStitch = duplicateStitch.sort(() => Math.random() - 0.5);

    shuffledStitch.forEach((stitch) => {
        const card = createCard(stitch);
        grid.appendChild(card);
    });
}

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
}

restartButton.addEventListener('click', () => {
    window.location = 'index.html';
});

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
}
