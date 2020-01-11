
var bubbleman = {
  x : 300,
  speed : 3,

  bounce : function() {
    if(this.x > width) {
      this.speed = -this.speed;
    } else if (this.x < 0) {
      this.speed = -this.speed;
    }
  },

   move : function() {
       this.x = this.x + this.speed;
   },

   display : function(y, r) {
     stroke(255);
     strokeWeight(10);
     // chest
     fill('#9CE37D');
     rect(this.x-55, y+50, r, r, 20);
     // face
     fill(255, 204, 0);
     ellipse(this. x, y, r, r);
     // eye
     // right eye
     ellipse(this.x-5, y-5, r-90, r-90);
     // left eye
     ellipse(this.x+30, y-5, r-90, r-90);

     noStroke();
     fill('#222222');
     // right eyeball
     ellipse(this.x-5, y-4, r-92, r-92);
     // left eyeball
     ellipse(this.x+30, y-4, r-92, r-92);

     // smile
     arc(this.x, y+20, r-70, r-70, 0, PI, CHORD);

   }
}
