let currentPlayer = 'x';

let scoreX = 0;
let scoreO = 0;

let movesX = [];
let movesO = [];

function renderPage(scoreX, scoreO) {
  document.querySelector('.activity-holder').innerHTML =
  `
    <div class="score-container">
      <div class="scores">
        <img class="score-icon score-x" src="images/x-icon.png">
        <p class="score">${scoreX} : ${scoreO}</p>
        <img class="score-icon score-o" src="images/o-icon.png">
      </div>
    </div>

    <div class="game-container">
      <div class="game-arena">
        <div id="1" class="field active-field"></div>
        <div id="2" class="field active-field"></div>
        <div id="3" class="field active-field"></div>
        <div id="4" class="field active-field"></div>
        <div id="5" class="field active-field"></div>
        <div id="6" class="field active-field"></div>
        <div id="7" class="field active-field"></div>
        <div id="8" class="field active-field"></div>
        <div id="9" class="field active-field"></div>
      </div>
    </div>
  `;

}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('new-game-button')) {
      scoreO = 0;
      scoreX = 0;
      currentPlayer = 'x';
      renderPage(scoreX, scoreO);
      document.querySelector(".score-x").classList.add('current-player');
    }
  })

function resetGame() {
  movesX = [];
  movesO = [];
  
  renderPage(scoreX, scoreO);
  if (currentPlayer == 'x') {
    document.querySelector(".score-x").classList.add('current-player');
  } else {
    document.querySelector(".score-o").classList.add('current-player');
  }
}

document.querySelector('.activity-holder').addEventListener('click', (event) => {
  
  if (event.target.classList.contains('active-field')) {
    document.getElementById(event.target.id).innerHTML= 
    `<img class="move-icon" src="images/${currentPlayer}-icon.png">`;
    event.target.classList.remove('active-field');

    if (currentPlayer == 'x') {
      movesX.push(Number(event.target.id));
      if (calculateWin(movesX)) {
        scoreX++;
        resetGame();
        finishGame();
        return;
        
      } else {
        currentPlayer = 'o';
        updateUI();
      }

    } else if (currentPlayer == 'o') {
      movesO.push(Number(event.target.id));
      if (calculateWin(movesO)) {
        scoreO++;
        resetGame();
        finishGame();
        return;

      } else {
        currentPlayer = 'x';
        updateUI();
      }
    }
  }
  tieBreak();
})


function updateUI() {
  const scoreX = document.querySelector('.score-x');
  const scoreO = document.querySelector('.score-o');

  if (currentPlayer === 'x') {
    scoreX.classList.add('current-player');
    scoreO.classList.remove('current-player');
  } else {
    scoreO.classList.add('current-player');
    scoreX.classList.remove('current-player');
  }
}

function calculateWin(moves) {
  const winPatterns = [
    [1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]
  ]
  return winPatterns.some(pattern => pattern.every(number => moves.includes(number))
  )
}

function finishGame() {
  if (scoreX === 3 || scoreO === 3) {
    document.querySelector('.activity-holder').innerHTML += 
    `<div class="result-container">
      <div class="results">
        <div>
          <img class="result-icon" src="images/${currentPlayer}-icon.png">
          Wins!
        </div>
        <button class="new-game-button">Start a new game</button>
      </div>
    </div>`;
    
  }
}

function tieBreak() {
  if ((movesO.length + movesX.length) === 9 ) {
    alert('Draw! Try Again');
    resetGame();
  }
}