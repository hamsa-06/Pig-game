'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const winner0El=document.querySelector('.winner--0');
const winner1El=document.querySelector('.winner--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  winner0El.innerHTML='';
  winner1El.innerHTML='';
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  btnHold.style.backgroundColor='#333';
  btnHold.style.color='#ddd';
  btnNew.style.backgroundColor='#333';
  btnNew.style.color='#ddd';
  btnRoll.style.backgroundColor='#333';
  btnRoll.style.color='#ddd';
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 10) {
      playing = false;
      diceEl.classList.add('hidden');
      if(activePlayer==0){
        winner0El.innerHTML="WINNER 🏆";
        winner1El.innerHTML="";
        winner0El.style.color='#ddd'
      }
      else{
        winner1El.innerHTML="WINNER 🏆";
        winner0El.innerHTML="";
        winner1El.style.color='#ddd'
      }
      btnHold.style.backgroundColor='#ddd';
      btnHold.style.color='#333';
      btnNew.style.backgroundColor='#ddd';
      btnNew.style.color='#333';
      btnRoll.style.backgroundColor='#ddd';
      btnRoll.style.color='#333';
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
