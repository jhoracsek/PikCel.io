
var socket = io();
var tempx = 0;
var tempy = 0;
var playerColor = null;

var initialized = false;

var playerColours = new Array(4);
var playerList = [];
var ogNames = [];
var ogColours = [];

var playerNames = [];

var playerNum = -1;
var myTurn = false;
var whoseTurn = -1;
var numPlaced = 0;
var numAllowedToPlace = -1;
var numLeft = -1;

var myName = "";

var shadowOffset = 5;

var splash = true;

let bgMod = 1024;

const msgWin = document.getElementById('cww');

var roomID = '-1-1-1-1-1';




var pbs = new PlayerBadges(0,0);

var board = new Array(16);
for (let i = 0; i < 16; i++){
    board[i] = new Array(16);
}
for(let i = 0; i < 16; i++){
    for(let j = 0; j < 16; j++){
        board[i][j] = '0x111111';
    }
}


function checkAdj(x,y){
    //Need to check if it's one of the two default colours first.
    if(board[x][y] == '0xEFEFEF' || board[x][y] == '0xFFFFFF'){
        //Now we can draw, if we are adjacent to one of the playerColor tiles
        if(x > 0 && board[x-1][y] == playerColor)
            return true;
        if(x < 15 && board[x+1][y] == playerColor)
            return true;
        if(y > 0 && board[x][y-1] == playerColor)
            return true;
        if(y < 15 && board[x][y+1] == playerColor)
            return true;
    }
    return false;
}




var pixStore = new Array(16);
for (let i = 0; i < 16; i++){
    pixStore[i] = new Array(16);
}
for(let i = 0; i < 16; i++){
    for(let j = 0; j < 16; j++){
        const pixel = new Pixel(0,0,0,0,0);
        pixStore[i][j] = pixel;
    }
}





let container = document.querySelector("body");
var bgX = 0;
var bgY = 0;
var gameScene = null;



var menuScene = null;
var frame = 0;


var config = {
    //type: Phaser.AUTO,
    type: Phaser.WEBGL,
    width: 1200,
    height: 800,
    parent: 'game-container',
    backgroundColor: '#562D6E',
    transparent: true,
    resolution: window.devicePixelRatio,
    scale: Phaser.Scale.Center,
    pixelArt: true,
    antialias: false,
    scene: [Menu, Game]
};

var game = new Phaser.Game(config);