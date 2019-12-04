let particles = [];
let count = false;
let img;
let countScale = 1;
let scaleKoef = 0.01;
let countScaleMin = 0.9;
let countScaleMax = 1.1;

function setup() {
  createCanvas(320,200);
  img = loadImage("/img/images/heart.png");
  smooth(8)
}

function draw() {
  translate(width/2, height/2-12)
  background(255,102,102);
  countScale += scaleKoef

  let title = new Title();

  touchEnded = () =>
    count = false


  touchStarted = () => {
    count = true
    console.log(count)
    scaleKoef = 0.01;
  }

  if (count == true){
    if (!(frameCount % 8)) {
          let p = new Particle();
          particles.push(p);
    }
  }

  for(let i = particles.length - 1; i >= 0; i--){
    particles[i].show();
    particles[i].update();
    if (particles[i].finished()){
      particles.splice(i, 1);
    }
  }



  if (count == true) {
    push()
    scale(countScale)
    if (countScale < countScaleMin) {
      scaleKoef *= -1
    } else if (countScale > countScaleMax) {
      scaleKoef *= -1
    }
    let h = new Heart();
    h.show(img)
    pop()
  } else {
    push()
    scale(countScale)
    if (countScale < 1) {
      scaleKoef = abs(scaleKoef)
    } else if (countScale > 1) {
      scaleKoef = -(abs(scaleKoef))
    } else if (countScale == 1){
      scaleKoef = 0
    }
    let h = new Heart();
    h.show(img)
    pop()
  }

}

// Static heart
class Heart {
  constructor() {
    this.width = 96;
    this.height = 82;
    this.count = true;
  }
  show(img) {
    image(img,-this.width/2,-this.height/2,this.width,this.height);
  }
}

class Title {
  constructor() {
    this.fontSize = 24;
    this.x = -98;
    this.y = 76;
    this.width = 200;
    this.height = 100;
  }

  show(value) {
    push()
      fill(255,255,255,255/3)
      textSize(this.fontSize)
      textStyle(NORMAL)
      textFont("SF Pro Display")
      textAlign(CENTER)
      text(value, this.x, this.y, this.width, this.height)
    pop()
  }

}

// Flying hearts
class Particle {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.alpha = 100;
    this.vx = random(-2, 2);
    this.vy = random(-8, -2);
    this.scale = 1.2;
    this.rotation = 0;
    this.vrotation = random(-0.005, 0.005)
  }
  finished() {
    return this.alpha < 0;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 1.5;
    this.scale -= 0.005;
    this.rotation += this.vrotation;
  }
  show() {
    noStroke();
    push()
    scale(this.scale);
    rotate(this.rotation);
    image(img,this.x - 36,this.y -33,72,66);
    pop()
  }
}
