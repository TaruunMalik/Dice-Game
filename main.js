"use strict";
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
// let playing = true;

const currentScore0 = document.getElementById("current--0");
const currentScore1 = document.getElementById("current--1");
// let currentScore = 0;
// let activePlayer = 0;
// const scores = [0, 0];
const diceEl = document.querySelector(".dice");

let scores, playing, currentScore, activePlayer;

const newGame = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  diceEl.classList.add("hidden");
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
newGame();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add("hidden");

btnRoll.addEventListener("click", function () {
  if (playing) {
    // Gnerating a random Number:
    const randomNumber = Math.trunc(Math.random() * 6) + 1;

    if (randomNumber !== 1) {
      currentScore = currentScore + randomNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }

    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${randomNumber}.png`;
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //   switchPlayer();

    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", newGame);
