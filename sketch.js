class Block {
  constructor(x, y, w,letter) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.letter = letter;
    this.top = {
      x: this.x,
      y: this.y - this.w / 2,
    };
    this.bottom = {
      x: this.x,
      y: this.y + this.w / 2,
    };
    this.left = {
      x: this.x - this.w / 2,
      y: this.y,
    };
    this.right = {
      x: this.x + this.w / 2,
      y: this.y,
    };
  }
  show() {
    rect(this.x, this.y, this.w, this.w);
    textAlign(CENTER);
    text(this.letter, this.x,this.y);
    // ellipse(this.top.x,this.top.y,3,3);
    // ellipse(this.bottom.x,this.bottom.y,3,3);
    // ellipse(this.left.x,this.left.y,3,3);
    // ellipse(this.right.x,this.right.y,3,3);
  }
  update() {
    this.top = {
      x: this.x,
      y: this.y - this.w / 2,
    };
    this.bottom = {
      x: this.x,
      y: this.y + this.w / 2,
    };
    this.left = {
      x: this.x - this.w / 2,
      y: this.y,
    };
    this.right = {
      x: this.x + this.w / 2,
      y: this.y,
    };
  }
}

// let letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","R","S","T","U","V","W","Y","X","Z"]

let letters = [
["E","E","I","O"],["E","E","I","O"],["A","A","I","O"],["A","A","E","U","U"],["N","S","L","C","N"],["N","S","L","C"],["N","S","L","C","D","P"],["S","L","D","P","M","H"],["M","H","G","B","F","Y"],["G","B","F","Y","W","K"],["V","M","N","C","D","R"],["M","C","R","T"],]
let dice = [];
let closest = -1;
let checked = false;
let closestNode = {
  i: 0,
  side: "",
  distance: 1000,
};
function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
  for (let i = 0; i < 12; i++) {
    dice.push(new Block(random(20, 380), random(20, 380), 40, letters[i][Math.floor(Math.random() * letters[i].length)]));
  }
}

function draw() {
  background(220);
  for (let i = 0; i < dice.length; i++) {
    dice[i].show();
    dice[i].update();
  }
  if (mouseIsPressed) {
    let shortest = 1000;
    for (let i = 0; i < dice.length; i++) {
      if (
        dist(mouseX, mouseY, dice[i].x, dice[i].y) < shortest &&
        !checked &&
        dist(mouseX, mouseY, dice[i].x, dice[i].y) < 30
      ) {
        shortest = dist(mouseX, mouseY, dice[i].x, dice[i].y);
        closest = i;
      }
    }
    checked = true;
    if (closest != -1) {
      dice[closest].x = mouseX;
      dice[closest].y = mouseY;
    }
  } else {
    checked = false;
    if (closest != -1) {
      for (let i = 0; i < dice.length; i++) {
        if (
          dist(dice[closest].x, dice[closest].y, dice[i].x, dice[i].y) <
            closestNode.distance &&
          i != closest &&
          dist(dice[closest].x, dice[closest].y, dice[i].x, dice[i].y) < 60
        ) {
          closestNode.distance = dist(
            dice[closest].x,
            dice[closest].y,
            dice[i].x,
            dice[i].y
          );

          closestNode.i = i;
        }
      }
    }
    if (closestNode.i != -1 && closest != -1) {
      let topDis = dist(
        dice[closestNode.i].top.x,
        dice[closestNode.i].top.y,
        dice[closest].x,
        dice[closest].y
      );
      let botDis = dist(
        dice[closestNode.i].bottom.x,
        dice[closestNode.i].bottom.y,
        dice[closest].x,
        dice[closest].y
      );
      let leftDis = dist(
        dice[closestNode.i].left.x,
        dice[closestNode.i].left.y,
        dice[closest].x,
        dice[closest].y
      );
      let rightDis = dist(
        dice[closestNode.i].right.x,
        dice[closestNode.i].right.y,
        dice[closest].x,
        dice[closest].y
      );
      if (
        topDis < botDis &&
        topDis < leftDis &&
        topDis < rightDis
      ) {
        dice[closest].x = dice[closestNode.i].top.x;
        dice[closest].y = dice[closestNode.i].top.y - 20;
      }else if (
        botDis < topDis &&
        botDis < leftDis &&
        botDis < rightDis
      ) {
        dice[closest].x = dice[closestNode.i].top.x;
        dice[closest].y = dice[closestNode.i].top.y + 60;
      }else if (
        leftDis < botDis &&
        leftDis < topDis &&
        leftDis < rightDis
      ) {
        dice[closest].x = dice[closestNode.i].top.x - 40;
        dice[closest].y = dice[closestNode.i].top.y + 20;
      }else if (
        rightDis < botDis &&
        rightDis < leftDis &&
        rightDis < topDis
      ) {
        dice[closest].x = dice[closestNode.i].top.x + 40;
        dice[closest].y = dice[closestNode.i].top.y + 20;
      }
    }
    closest = -1;
    closestNode.i = -1;
    closestNode.distance = 1000;
  }
}
