let deckID = "";
const shuffleDeck = document.getElementById("new-deck");
const remainingText = document.getElementById("remaining-cards");
const drawBtn = document.getElementById("draw-cards");
const cardsContainer = document.getElementById("cards");
const winnerText = document.getElementById("header");
const computerText = document.getElementById("computer");
const playerText = document.getElementById("player");
let remaining;
let computerScore = 0;
let playerScore = 0;
drawBtn.setAttribute("disabled", true);

const getNewDeck = async () => {
  const res = await fetch(
    "https://www.deckofcardsapi.com/api/deck/new/shuffle"
  );
  const data = await res.json();
  //   console.log(data);
  deckID = data.deck_id;
  remainingText.textContent = `Remaining cards: ${data.remaining}`;
  //   console.log(deckID);
  drawBtn.removeAttribute("disabled");
};

const drawCardsFromDeck = async () => {
  const res = await fetch(
    `https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`
  );
  const data = await res.json();

  remainingText.textContent = `Remaining cards: ${data.remaining}`;
  displayCards(data.cards);
  if (data.remaining == 0) {
    drawBtn.setAttribute("disabled", true);
    if (computerScore > playerScore) {
      winnerText.textContent = `Computer Wins!!!`;
    } else if (computerScore < playerScore) {
      winnerText.textContent = `You Win!!!`;
    } else {
      winnerText.textContent = `It was a tie!!!`;
    }
  }
};

const displayCards = (arrayOfCards) => {
  //   cardsDiv.innerHTML = "";
  cardsContainer.children[0].innerHTML = `
        <img src = "${arrayOfCards[0].image}" class="card">
    `;
  cardsContainer.children[1].innerHTML = `
        <img src = "${arrayOfCards[1].image}" class="card"">
    `;

  determineWinningCard(arrayOfCards[0], arrayOfCards[1]);
};

const determineWinningCard = (card1, card2) => {
  const valueOptions = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];
  const card1ValueIndex = valueOptions.indexOf(card1.value);
  const card2ValueIndex = valueOptions.indexOf(card2.value);
  if (card1ValueIndex > card2ValueIndex) {
    computerScore++;
    computerText.textContent = `Computer : ${computerScore}`;
    return "Computer wins!";
  } else if (card1ValueIndex < card2ValueIndex) {
    playerScore++;
    playerText.textContent = `You : ${playerScore}`;
    return "You win!";
  } else {
    return "War!";
  }
};

// const getWinningCard = (card1, card2) => {
//   let card1Value = card1.value;
//   let card2Value = card2.value;
//   console.log(card1Value, card2Value);
//   if (card1.value === "JACK") {
//     card1Value = 11;
//   }
//   if (card1.value === "QUEEN") {
//     card1Value = 12;
//   }
//   if (card1.value === "KING") {
//     card1Value = 13;
//   }
//   if (card1.value === "ACE") {
//     card1Value = 14;
//   }
//   if (card2.value === "JACK") {
//     card2Value = 11;
//   }
//   if (card2.value === "QUEEN") {
//     card2Value = 12;
//   }
//   if (card2.value === "KING") {
//     card2Value = 13;
//   }
//   if (card2.value === "ACE") {
//     card2Value = 14;
//   }
//   //   console.log(card1Value, card2Value);
//   if (parseInt(card1Value) > parseInt(card2Value)) {
//     console.log(`${card1.value} is the winner`);
//   } else if (parseInt(card1Value) < parseInt(card2Value)) {
//     console.log(`${card2.value} is the winner`);
//   } else {
//     console.log(`It's a tie`);
//   }
// };

shuffleDeck.addEventListener("click", getNewDeck);
drawBtn.addEventListener("click", drawCardsFromDeck);
