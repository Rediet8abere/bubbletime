clicked() {
  // var count = 0;
  for (var column = 0; column < this.x; column ++) {
    for (var row = 0; row < this.y; row++) {
      // print(column  * this.r + 1, row  * this.r + 1, this.r - 1, this.r - 1);
      if (mouseX < (column  * this.r + 1) + this.r && mouseY < (row  * this.r + 1) + this.r) {
        this.cells[column][row].clickedCell();
        // print("Column and Row wh");
        // print("column + row", column + width);
        // print("row + height", row + height);
        // print("mouseX and mouseY");
        print(mouseX);
        print(mouseY);
        print("rect")
        // print("this.x * this.r + 1", (this.x * this.r + 1) + this.r);
        // var neighbor = this.getNeighbors(this.cells[column][row]);
        // var aliveCount = 0;
        // for(var i = 0 ; i < neighbor.length ; i++ ) {
        //   if(neighbor[i].isAlive) {
        //    aliveCount = this.cells[column][row].liveNeighborCount++;
        //   }
      }

      }
    }
  }



  clicked() {
    // var count = 0;
    for (var column = 0; column < this.x; column ++) {
      for (var row = 0; row < this.y; row++) {
        // print(column  * this.r + 1, row  * this.r + 1, this.r - 1, this.r - 1);
        print(mouseX);
        print(mouseY);
        if (mouseX < (column  * this.r + 1) + this.r && mouseX > (column  * this.r + 1)  && mouseY < (row  * this.r + 1) + this.r && mouseY > (row  * this.r + 1)) {
          this.cells[column][row].clickedCell();
          print((column  * this.r + 1) + this.r);
          print((column  * this.r + 1));
          print((row  * this.r + 1) + this.r);
          print((row  * this.r + 1));

        }

        }
      }
    }
