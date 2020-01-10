
var buttonCheck;
var buttonEqn;
var buttonReset;
var grid;
var play;
var strStored = '';
var operation;
var answer;
var result = 0;
var score = 0;
var winColCount = 0;
var loseColCount = 0;
var equation;
let inp;
let m;
var timer;
var count;
var showScore;
var playing = false;
var timeout;


function setup () {
  canvas = createCanvas(400, 400);
  canvas.position(500, 150);
  grid = new Grid(50);
  play = new Play();
  inp = createInput('');
  inp.position(950, 300);
  inp.input(myInputEvent);
  buttonCheck = createButton('check');
  buttonCheck.position(1118, 300);
  buttonCheck.mousePressed(play.checkRes);
  buttonCheck.style('background-color', '#EA3546');


  buttonEqn = createButton('Equation');
  buttonEqn.position(980, 140);
  buttonEqn.mousePressed(play.eqn);
  buttonEqn.style('background-color', '#EA3546');
  buttonEqn.style('padding', '14px 40px');
  buttonEqn.style('border-radius', '12px');

  start = createButton('start');
  start.position(1060, 500);
  start.mousePressed(play.startPlaying);
  start.style('background-color', '#F4ACB7');
  start.style('border-radius', '50%');
  start.style('padding', '32px 16px');
  start.style('font-size', '24px');

  grid.reset();
}


function draw () {
  background('#87F5FB');
  grid.draw();

}

class Grid {
  constructor (r) {
    this.r = r;
    this.x = height / r;
    this.y = width / r;
    this.cells = new Array(this.x);
    this.stored = [];
    this.register = [];
    this.randnum;
    this.oper = ['+', '-', '*'];
    for(var i = 0; i<this.cells.length; i++) {
      this.cells[i] = new Array(this.y);
    }

    for (var column = 0; column < this.x; column ++) {
       for (var row = 0; row < this.y; row++) {
         this.cells[column][row] = new Cell(column, row, r);
       }
    }
  }

  draw() {
    for (var column = 0; column < this.x; column ++) {
      for (var row = 0; row < this.y; row++) {
       this.cells[column][row].draw();
       this.cells[column][row].move();
      }
    }
  }

  clicked() {
    this.randnum = floor(random(0, this.oper.length));
    for (var column = 0; column < this.x; column ++) {
      for (var row = 0; row < this.y; row++) {
        if (mouseX < (column  * this.r + 1) + this.r && mouseX > (column  * this.r + 1)  && mouseY < (row  * this.r + 1) + this.r && mouseY > (row  * this.r + 1)) {
          if (playing = true) {
            this.cells[column][row].clickedCell();
          }

          this.stored.push(this.cells[column][row].num);
          this.register.push(this.cells[column][row]);
          operation = this.oper[this.randnum];
        }
      }
    }
  }

  showEqn() {
    for (var i = 0; i <= this.stored.length-1; i++ ) {
      strStored += str(this.stored[i]);
      strStored += operation;
    }
    if (strStored[strStored.length-1] == operation) {
      strStored = strStored.substring(0, strStored.length - 1);
    }
    let regexp = '[-0-10+*0-10]';
    m = match(strStored, regexp);
    if(m != null) {
      play.removingVal(equation);
      equation = createP(strStored);
      equation.position(1060, 250);
    }
    strStored = '';
  }

  operate(operation) {
    for (var i = 0; i < this.stored.length; i++) {
      if (i == 0) {
        result = 0;
      }
      if (operation == '+') {
          result += this.stored[i];
      } else if (operation == '*') {
        if (i == 0) {
          result = 1;
        }
        result *= this.stored[i];
      } else if (operation == '-') {
        result -= this.stored[i];
        if (i == 0 && this.value != 0) {
          result *= -1;
        }
      }
    }
    grid.showRes(result, answer);
    this.register = [];
    this.stored = [];
    strStored = '';
   }

   showRes(result, answer) {
     if (answer == undefined) {
       prompt = createP('Please input answer');
     }  else {
       if (result == answer) {
         score += 1;
         play.removingVal(showScore);
         text(score, 10, 50);

         text('Font Size 16', 10, 90);
         showScore = createP(score);
         for (var i = 0; i < this.register.length; i++) {
           this.register[i].col = color(50, 55, 100);
         }
       } else if (result != answer) {
         for (var i = 0; i < this.register.length; i++) {
           this.register[i].col = color(0);
         }
       }
     }
     inp.value(' ');
   }

  reset() {
    for (var column = 0; column < this.x; column ++) {
      for (var row = 0; row < this.y; row++) {
       // console.log("In grid reset");
       this.cells[column][row].clicked = false;
       this.cells[column][row].col = color('#F86624');
       // this.cells[column][row].draw();
       // this.cells[column][row].move();
      }
    }
  }

  checkCol() {
    for (var column = 0; column < this.x; column ++) {
      for (var row = 0; row < this.y; row++) {
        if (this.cells[column][row].col == color(50, 55, 100)) {
          colCount += 1;
        } else if (this.cells[column][row].col == color(0)) {
          loseColCount +=1;
        }
       this.cells[column][row].clicked = false;
       this.cells[column][row].draw();
       this.cells[column][row].move();
      }
    }
  }
}

class Cell{
  constructor (x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.col = color('#F86624');
    this.num = floor(random(1, 10));
    this.clicked = false;
  }

  draw() {
    fill(this.col);
    noStroke();
    ellipse(this.x * this.r + 20, this.y * this.r + 20, this.r - 1, this.r - 1);
    if (this.clicked == true) {
      // changes the color and shows random num when clicked.
      fill('rgb(0,255,0)');
      textSize(20);
      text(this.num, this.x * this.r + 10, this.y * this.r + 18);
    }
  }

  clickedCell() {
    this.col = color(155, 15, 100);
    this.clicked = true;
  }

  move() {
    this.x = this.x + random(-0.005, 0.005);
    this.y = this.y + random(-0.005, 0.005);
  }
}

class Play {
   checkRes() {
    if (playing == true) {
      grid.operate(operation);
    }
  }

   eqn() {
    grid.showEqn();
  }

   startPlaying() {
    score = 0;
    console.log("In start");
    playing = true;
    play.setTimer();
    play.removingVal(timeout);
  }

   resetGrid() {
    console.log("IN RESET");
    grid.reset();
    play.removingVal(equation);
    play.removingVal(timeout);
  }

   setTimer() {
    var countDownDate = new Date().getTime() + 15000;
    var x = setInterval(function() {
      var now = new Date().getTime();
      var distance = countDownDate - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      var count = hours +':'+ minutes +':'+ seconds;
      // console.log("count.......", count);
      if (hours >= 0 && minutes >= 0 && seconds >= 0) {
        play.removingVal(timer);
        timer = createP(count);
      }
      if (hours == 0 && minutes == 0 && (seconds == 0 | seconds == 1)) {
        play.resetGrid();
        playing = false;
        play.winOrlose();
        timeout = createP("TIME OUT Click on Start to play again");
        timeout.position(550, 100);
      }
    }, 1000);
  }

  removingVal(value) {
    if (value != undefined) {
      value.remove();
    }
  }

  winOrlose() {
    grid.checkCol();
    console.log(winColCount);
    console.log(loseColCount);
  }
}

function myInputEvent() {
 answer = this.value();
}

function mousePressed() {
  console.log("playing", playing);
  if (playing == true) {
    grid.clicked();
  }
}
