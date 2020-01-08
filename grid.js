
var buttonCheck;
var buttonEqn;
var grid;
var strStored = '';
var operation;
var answer;
var result = 0;
var equation;
let inp;
let m;
var timer;
var count;


function setup () {
  canvas = createCanvas(400, 400);
  canvas.position(500, 150);
  grid = new Grid(50);
  inp = createInput('');
  inp.position(950, 300);
  inp.input(myInputEvent);
  buttonCheck = createButton('check');
  buttonCheck.position(1060, 300);
  buttonCheck.mousePressed(checkRes);
  buttonEqn = createButton('Equation');
  buttonEqn.position(1060, 50);
  buttonEqn.mousePressed(eqn);
  // myTimer();
}


function draw () {
  background(250);
  grid.draw();
}
class Grid {
  constructor (r, p) {
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

  draw () {
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
          this.cells[column][row].clickedCell();
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
      if (equation != undefined) {
        equation.remove();
      }
      equation = createP(strStored);
      equation.position(1060, 250);
    }
    strStored = '';
  }

  operate(operation) {
    for (var i = 0; i < this.stored.length; i++) {
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
    console.log("result, answer", result, answer);
    grid.showRes(result, answer);
    this.register = [];
    this.stored = [];
    strStored = '';
   }

   showRes(result, answer) {
     if (answer == undefined) {
       console.log(prompt);
       prompt = createDiv('Please input answer');
     }  else {
       if (result == answer) {
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
}

class Cell{
  constructor (x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.col = color(55, 1, 200);
    this.num = floor(random(1, 10));
    this.clicked = false;
  }

  draw() {
    fill(this.col);
    noStroke();
    ellipse(this.x * this.r + 20, this.y * this.r + 20, this.r - 1, this.r - 1);

    if (this.clicked) {
      fill('rgb(0,255,0)');
      text(this.num, this.x * this.r + 10, this.y * this.r + 18);

    }
  }

  clickedCell() {
    this.col = color(155, 15, 100);
    this.clicked = true;
  }

  move() {
    this.x = this.x + random(-0.001, 0.001);
    this.y = this.y + random(-0.001, 0.001);
  }
}

function mousePressed() {
  grid.clicked();
}

function checkRes() {
  grid.operate(operation);
}

function eqn() {
    grid.showEqn();

}

function myInputEvent() {
  answer = this.value();
}

// var myVar = setInterval(myTimer, 1000);

// function myTimer() {
//   var countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();
//   var d = new Date().getTime();
//   var distance = countDownDate - d;
//   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   var seconds = Math.floor((distance % (1000 * 60)) / 1000);
//   days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
//   // setting_time = d.toLocaleTimeString();
//   if (timer != undefined) {
//     timer.remove();
//   }
//   timer = createP(distance);
//   if (distance < 0) {
//     clearInterval(x);
//     document.getElementById("demo").innerHTML = "EXPIRED";
//     }
//   }, 1000);
//   console.log("In timer");
//   console.log(d);
// }

// Set the date we're counting down to
var countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();
console.log("countDownDate", countDownDate);

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
  console.log("now", now);

  // Find the distance between now and the count down date
  var distance = countDownDate - now;
  console.log("distance", distance);

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  var count = hours +':'+ minutes +':'+ seconds
    if (timer != undefined) {
      timer.remove();
    }
    timer = createP(count);
  // Display the result in the element with id="demo"
  // document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  // + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  // if (distance < 0) {
  //   clearInterval(x);
  //   document.getElementById("demo").innerHTML = "EXPIRED";
  // }
}, 1000);
