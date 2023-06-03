let dealerSum = 0;
let yourSum = 0;

let dealerAceCount = 0;
let yourAceCount = 0; 

let hidden;
let deck;

let canHit = true; 

window.onload = () => {
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck() {
    const values = "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K";
    const types = "C", "D", "H", "S";
    deck = ;

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(valuesj + "-" + typesi);
        }
    }
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        const j = Math.floor(Math.random()  deck.length); // (0-1)  52 => (0-51.9999)
        const temp = decki;
        decki = deckj;
        deckj = temp;
    }
    console.log(deck);
}

function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    while (dealerSum < 17) {
        const cardImg = document.createElement("img");
        const card = deck.pop();
        cardImg.src = ./cards/${card}.png;
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    console.log(dealerSum);

    for (let i = 0; i < 2; i++) {
        const cardImg = document.createElement("img");
        const card = deck.pop();
        cardImg.src = ./cards/${card}.png;
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }

    console.log(yourSum);
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
  
}

function hit() {
    if (!canHit) {
        return;
    }

    const cardImg = document.createElement("img");
    const card = deck.pop();
    cardImg.src = ./cards/${card}.png;
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);

    if (reduceAce(yourSum, yourAceCount) > 21) { //A, J, 8 -> 1 + 10 + 8
        canHit = false;
    }

}

function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    document.getElementById("hidden").src = ./cards/${hidden}.png;

    let message = "";
    if (yourSum > 21) {
        message = "Вы проиграли!";
    }
    else if (dealerSum > 21) {
        message = "Вы победили!";
    }

    else if (yourSum == dealerSum) {
        message = "Ничья!";
    }
    else if (yourSum > dealerSum) {
        message = "Вы победили!";
    }
    else if (yourSum < dealerSum) {
        message = "Вы проиграли!";
    }

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("results").innerText = message;
}
function getValue(card) {
    const data = card.split("-"); // "4-C" -> "4", "C"
    const value = data0;

    if (isNaN(value)) { 
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card0 == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}