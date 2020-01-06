
// 7.6
function Bubble(x, y) {
  this.x = x;
  this.y = y;

  this.show = function() {
    stroke(255);
    fill(255, 150);
    ellipse(this.x, this.y, 70, 70);
  }

  this.move = function() {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);
  }
}
