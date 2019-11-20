// Create the canvas

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 505;
canvas.height = 480;
document.body.appendChild(canvas);

// //背景图像
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// 英雄形象
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/x.png";

var heroImagex1 = new Image();
heroImagex1.src = "images/x1.png";
var heroImagex2 = new Image();
heroImagex2.src = "images/x2.png";
var heroImagex3 = new Image();
heroImagex3.src = "images/x3.png";
var heroImagex4 = new Image();
heroImagex4.src = "images/x4.png";
var bodyBgx = [];
bodyBgx[1] = heroImagex1;
bodyBgx[2] = heroImagex2;
bodyBgx[3] = heroImagex3;
bodyBgx[4] = heroImagex4;

var heroImagez1 = new Image();
heroImagez1.src = "images/z1.png";
var heroImagez2 = new Image();
heroImagez2.src = "images/z2.png";
var heroImagez3 = new Image();
heroImagez3.src = "images/z3.png";
var heroImagez4 = new Image();
heroImagez4.src = "images/z4.png";
var bodyBgz = [];
bodyBgz[1] = heroImagez1;
bodyBgz[2] = heroImagez2;
bodyBgz[3] = heroImagez3;
bodyBgz[4] = heroImagez4;

var heroImages1 = new Image();
heroImages1.src = "images/s1.png";
var heroImages2 = new Image();
heroImages2.src = "images/s2.png";
var heroImages3 = new Image();
heroImages3.src = "images/s3.png";
var heroImages4 = new Image();
heroImages4.src = "images/s4.png";
var bodyBgs = [];
bodyBgs[1] = heroImages1;
bodyBgs[2] = heroImages2;
bodyBgs[3] = heroImages3;
bodyBgs[4] = heroImages4;


var heroImagey1 = new Image();
heroImagey1.src = "images/y1.png";
var heroImagey2 = new Image();
heroImagey2.src = "images/y2.png";
var heroImagey3 = new Image();
heroImagey3.src = "images/y3.png";
var heroImagey4 = new Image();
heroImagey4.src = "images/y4.png";
var bodyBgy = [];
bodyBgy[1] = heroImagey1;
bodyBgy[2] = heroImagey2;
bodyBgy[3] = heroImagey3;
bodyBgy[4] = heroImagey4;

// 怪物形象
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/pkq1.png";


var monsterReady1 = false;
var monsterImage1 = new Image();
monsterImage1.onload = function () {
	monsterReady1 = true;
};
monsterImage1.src = "images/dhl.png";


// 游戏对象
var hero = {
	speed: 300 // movement in pixels per second
};
var monster = {};
var monstersCaught = 0;

var monster1 = {};
var monstersCaught = 0;

// 手柄键盘控件
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// 当玩家抓到怪物时重置游戏
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
	// 把怪物随便扔到屏幕上
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));

	monster1.x = 32 + (Math.random() * (canvas.width - 60));
	monster1.y = 32 + (Math.random() * (canvas.height - 60));
};

// 更新游戏对象
var update = function (modifier) {

	if (38 in keysDown && hero.y > 20) { // Player holding up
		aa = Math.ceil(Math.random() * 4)
		hero.y -= hero.speed * modifier;
		heroImage = bodyBgs[aa];
	}

	if (40 in keysDown && hero.y < 380) { // Player holding down
		aa = Math.ceil(Math.random() * 4)
		hero.y += hero.speed * modifier;
		heroImage = bodyBgx[aa];


	}
	if (37 in keysDown && hero.x > 20) { // Player holding left
		aa = Math.ceil(Math.random() * 4)
		hero.x -= hero.speed * modifier;
		heroImage = bodyBgz[aa];
	}
	if (39 in keysDown && hero.x < 450) { // Player holding right
		aa = Math.ceil(Math.random() * 4)
		hero.x += hero.speed * modifier;
		heroImage = bodyBgy[aa];
	}

	// 他们在碰吗？
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}

	if (
		hero.x <= (monster1.x + 32)
		&& monster1.x <= (hero.x + 32)
		&& hero.y <= (monster1.y + 32)
		&& monster1.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}
};

// 画出所有的东西
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	if (monsterReady1) {
		ctx.drawImage(monsterImage1, monster1.x, monster1.y);
	}

	// 分数
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("分数: " + monstersCaught * 10, 32, 32);
	ctx.fillText("关卡: " + parseInt(monstersCaught/10), 32, 60);
	ctx.fillText("每100分进入下一关 "+ "", 200, 32);
};


// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
