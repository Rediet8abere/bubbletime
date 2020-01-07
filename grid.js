
var buttonCheck;
var buttonEqn;
var grid;
var numValue = '0';
var strStored = '';
var operation;
var answer;
var result = 0;
var equation;
let inp;
let m;
var prompt;
// num of grid 40, 25, 100
// ask user for grid size
function setup () {
  canvas = createCanvas(400, 400);
  canvas.position(500, 150);
  grid = new Grid(40);
  inp = createInput('');
  inp.position(950, 300);
  inp.input(myInputEvent);
  buttonCheck = createButton('check');
  buttonCheck.position(1060, 300);
  buttonCheck.mousePressed(checkRes);
  buttonEqn = createButton('Equation');
  buttonEqn.position(1060, 50);
  buttonEqn.mousePressed(eqn);
}


function draw () {
  background(250);
  // numDisplay = createInput(numValue);
  // numDisplay.position(20, 450);
  grid.draw();

}
class Grid {
  constructor (r, p) {
    // update the contructor to take cellSize as a parameter
    // use cellSize to calculate and assign values for numberOfColumns and numberOfRows
    // this.p = p;
    this.r = r;
    this.x = height / r;
    this.y = width / r;
    this.cells = new Array(this.x);
    this.stored = [];
    this.register = [];
    this.randnum;
    this.oper = ['+', '-', '*'];
    // this.result = 0;
    for(var i = 0; i<this.cells.length; i++) {
      this.cells[i] = new Array(this.y);
    }

    //go into each position in the 2D array and create a new `Cell`.
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
    numValue = strStored;
    let regexp = '[-0-10+*0-10]';
    m = match(numValue, regexp);
    console.log("m is: ", m);
    console.log(numValue);
    if(m != null) {
      equation = createP(numValue);
      equation.position(1060, 250);
    }
    strStored = '';
  }

  operate(operation) {
    console.log("operation************************", operation);
    console.log("operation == '+'", operation == '+');
    console.log("operation == '*'", operation == '*');
    console.log("operation == '-'", operation == '-');
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
        console.log("result of substraction>>>>>>>>>>>>>>>>>", result);
        if (i == 0 && this.value != 0) {
          result *= -1;
        }
      }

      console.log("result of addition>>>>>>>>>>>>>>>>>>>>", result);
    }
    // result = 0;
    // console.log("operate()", this.oper[this.randnum]);
    if (operation == '+') {
      for (var i = 0; i < this.stored.length; i++) {
        // console.log("adding++++++++++++");
        result += this.stored[i];
        console.log("result of addition>>>>>>>>>>>>>>>>>>>>", result);
      }
    } else if (operation == '*') {
      for (var i = 0; i < this.stored.length; i++) {
        // console.log("multiplying *****************");
        if (i == 0) {
          result = 1;
        }
        result *= this.stored[i];
        console.log("result of multiplicaton>>>>>>>>>>>>>>>>>>>", result);
      }
    } else if (operation == '-') {
      for (var i = 0; i < this.stored.length; i++) {
        // console.log("subtraction ---------------");
        result -= this.stored[i];
        console.log("result of substraction>>>>>>>>>>>>>>>>>", result);
        if (i == 0 && this.value != 0) {
          result *= -1;
        }
      }
    } else {
      console.log("Hello World........");
    }
    // console.log("in operate");
    // console.log("in operate result******************", result);
    // console.log("in operate answer", answer);
    grid.showRes(result, answer);
   }

   showRes(result, answer) {
     console.log("in showRes");
     console.log("in showRes result******************", result);
     console.log("in showRes answer", answer);
     if (answer == undefined) {
       prompt = createDiv('Please input answer');
     }  else {
       if (result == answer) {
         for (var i = 0; i < this.register.length; i++) {
           this.register[i].col = color(255);
           console.log(result);
           // console.log("answer is correct");
         }
       } else if (result != answer) {
         console.log(result);
         // console.log("answer is Incorrect");
         for (var i = 0; i < this.register.length; i++) {
           this.register[i].col = color(0);
         }
       }
       this.register = [];
       this.stored = [];
       answer;
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
    this.reset = false;

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
    this.x = this.x + random(-0.005, 0.005);
    this.y = this.y + random(-0.005, 0.005);
  }
}

function mousePressed() {
  grid.clicked();
}

function checkRes() {
  // console.log("checking...");
  console.log("operation in checkRes", operation);
  grid.operate(operation);
  // console.log("equation in checkRes", equation);
  console.log("result in checkRes", result);
  console.log("answer in checkRes", answer);
  if (equation != undefined && answer != undefined) {
    equation.remove();
  }

  // prompt.remove();
  // showUser = createDiv('correct');;
  // showUser.position(1060, 250);
  // myInputEvent.remove();
  // console.log("grid.register", grid.register);
}
function eqn() {
    grid.showEqn();
    grid.stored = [];
    grid.register = [];
}

function myInputEvent() {
  answer = this.value();
  // console.log("clearing");

}
