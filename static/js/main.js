const totalCards = 41;
const cardBackgrounds = Array(totalCards).fill("jack.png");
const queenIndex = Math.floor(Math.random() * totalCards);
cardBackgrounds[queenIndex] = "queen.png";

let shuffleInterval;
let cardsClickable = false;

function getRandomPosition() {
  const maxWidth = window.innerWidth - 120;
  const maxHeight = window.innerHeight - 180;
  const x = Math.floor(Math.random() * maxWidth);
  const y = Math.floor(Math.random() * maxHeight);
  return { x, y };
}

function showAllCardsFaceUp() {
  const cardsContainer = document.getElementById("cards-container");
  cardBackgrounds.forEach((cardType, index) => {
    const cardButton = document.createElement("button");
    cardButton.classList.add("playingCard");
    cardButton.disabled = true;
    cardButton.onclick = () => {
      if (cardsClickable) {
        checkIfQueen(cardButton, cardType);
      }
    };

    const cardImage = document.createElement("img");
    cardImage.classList.add("cardImage");
    cardImage.src = `/static/images/${cardType}`;
    cardButton.appendChild(cardImage);
    cardsContainer.appendChild(cardButton);

    const { x, y } = getRandomPosition();
    cardButton.style.left = `${x}px`;
    cardButton.style.top = `${y}px`;
  });
}

function shuffleCards() {
  const cardsContainer = document.getElementById("cards-container");
  const allCards = document.querySelectorAll(".playingCard");

  allCards.forEach(card => {
    card.disabled = true;
  });

  let shuffleCounter = 0;
  shuffleInterval = setInterval(() => {
    allCards.forEach(card => {
      const { x, y } = getRandomPosition();
      const cardImage = card.querySelector(".cardImage");
      cardImage.src = "/static/images/cardback.png";

      card.style.left = `${x}px`;
      card.style.top = `${y}px`;
    });

    shuffleCounter++;

    if (shuffleCounter >= 20) {
      clearInterval(shuffleInterval);
      enableCards();
    }
  }, 100);
}

function enableCards() {
  const allCards = document.querySelectorAll(".playingCard");
  allCards.forEach(card => {
    card.disabled = false;
  });
  cardsClickable = true;
}

function checkIfQueen(cardButton, cardType) {
  const cardImage = cardButton.querySelector('.cardImage');

  if (cardType === "queen.png") {
    cardImage.src = "/static/images/queen.png";
    fetchFlag();
  } else {
    cardImage.src = "/static/images/jack.png";
    alert("Oops! Not the Queen, try again!");
    resetGame();
  }
}

function fetchFlag() {
  fetch('/get_flag')
    .then(response => response.json())
    .then(data => {
      alert(`You found the Queen! You win!\nFlag: ${data.flag}`);
      resetGame();
    })
    .catch(error => {
      console.error("Error fetching the flag:", error);
    });
}

function resetGame() {
  setTimeout(() => {
    document.getElementById('playerMessage').textContent = "Find the Queen!";
    document.getElementById("cards-container").innerHTML = "";
    showAllCardsFaceUp();
    cardsClickable = false;
  }, 2000);
}

function disableAllCards() {
  const allCards = document.querySelectorAll(".playingCard");
  allCards.forEach(card => {
    card.disabled = true;
  });
  cardsClickable = false;
}

function startShuffle() {
  disableAllCards();
  document.getElementById('playerMessage').textContent = "Shuffling cards...";
  setTimeout(() => {
    shuffleCards();
  }, 2000);
}

function startGame() {
  showAllCardsFaceUp();
}

window.onload = startGame;
