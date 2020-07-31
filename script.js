//Initialize variables
var running = false;
var interval;
var decimal = 0;
var sec = 0;
var min = 0;
var cs = 0;
var worst = 0;
var numSolves = 0;
var total = 0;
var best = 999999999999999999;
var timesDisplay = []
var csTimes =[]
var avAll = 0;
// Grab all the HTML elements
var avAllOut = document.getElementById("overallAv");
var bestOut = document.getElementById("fastest");
var numSolvesOut = document.getElementById("solveNum");
var decimalOut = document.getElementById("decimal");
var secOut = document.getElementById("sec");
var minOut = document.getElementById("min");
var colon = document.getElementById("colon");
var timesOut = document.getElementById("timeOut");
var timesList = document.getElementById("timeList");
var clearAll = document.getElementById("clear");
//Generate scramble --> GO TO generateScramble()
generateScramble();

//THIS IS THE TIMER
function timer() {
  decimal++;
  cs++; //counts time in centiseconds
  decimalOut.innerHTML = decimal;
  if (decimal >= 100) {
    decimal = 0;
    sec++;

    if (sec > 59) {
      sec = 0;
      min++;
      colon.innerHTML = ":";
      minOut.innerHTML = min;
    }
    if (sec <= 9 && min > 0) {
      sec = "0" + sec;
    }
    secOut.innerHTML = sec;
  }

  if (decimal <= 9) {
    decimal = '0' + decimal;
    decimalOut.innerHTML = decimal;
  }

}
window.onkeyup = run; //GO TO RUN --> run()
function run() {
  if (!running) {
    decimal = 0;
    sec = 0;
    min = 0;
    cs = 0;
    secOut.innerHTML = "0";
    minOut.innerHTML = "";
    colon.innerHTML = "";
    running = true;
    scramble = "";
    generateScramble();
    interval = setInterval(timer, 10);
  } else if (running) {
    running = false;
    clearInterval(interval);
    timesDisplay.push(" " + timesOut.innerHTML);
    csTimes.push(cs);
    timesList.innerHTML = timesDisplay;
    calculateStats(); //GO TO CALCULATE STATS --> calculateStats()
  }
}

//THIS WILL GENERATE THE SCRAMBLE
function generateScramble() {
  var move; //includes face to turn and how to turn it. Ex. 2F
  var face; //Face to turn. Either R, L, F, B, U, or D
  var faceNum; //1-6, corresponds to face R-D
  var lastFaceNum = 10; //The face of the previous turn
  var turn; //How to turn a face. Either ', 2, or nothing.
  var scramble = ""; //inlucdes 25 moves
  var output = document.getElementById("scram");
  for (var x = 0; x < 25; x++) {
    do {
      faceNum = Math.floor(Math.random() * 6) + 1; //Random number between 1 and 6
    } while (faceNum === lastFaceNum); //the same face can't appear in consecutive moves.
    lastFaceNum = faceNum;
    if (faceNum === 1) {
      face = "R";
    }
    if (faceNum === 2) {
      face = "L";
    }
    if (faceNum === 3) {
      face = "U";
    }
    if (faceNum === 4) {
      face = "D";
    }
    if (faceNum === 5) {
      face = "F";
    }
    if (faceNum === 6) {
      face = "B";
    }
    turn = Math.floor(Math.random() * 3) + 1; //Generate number between 1-3
    if (turn === 1) {
      move = face;
    }
    if (turn === 2) {
      move = face + "2";
    }
    if (turn === 3) {
      move = face + "'";
    }

    scramble += move + " ";
  }
  output.innerHTML = scramble;
}
clearAll.onclick = clearTimes; //THIS WILL DO THE CLEAR ALL FUNCTION

function clearTimes() {
  // But every variable back to it's default value
  numSolves = 0;
  numSolvesOut.innerHTML = "Solves: " + numSolves;
  best = 99999999999;
  bestOut.innerHTML = "Best: ";
  worst = 0;
  avAll = 0;
  total = 0;
  avAllOut.innerHTML = "Average: ";
  timesDisplay = [];
  csTimes = [];
  timesList.innerHTML = timesDisplay;
  timesOut.innetHTML = ""
  decimalOut.innerHTML = 0;
}

//CALCULATE YOUR STATS
function calculateStats() {
  //Add one to the number of solves
  numSolves++;
  total = 0;
  numSolvesOut.innerHTML = "Solves: " + numSolves;
  for (var x = 0; x < csTimes.length; x++) {
    if (csTimes[x] < best) {
      best = csTimes[x];
    }
    if (csTimes[x] > worst) {
      worst = csTimes[x];
    }
    total += csTimes[x];
  }
  avAll = total / numSolves;
  avAllOut.innerHTML = "Average: " + formatTime(avAll); //GO TO FORMATE TIME --> formatTime()
  bestOut.innerHTML = "Best: " + formatTime(best);
}


// --> FORMTAT THE TIME

function formatTime(t) {
  //m = minute, s = second, c = centisecond
  var m = 0,
    s = 0,
    c = 0,
    out = "";
  m = Math.floor(t / 6000);
  t = t % 6000;
  s = Math.floor(t / 100);
  t = t % 100;
  c = Math.floor(t);
  if (m < 1) {
    m = "";
  } else {
    m = m + ":";
    if (s < 10) {
      s = "0" + s;
    }
  }
  if (c < 10) {
    c = "0" + c;
  }

  out = "" + m + s + "." + c;
  return out;
}