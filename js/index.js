var tempo, moves, currentMove, btnEnabled,timeout;
var win = 20;
var dur = 500;
var strictMode = false;
var level = document.getElementById('level');
var btns = document.getElementsByClassName('button');

function updateSequence() {
  switch (moves.length) {
    case 5:
      tempo = 0.8;
      updateTimeout();
      break;
    case 9:
      tempo = 0.6;
      updateTimeout();
      break;
    case 13:
      tempo = 0.4;
      updateTimeout();
      break;
  }
  btnEnabled = false;

  moves.push(Math.floor(Math.random() * 4));
  updateLevel(moves.length);

  displaySequence();
  btnEnabled = true;
}

function displaySequence() {
  btnEnabled = false;
  var i = 0;
  function displayLoop() {
    setTimeout(function() {
      var selector = '[data-number="' + moves[i] + '"]';
      var element = document.querySelector(selector);
      activateButton(element, moves[i]);
      i++;
      if (i < moves.length) {
        setTimeout(function() {
          displayLoop();
        }, timeout);
      } else {
        btnEnabled = true;
      }
    }, timeout);
  }
  displayLoop();
}

function activateButton(element, move) {
  element.classList.add('flash');
  var sound;
  switch (move){
    case 0:
      sound = 'sound-1';
      break;
    case 1:
      sound = 'sound-2';
      break;
    case 2:
      sound = 'sound-3';
      break;
    case 3:
      sound = 'sound-4';
      break;
  }
  document.getElementById(sound).play();
  setTimeout(function() {
    element.classList.remove('flash');
  }, timeout);
}

function pressButton() {
  if (btnEnabled) {
    var btnNum = parseInt(this.getAttribute('data-number'));
    if (btnNum === moves[currentMove]) {
      activateButton(this, btnNum);
      currentMove++;
      if (currentMove >= win) {
        winGame();
      } else {
        if (currentMove === moves.length) {
          clearTimeout();
          currentMove = 0;
          setTimeout(function() {
            updateSequence();
          }, timeout);
        }
      }
    } else {
      btnEnabled = false;
      alert('Oops! Try again');
      if (strictMode) {
        resetGame();
        updateSequence();
      } else {
        currentMove = 0;
        displaySequence();
      }
    }
  }
}

function updateTimeout() {
  timeout = dur * tempo;
}

function resetGame() {
 moves = []; 
  currentMove = 0;
  tempo = 1;
  updateTimeout();
  btnEnabled = false;
  updateLevel('--');
}

function winGame() {
  btnEnabled = false;
  alert('Woohoo!! YOU WON!')
  resetGame();
}

function updateLevel(moves) {
    level.innerHTML = moves;
}

document.getElementById('start').addEventListener('click', function(e) {
  resetGame();
  updateSequence();
});

document.getElementById('reset').addEventListener('click', function(e) {
  resetGame();
});

document.getElementById('strict').addEventListener('click', function(e) {
  resetGame();
  if (!strictMode) {
    strictMode = true;
    this.innerHTML = 'Normal';
  } else {
    strictMode = false;
    this.innerHTML = 'Strict';
  }
});

for (var j = 0; j < btns.length; j++) {
  btns[j].addEventListener('click', pressButton, false);
}

resetGame();