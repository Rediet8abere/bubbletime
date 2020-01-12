function setup() {
  var button;
  var myCanvas = createCanvas(1500, 820);
  background(0);
  button = createButton('click me');
  // put button in same container as the canvas
  button.parent('canvbtn');
  // by default this sets position relative to window...
  button.position(260, 270);
  button.mousePressed(grid_page);
  button.style('background-color', '#9CE37D');
  // button.style('border-radius', '2px');
  // button.style('border', '2px solid #99C24D');

  // myCanvas.parent('sketch01');
  for (var i = 0; i < 500; i++) {
    bubbles[i] = new Bubble()
    bubbles.push(bubbles[i]);
  }
  // img = createImg('../img/bubbletimepink.jpg', 'bubbletimepink')
  // img.position(700, 70);
}

function draw() {
  background('#CBA135');
  bubbleman.display(200, 100);

  for( var i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
  }
}

function grid_page() {
  window.location.href = "/grid";
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


// img = createImg('../img/bubbletimepink.jpg', 'bubbletimepink')
// img.position(700, 70);
