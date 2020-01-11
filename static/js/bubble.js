let bubbles = [];
// var intersecting = true;

function Bubble() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.r = 15;


  this.move = function() {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);
  }

  this.show = function() {
    stroke('#E8EEF2');
    strokeWeight(4);
    noFill();
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  // this.intersect = function(other) {
  //   d = dist(this.x, this.y, other.x, other.y);
  //   if (d < r) {
  //     intersecting = true;
  //   } else {
  //     intersecting = false;
  //   }
  // }
}

// function mouseDragged() {
//    let bubble = new Bubble(mouseX, mouseY, random(10, 50));
//    bubbles.push(bubble);
// }


function setup() {
  var button;
  var myCanvas = createCanvas(1500, 820);
  background(0);
  for (var i = 0; i < 500; i++) {
    bubbles[i] = new Bubble()
    bubbles.push(bubbles[i]);
  }
}

function draw() {
  background('#CBA135');
  bubbleman.display(200, 100);

  for( var i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
