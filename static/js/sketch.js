function setup() {
  var button;
  var myCanvas = createCanvas(1500, 820);
  background(0);
  button = createButton('Lets Go!');
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
  // img = createImg('http://www.google.com/intl/en_com/images/logo_plain.png', 'bubbletimepink')
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

// Get the modal
// var modal = document.getElementById("myModal");

// Get the button that opens the modal
// var btn;

// window.onload = function () {
//   var btn = document.getElementById("myBtn");
    // var e = document.getElementById("db_info");
    // e.innerHTML='Found you';
// };

// Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }


// img = createImg('../img/bubbletimepink.jpg', 'bubbletimepink')
// img.position(700, 70);
