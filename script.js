var canvas = document.getElementById('tetrisField');
var ctx = canvas.getContext('2d');
var canvasNext = document.getElementById('nextShape');
var ctxNext = canvasNext.getContext('2d');
var shapeType = 0;
var shapeOrientation = 0;
document.onkeydown = pressKey;
var message = document.querySelector('.message');
var statusGame = undefined;
var timerID = undefined;
var shape = [];
var shapePosX = 60;
var shapePosY = -20;
var fillField = [];
var i = { blocks : [[[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0],[10,0]],
                    [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0],[0,10]],
                    [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0],[-10,0]],
                    [[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,-10]]] };

var j = { blocks : [[[0,1,0,0],[0,1,0,0],[1,1,0,0],[0,0,0,0],[20,10]],
                    [[1,0,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0],[10,20]],
                    [[0,1,1,0],[0,1,0,0],[0,1,0,0],[0,0,0,0],[0,10]],
                    [[0,0,0,0],[1,1,1,0],[0,0,1,0],[0,0,0,0],[10,0]]] };

var l = { blocks : [[[0,1,0,0],[0,1,0,0],[0,1,1,0],[0,0,0,0],[0,10]],
                    [[0,0,0,0],[1,1,1,0],[1,0,0,0],[0,0,0,0],[10,0]],
                    [[1,1,0,0],[0,1,0,0],[0,1,0,0],[0,0,0,0],[20,10]],
                    [[0,0,1,0],[1,1,1,0],[0,0,0,0],[0,0,0,0],[10,20]]] };

var o = { blocks : [[[1,1,0,0],[1,1,0,0],[0,0,0,0],[0,0,0,0],[20,20]],
                    [[1,1,0,0],[1,1,0,0],[0,0,0,0],[0,0,0,0],[20,20]],
                    [[1,1,0,0],[1,1,0,0],[0,0,0,0],[0,0,0,0],[20,20]],
                    [[1,1,0,0],[1,1,0,0],[0,0,0,0],[0,0,0,0],[20,20]]] };

var s = { blocks : [[[0,0,0,0],[0,1,1,0],[1,1,0,0],[0,0,0,0],[10,0]],
                    [[1,0,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0],[20,10]],
                    [[0,1,1,0],[1,1,0,0],[0,0,0,0],[0,0,0,0],[10,20]],
                    [[0,1,0,0],[0,1,1,0],[0,0,1,0],[0,0,0,0],[0,10]]] };

var t = { blocks : [[[0,0,0,0],[1,1,1,0],[0,1,0,0],[0,0,0,0],[10,0]],
                    [[0,1,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0],[20,10]],
                    [[0,1,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0],[10,20]],
                    [[0,1,0,0],[0,1,1,0],[0,1,0,0],[0,0,0,0],[0,10]]] };

var z = { blocks : [[[0,0,0,0],[1,1,0,0],[0,1,1,0],[0,0,0,0],[10,0]],
                    [[0,1,0,0],[1,1,0,0],[1,0,0,0],[0,0,0,0],[20,10]],
                    [[1,1,0,0],[0,1,1,0],[0,0,0,0],[0,0,0,0],[10,20]],
                    [[0,0,1,0],[0,1,1,0],[0,1,0,0],[0,0,0,0],[0,10]]] };



function drawNextShape() {
  var listShape = [i, j, l, o, s, t, z];
  shapeType = Math.floor(Math.random() * 7);
  shapeOrientation = Math.floor(Math.random() * 4);
  var shapeNext = listShape[shapeType].blocks[shapeOrientation];
  ctxNext.clearRect(0, 0, 80, 80);
  for (var y = 0; y < 4; y++) {
    for (var x = 0; x < 4; x++) {
      if (shapeNext[y][x]) {
        ctxNext.fillStyle = 'green';
        ctxNext.fillRect(x*20+shapeNext[4][0], y*20+shapeNext[4][1], 20, 20);
      }
    }
  }
}

function start() {timerID = setInterval(gameLoop, 200);}

function gameLoop() {
  shapePosY += 20;
  ifShapeEnd();
  ifGameOver();
  drawFrame();
}

function ifShapeEnd() {
  var tempShape = [];
  var switchKey = false;
  for (var y = 0; y < 4; y++) {
    for (var x = 0; x < 4; x++) {
      if (shape[y][x]) {
        tempShape.push([x*20+shapePosX, y*20+shapePosY]);
        if (fillField.some(function(elem) {return elem[0] === x*20+shapePosX && elem[1] === y*20+shapePosY}) || y*20+shapePosY > 380) {
          switchKey = true;
        }}}}
  if (switchKey===true) {
    for (var n = 0; n < 4; n++) {
      tempShape[n][1] = tempShape[n][1] - 20;
    }
    fillField = fillField.concat(tempShape);
    shapePosX = 60;
    shapePosY = 0;
    var listShape = [i, j, l, o, s, t, z];
    shape = listShape[shapeType].blocks[shapeOrientation];
    drawNextShape();
  }
}

function ifGameOver() {
  if (shapePosX === 60 && shapePosY === 0) {
    loop:
    for (var y = 0; y < 4; y++) {
      for (var x = 0; x < 4; x++) {
        if (shape[y][x]) {
          if (fillField.some(function(elem) {return elem[0] === x*20+shapePosX && elem[1] === y*20+shapePosY})) {
            $('.message').empty();
            $('.message').prepend('GAME OVER.<br>For start game press "Space".');
            message.style.display = "";
            clearTimeout(timerID);
            statusGame = undefined;
            fillField = [];
            break loop;
          }
  }}}}
}

function drawFrame() {
  ctx.clearRect(0, 0, 200, 400);
  if (statusGame === undefined) {
    return
  }
  for (var y = 0; y < 4; y++) {
    for (var x = 0; x < 4; x++) {
      if (shape[y][x]) {
        ctx.fillStyle = 'green';
        ctx.fillRect(x*20+shapePosX, y*20+shapePosY, 20, 20);
      }}}
  console.log(fillField);
  for (var i = 0; i < fillField.length; i++) {
    ctx.fillRect(fillField[i][0], fillField[i][1], 20, 20);
  }
}

function pressKey(e) {
  if (e.keyCode == 32 && statusGame == undefined) {
    message.style.display = "none";
    statusGame = 'inGame';
    var listShape = [i, j, l, o, s, t, z];
    shapeType = Math.floor(Math.random() * 7);
    shapeOrientation = Math.floor(Math.random() * 4);
    shape = listShape[shapeType].blocks[shapeOrientation];
    drawNextShape();
    start();
  }
}
