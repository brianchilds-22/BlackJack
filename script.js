// Define card suits and values
const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

// Function to create a deck of cards
function createDeck() {
  const deck = [];
  for (let suit of suits) {
    for (let value of values) {
      const imagePath = `main/images/${value}_of_${suit}.png`;
      deck.push({ suit, value, imagePath });
    }
  }
  return deck;
}

// Function to shuffle the deck
function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// Function to deal a card from the deck
function dealCard(deck) {
  return deck.pop();
}

// Function to calculate the value of a hand
function calculateHandValue(hand) {
  let sum = 0;
  let numAces = 0;
  for (let card of hand) {
    if (card.value === "A") {
      numAces++;
    } else if (card.value === "J" || card.value === "Q" || card.value === "K") {
      sum += 10;
    } else {
      sum += parseInt(card.value);
    }
  }
  // Add Aces as 1 or 11 depending on the total
  for (let i = 0; i < numAces; i++) {
    if (sum + 11 <= 21) {
      sum += 11;
    } else {
      sum += 1;
    }
  }
  return sum;
}

// Function to display hand
function displayHand(hand, elementId) {
  const handElement = document.getElementById(elementId);
  handElement.innerHTML = "";
  for (let card of hand) {
    const cardImg = document.createElement("img");
    cardImg.src = card.imagePath;
    handElement.appendChild(cardImg);
  }

  // hand.forEach((card) => {
  //   const cardImg = document.createElement("img");
  //   cardImg.src = card.imagePath;
  //   handElement.appendChild(cardImg);
  // }
  // );
}

// Function to display a message
function displayMessage(message) {
  const messageElement = document.getElementById("message");
  messageElement.textContent = message;
}

// Initialize game variables
let deck = [];
let playerHand = [];
let dealerHand = [];

// Event listener for the deal button
document.getElementById("deal-button").addEventListener("click", function () {
  // Create and shuffle the deck
  deck = shuffle(createDeck());

  // Deal initial cards to player and dealer
  playerHand = [dealCard(deck), dealCard(deck)];
  dealerHand = [dealCard(deck), dealCard(deck)];

  // Display hands and initial message
  displayHand(playerHand, "player-hand");
  displayHand(dealerHand, "dealer-hand");
  displayMessage("Hit or Stand?");
});

// Event listener for the hit button
document.getElementById("hit-button").addEventListener("click", function () {
  // Deal a card to the player
  playerHand.push(dealCard(deck));
  displayHand(playerHand, "player-hand");

  // Check if player busts
  if (calculateHandValue(playerHand) > 21) {
    displayMessage("You bust! Dealer wins.");
  }
});

// Event listener for the stand button
document.getElementById("stand-button").addEventListener("click", function () {
  // Dealer takes cards until their hand value is at least 17
  while (calculateHandValue(dealerHand) < 17) {
    dealerHand.push(dealCard(deck));
  }
  displayHand(dealerHand, "dealer-hand");

  // Check for dealer bust or compare hands
  const playerValue = calculateHandValue(playerHand);
  const dealerValue = calculateHandValue(dealerHand);
  if (dealerValue > 21 || playerValue > dealerValue) {
    displayMessage("You win!");
  } else if (dealerValue > playerValue) {
    displayMessage("Dealer wins.");
  } else {
    displayMessage("It's a tie!");
  }
});
