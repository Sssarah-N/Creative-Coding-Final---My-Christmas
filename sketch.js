var decorations = []; //list of decorations
var bg, arrow, window2, window3; //background and assets
var goldenBall, redBall, light, snow, star, tree, bgm, grid; //decorations images
var box1, boxWithLid, box2, candy, bear, chocolate, chocolate2, flower, hat; //gifts images
var defaultBox, wrap1, wrap2, wrap3, wrap4, ribbon1, ribbon2, ribbon3, ribbon4; //wrap images
var letter, cardBG, boxBG;
var endWords;
var snow = []; //array for snow falling effect
var bgFade = 0; //ending effect
var textFade = 0; //ending text effect
var snowFall = false;
var endCount = 0;
var wordList = ["", "", "", "", "", ""]; //rhyme poem on card
var wordNum = 0;
var name = ""; //name on card
var redSlider, greenSlider, blueSlider; //control color
var drawing = []; //store the drawings
var finishDrawing = false;
var giftType1 = 0; //wrap paper type
var giftType2 = 0; //ribbon type
var clickSound;
var gifts = []; //list of gifts
var s = 30; //size of text in phase 0
var control = 0.05; //control the speed of the text enlarge
var type = 1; //default type of decor set to type one (golden ball)
var lightOn = false; //lights of christmas tree

var phase = 0; //control phase

function preload() {
  //load images, sounds, gifs, and font
  bg = loadImage("bg.PNG");
  goldenBall = loadImage("gold ball.PNG");
  redBall = loadImage("redBall.PNG");
  snow = loadImage("snow.PNG");
  light = loadImage("light.PNG");
  star = loadImage("star.PNG");
  tree = loadImage("tree.PNG");
  myFont = loadFont("font.otf");
  bgm = loadSound("jingleBell.mp3");
  grid = loadImage("grid.png");
  arrow = loadImage("arrow.GIF");
  box1 = loadImage("box.PNG");
  boxWithLid = loadImage("boxWithLid.PNG");
  box2 = loadImage("box1.PNG");
  candy = loadImage("candy.PNG");
  bear = loadImage("bear.PNG");
  chocolate = loadImage("chocolate.PNG");
  chocolate2 = loadImage("chocolate2.png");
  flower = loadImage("flower.PNG");
  hat = loadImage("hat.PNG");
  clickSound = loadSound("click.mp3");
  defaultBox = loadImage("defaultBox.PNG");
  wrap1 = loadImage("wrap1.PNG");
  wrap2 = loadImage("wrap2.PNG");
  wrap3 = loadImage("wrap3.PNG");
  wrap4 = loadImage("wrap4.PNG");
  ribbon1 = loadImage("ribbon1.PNG");
  ribbon2 = loadImage("ribbon2.PNG");
  ribbon3 = loadImage("ribbon3.PNG");
  ribbon4 = loadImage("ribbon4.PNG");
  letter = loadImage("letter.png");
  cardBG = loadImage("cardBG.PNG");
  boxBG = loadImage("boxBG.PNG");
  window2 = loadImage("window2.png");
  window3 = loadImage("window3.gif");
}

class Decoration {
  //generate christmas tree decorations
  constructor(
    x,
    y,
    type //contains x position, y position, and type of decor
  ) {
    this.x = x;
    this.y = y;
    this.type = type;
  }
  display() { //display the decors on the tree
    push();
    imageMode(CENTER);
    if (this.type === 1) {
      image(goldenBall, this.x, this.y, 40, 40);
    } else if (this.type === 2) {
      image(redBall, this.x, this.y, 40, 40);
    } else if (this.type === 3) {
      image(snow, this.x, this.y, 40, 40);
    } else if (this.type === 4) {
      image(star, this.x, this.y, 50, 50);
    }

    pop();
  }

  displaySmall() { //display the deocrations on the main page
    push();
    imageMode(CENTER);
    if (this.type === 1) {
      image(
        goldenBall,
        map(this.x, 156, 441, 343, 550),
        map(this.y, 34, 395, 90, 351),
        25,
        25
      );
    } else if (this.type === 2) {
      image(
        redBall,
        map(this.x, 156, 441, 343, 550),
        map(this.y, 34, 395, 90, 351),
        25,
        25
      );
    } else if (this.type === 3) {
      image(
        snow,
        map(this.x, 156, 441, 343, 550),
        map(this.y, 34, 395, 90, 351),
        25,
        25
      );
    } else if (this.type === 4) {
      image(
        star,
        map(this.x, 156, 441, 343, 550),
        map(this.y, 34, 395, 90, 351),
        30,
        30
      );
    }
    pop();

    if (lightOn) {
      image(light, 230, 65, 438, 292);
    }
  }
}

class Gift {
  constructor(type) {
    this.status = false; //shows if gift is put into the box
    this.type = type; //type of the gift
  }

  display() { //display the gift outside/inside the box
    if (this.status === false) {
      if (this.type === 0) {
        image(bear, -50, 0, 300, 200);
      } else if (this.type === 1) {
        image(flower, -100, 250, 300, 200);
      } else if (this.type === 2) {
        image(candy, 150, 300, 240, 160);
      } else if (this.type === 3) {
        image(hat, 350, 250, 360, 240);
      } else if (this.type === 4) {
        image(chocolate, 350, 0, 300, 200);
      }
    } else {
      if (this.type === 0) {
        image(bear, 0, 0);
      } else if (this.type === 1) {
        image(flower, 0, 0);
      } else if (this.type === 2) {
        image(candy, 0, 0);
      } else if (this.type === 3) {
        image(hat, 0, 0);
      } else if (this.type === 4) {
        image(chocolate2, 0, 0);
      }
    }
  }
}

function setup() {
  createCanvas(600, 400);

  textFont(myFont); //use myFont
  fill(255);
  stroke("#605B55");
  strokeWeight(4);
  textSize(20);
  photoButton = createButton("Take a Photo📸")
    .size(160, 30)
    .style("font-size", "20px"); //button to take photo of canvas
  photoButton.mousePressed(takePicture);
}

function draw() {
  image(bg, 0, 0, 600, 400);
  if (bgm.isPlaying() === false) {
    //play bgm
    bgm.play();
    bgm.setVolume(0.3);
  }
  if (phase === 0) {
    //display different scenes in different phases
    textEffect(
      "Click the to-do list on the board\nto get tasks",
      width / 2,
      350
    );
    image(boxBG, 0, 0, 600, 400);
  } else if (phase === 1) {
    //before task 1
    todo();
    image(boxBG, 0, 0, 600, 400);
  } else if (phase === 2) {
    //decorate the tree
    decorateTree();
  } else if (phase === 3) {
    //before task 2
    image(window2, 0, 0, 600, 400);
    todo();
    image(boxBG, 0, 0, 600, 400);
  } else if (phase === 4) {
    //prepare gift
    wrapGifts();
  } else if (phase === 5) {
    //decorate the girft
    decorateGifts();
  } else if (phase === 6) {
    //before task 3
    image(window2, 0, 0, 600, 400);
    todo();
    image(cardBG, 0, 0, 600, 400);
  } else if (phase === 7) {
    //write the card and poem
    writeCard();
  } else if (phase === 8) {
    //draw on card
    writeCard();
    drawCard();
  } else if (phase === 9) {
    //end of task 3
    image(window3, 0, 0, 600, 400);
    for (i = 0; i < decorations.length; i++) {
      decorations[i].displaySmall();
    }
    if (endCount === 0) {
      todo();
    }
    ending1();
  } else if (phase === 10) {
    //end scene
    image(window3, 0, 0, 600, 400);
    ending2();
  }
}

function textEffect(t, x, y) {
  //speical effect for some texts
  push();
  fill(255);
  stroke("#605B55");
  textSize(20);
  textAlign(CENTER);
  strokeWeight(5);
  if (s >= 30 || s <= 27) {
    control *= -1;
  }
  s += control;
  textSize(s);
  text(t, x, y);
  pop();
}

function todo() {
  //display to-do list and
  push();
  if (phase === 1) {
    image(arrow, 430, 50, 40, 40); //guide player to click on the tree
  }
  fill(255, 255, 255, 170);
  strokeWeight(2);
  rect(30, 30, 300, 120, 20);
  pop();
  push();
  fill(255);
  stroke("#605B55");
  strokeWeight(4);
  textSize(20);
  text(
    "TO-DO LIST\n- Decorate Christmas tree\n- Prepare gifts\n- Write Christmas Card",
    40,
    60
  ); //content of todo list
  pop();
  push();
  strokeWeight(3);
  if (phase === 3) {
    //hint for next step
    line(57, 80, 310, 80);
    image(arrow, 140, 185, 40, 40);
    for (i = 0; i < decorations.length; i++) {
      decorations[i].displaySmall();
    }
  }
  if (phase === 6) {
    //hint for next step
    line(57, 80, 310, 80);
    line(57, 105, 200, 105);
    image(arrow, 150, 180, 40, 40);
    for (i = 0; i < decorations.length; i++) {
      decorations[i].displaySmall();
    }
  }
  if (phase === 9) {
    line(57, 80, 310, 80);
    line(57, 105, 200, 105);
    line(57, 130, 265, 130);
  }
  pop();
}

function decorateTree() {
  //decorate the christmas tree
  image(tree, 0, 0, 600, 400);
  image(grid, 0, 0, 600, 400);
  push();
  fill(255);
  rect(405, 353, 190, 30);
  text("Finish Decorating", 415, 375); //jump to next scene
  rect(10, 353, 210, 30);
  text("Turn On/Off Lights", 20, 375); //turn on/of the lights
  imageMode(CENTER);
  image(goldenBall, 447, 67, 80, 80);
  image(redBall, 525, 67, 80, 80);
  image(star, 525, 140, 80, 80);
  image(snow, 450, 143, 80, 80);

  pop();
  push();
  imageMode(CENTER);
  if (type === 1) {
    //current type of decor follows the mouse
    image(goldenBall, mouseX, mouseY, 40, 40);
  } else if (type === 2) {
    image(redBall, mouseX, mouseY, 40, 40);
  } else if (type === 3) {
    image(snow, mouseX, mouseY, 40, 40);
  } else if (type === 4) {
    image(star, mouseX, mouseY, 50, 50);
  }
  pop();

  for (i = 0; i < decorations.length; i++) {
    decorations[i].display();
  }
  if (lightOn === true) {
    image(light, 0, 0, 600, 400);
  }
}

function wrapGifts() {
  //place gifts into the box
  background("#EBE4D9");
  image(box1, 0, 0);
  for (i = 0; i < 5; i++) {
    gifts[i].display();
  }
  image(box2, 0, 0);
}

function decorateGifts() {
  //choose the wrap and ribbon for the gifts
  background("#EBE4D9");
  image(defaultBox, 0, 0);
  if (giftType1 === 1) {
    image(wrap1, 0, 0);
  } else if (giftType1 === 2) {
    image(wrap2, 0, 0);
  } else if (giftType1 === 3) {
    image(wrap3, 0, 0);
  } else if (giftType1 === 4) {
    image(wrap4, 0, 0);
  }

  if (giftType2 === 1) {
    image(ribbon1, 0, 0);
  } else if (giftType2 === 2) {
    image(ribbon2, 0, 0);
  } else if (giftType2 === 3) {
    image(ribbon3, 0, 0);
  } else if (giftType2 === 4) {
    image(ribbon4, 0, 0);
  }
}

function writeCard() {
  //write a rhyme poem and sign name on the card
  push();
  fill("#605B55");
  noStroke();
  textSize(15);
  image(letter, 0, 0, 600, 400);
  text("Dear Santa", 325, 90);
  text("Christmas is coming", 325, 130);
  //text("");
  text("The ", 325, 160);
  text(wordList[0], 360, 160);
  text(" is ", 400, 160);
  text(wordList[1], 425, 160);

  if (wordNum === 1) {
    wordList[2] = RiTa.rhymesSync(wordList[0])[0];
    wordList[3] = RiTa.rhymesSync(wordList[1])[0];
    wordList[4] = RiTa.rhymesSync(wordList[0])[1];
    wordList[5] = RiTa.rhymesSync(wordList[1])[1];
  }
  text("The ", 325, 190);
  if (wordList[2] != null)
    {
      text(wordList[2], 360, 190);
    }
  text(" is ", 400, 190);
  if (wordList[3] != null && wordList[3] != undefined)
    {
      text(wordList[3], 430, 190);
    }
  text("The ", 325, 220);
  if (wordList[4] != null && wordList[4] != undefined)
    {
      text(wordList[4], 360, 220);
    }
  text(" is ", 400, 220);
  if (wordList[5] != null && wordList[5] != undefined)
    {
      text(wordList[5], 430, 220);
    }
  text("Best wishes, ", 400, 270);
  text(name, 430, 290);

  push();
  strokeWeight(1);
  stroke("#605B55");
  line(360, 165, 400, 165);
  line(425, 165, 490, 165);
  line(425, 295, 490, 295);
  pop();
  
  push();
  fill("#605B55")
  if (wordNum === 0)
    {
      ellipse(380, 175, 10);
    }
  else if (wordNum === 1)
    {
      ellipse(458, 175, 10);
    }
  else
    {
      if (phase === 7)
      ellipse(458, 305, 10);
    }
  pop();
  if (phase === 7)
    {
      textEffect("type the words, hit enter to continue", width/2, 375)
    }
  
}

function keyTyped() {
  //type function
  if (phase === 7) {
    if (wordNum <= 1) {
      if (key === "Enter") {
        if (wordNum <= 1) {
          wordNum++;
        }
      } else wordList[wordNum] += key;
    } else {
      if (key === "Enter") {
        phase = 8; //create all the sliders and buttons for drawing
        sizeSlider = createSlider(0, 30, 10);
        sizeSlider.position(-50, 150);
        sizeSlider.style("transform", "rotate(-90deg)");
        redSlider = createSlider(0, 255, 100);
        redSlider.position(70, 365);
        redSlider.size(130);
        greenSlider = createSlider(0, 255, 100);
        greenSlider.position(270, 365);
        greenSlider.size(130);
        blueSlider = createSlider(0, 255, 100);
        blueSlider.position(460, 365);
        blueSlider.size(130);
        clearCanvas = createButton("Clear Canvas")
          .size(160, 30)
          .style("font-size", "20px");
        clearCanvas.mousePressed(clearCard);
        finishDrawing = createButton("Finish Drawing")
          .size(160, 30)
          .style("font-size", "20px");
        finishDrawing.mousePressed(doneDrawing);
      } else name += key;
    }
  }
}

function clearCard() {
  //clear the drawings
  drawing = [];
}

function doneDrawing() {
  //move to next step, delete sliders and buttons
  phase = 9;
  sizeSlider.remove();
  redSlider.remove();
  greenSlider.remove();
  blueSlider.remove();
  finishDrawing.remove();
  clearCanvas.remove();
}

function keyReleased() {
  //type function
  if (phase === 7) {
    if (wordNum <= 1) {
      if (keyCode === BACKSPACE) {
        wordList[wordNum] = wordList[wordNum].substring(
          0,
          wordList[wordNum].length - 1
        );
      }
    } else {
      if (keyCode === BACKSPACE) {
        name = name.substring(0, name.length - 1);
      }
    }
  }
}

function drawCard() {
  //referenced code by fffiloni
  //writeCard();
  //console.log(drawing)
  if (
    mouseIsPressed &&
    mouseX >= 88 &&
    mouseX <= 300 &&
    mouseY >= 50 &&
    mouseY <= 340
  ) {
    let point = {
      x1: pmouseX,
      y1: pmouseY,
      x2: mouseX,
      y2: mouseY,
      s: sizeSlider.value(),
      r: redSlider.value(),
      g: greenSlider.value(),
      b: blueSlider.value(),
    };
    drawing.push(point);
  }

  for (let i = 0; i < drawing.length; i++) {
    push();
    strokeWeight(drawing[i].s);
    stroke(drawing[i].r, drawing[i].g, drawing[i].b);
    line(drawing[i].x1, drawing[i].y1, drawing[i].x2, drawing[i].y2);
    pop();
  }

  text("Red", 30, 380);
  text("Green", 220, 380);
  text("Blue", 420, 380);
  text("Size", 20, 60);

  push();
  fill(redSlider.value(), greenSlider.value(), blueSlider.value()); //choose color
  ellipse(mouseX, mouseY, sizeSlider.value());
}

function ending1() {
  //after finishing all tasks
  endWords = [
    "Congratulations!",
    "You have finished all the tasks",
    "It is time to sleep now.",
  ];
  if (endCount < 3) {
    textEffect(endWords[endCount], 300, 350);
  }
}

function ending2() {
  //the end scene
  if (bgFade < 255) {
    bgFade += 2;
    fill(0, 0, 0, bgFade);
    rect(0, 0, 600, 400);
  } else if (textFade < 255) {
    rect(0, 0, 600, 400);
    textFade += 3;
    noStroke();
    textSize(50);
    push();
    fill(255, 255, 255, textFade);
    textAlign(CENTER);
    text("Merry Christmas!", width / 2, height / 2);
    pop();
  } else {
    rect(0, 0, 600, 400);
    push();
    fill(255);
    textAlign(CENTER);
    text("Merry Christmas!", width / 2, height / 2);
    pop();

    push();
    fill(255, 255, 255, 200);
    if (snowFall === false) {
      for (i = 0; i <= 50; i++) {
        let pos = {
          x: random(width),
          y: random(height),
        };
        snow[i] = pos;
      }
      snowFall = true;
    } else {
      for (i = 0; i <= 50; i++) {
        ellipse(snow[i].x, snow[i].y, 5);
      }
      for (j = 0; j <= 50; j++) {
        if (snow[j].y < height) {
          snow[j].y++;
        } else snow[j].y = 0;
      }
    }
    pop();
  }
}

function mousePressed() {
  clickSound.play();
  if (phase === 0) {
    //click on todo list
    if (mouseX >= 347 && mouseX <= 395 && mouseY >= 95 && mouseY <= 155) {
      phase = 1;
    }
  } else if (phase === 1) {
    //click on christmas tree
    if (
      (mouseX >= 360 && mouseX <= 540 && mouseY >= 230 && mouseY <= 320) ||
      (mouseX >= 384 && mouseX <= 510 && mouseY >= 90 && mouseY <= 230)
    ) {
      phase = 2;
      undoButton = createButton("undo").size(60, 30).style("font-size", "20px");
      undoButton.mousePressed(undo);
    }
  } else if (phase === 2) {
    //tree decoration
    if (mouseX >= 414 && mouseX <= 485 && mouseY >= 27 && mouseY <= 105) {
      type = 1; //golden ball
    } else if (
      mouseX >= 485 &&
      mouseX <= 565 &&
      mouseY >= 27 &&
      mouseY <= 105
    ) {
      type = 2; //red ball
    } else if (
      mouseX >= 414 &&
      mouseX <= 485 &&
      mouseY >= 105 &&
      mouseY <= 180
    ) {
      type = 3; //snow
    } else if (
      mouseX >= 485 &&
      mouseX <= 565 &&
      mouseY >= 105 &&
      mouseY <= 180
    ) {
      type = 4; //star
    } else if (
      (mouseX >= 150 && mouseX <= 445 && mouseY >= 217 && mouseY <= 355) ||
      (mouseX >= 200 && mouseX <= 405 && mouseY >= 30 && mouseY <= 217)
    ) {
      decorations.push(new Decoration(mouseX, mouseY, type));
      //place decor
    } else if (
      mouseX >= 10 &&
      mouseX <= 220 &&
      mouseY >= 353 &&
      mouseY <= 383
    ) {
      lightOn = !lightOn; //turn on lights
    } else if (
      mouseX >= 405 &&
      mouseX <= 595 &&
      mouseY >= 353 &&
      mouseY <= 383
    ) {
      phase = 3; //exit scene
      undoButton.remove();
    }
  } else if (phase === 3) {
    if (mouseX >= 130 && mouseX <= 188 && mouseY >= 225 && mouseY <= 260) {
      phase = 4;
      for (i = 0; i < 5; i++) {
        gifts.push(new Gift(i));
      }
      clearButton = createButton("clear")
        .size(60, 30)
        .style("font-size", "20px");
      clearButton.mousePressed(clearGifts);
      doneButton = createButton("done").size(60, 30).style("font-size", "20px");
      doneButton.mousePressed(closeLid);
    }
  } else if (phase === 4) {
    if (mouseX >= 8 && mouseX <= 130 && mouseY >= 15 && mouseY <= 145) {
      gifts[0].status = true;
    } else if (
      mouseX >= 68 &&
      mouseX <= 125 &&
      mouseY >= 280 &&
      mouseY <= 380
    ) {
      gifts[1].status = true;
    } else if (
      mouseX >= 225 &&
      mouseX <= 305 &&
      mouseY >= 358 &&
      mouseY <= 390
    ) {
      gifts[2].status = true;
    } else if (
      mouseX >= 490 &&
      mouseX <= 565 &&
      mouseY >= 298 &&
      mouseY <= 383
    ) {
      gifts[3].status = true;
    } else if (
      mouseX >= 463 &&
      mouseX <= 580 &&
      mouseY >= 81 &&
      mouseY <= 178
    ) {
      gifts[4].status = true;
    }
  } else if (phase === 5) {
    if (mouseX >= 37 && mouseX <= 93 && mouseY >= 32 && mouseY <= 87) {
      giftType1 = 1;
    } else if (mouseX >= 37 && mouseX <= 93 && mouseY >= 125 && mouseY <= 182) {
      giftType1 = 2;
    } else if (mouseX >= 37 && mouseX <= 93 && mouseY >= 222 && mouseY <= 278) {
      giftType1 = 3;
    } else if (mouseX >= 37 && mouseX <= 93 && mouseY >= 317 && mouseY <= 370) {
      giftType1 = 4;
    } else if (mouseX >= 478 && mouseX <= 600 && mouseY >= 32 && mouseY <= 87) {
      giftType2 = 1;
    } else if (
      mouseX >= 478 &&
      mouseX <= 600 &&
      mouseY >= 125 &&
      mouseY <= 182
    ) {
      giftType2 = 2;
    } else if (
      mouseX >= 478 &&
      mouseX <= 600 &&
      mouseY >= 222 &&
      mouseY <= 278
    ) {
      giftType2 = 3;
    } else if (
      mouseX >= 478 &&
      mouseX <= 600 &&
      mouseY >= 317 &&
      mouseY <= 370
    ) {
      giftType2 = 4;
    }
  } else if (phase === 6) {
    if (mouseX >= 125 && mouseX <= 210 && mouseY >= 220 && mouseY <= 260) {
      phase = 7;
    }
  } else if (phase === 9) {
    if (endCount < 2) {
      endCount++;
    } else phase = 10;
  } else if (phase === 10) {
  }
}

function takePicture() {
  saveCanvas("MyChristmasPicture.jpg");
}

function undo() {
  decorations.splice(decorations.length - 1, 1);
}

function clearGifts() {
  gifts = [];
  for (i = 0; i < 5; i++) {
    gifts.push(new Gift(i));
  }
}

function closeLid() {
  phase = 5;
  clearButton.remove();
  doneButton.remove();
  finishGiftButton = createButton("done")
    .size(60, 30)
    .style("font-size", "20px");
  finishGiftButton.mousePressed(finishDecorateGift);
}

function finishDecorateGift() {
  phase = 6;
  finishGiftButton.remove();
}

//font: https://www.cufonfonts.com/seulgii/collection/game-fonts#google_vignette
//bgm: https://www.chosic.com/download-audio/29759/
//click sound: https://orangefreesounds.com/clicking-sound-effect/
//drawing pad reference: https://editor.p5js.org/fffiloni/sketches/Mv2chZiwD
//all images were drawn by me