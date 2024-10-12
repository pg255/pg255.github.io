var settings = {
	playerSpeed: 8,
	playerMoveDistance: 1
};

cans = ["background", "background2", "player", "robot"];

var background = new layer("background");
background.images = {lvl1: "lvl1", lvl2_1: "lvl2-1", lvl3: "lvl3"};

var background2 = new layer("background2");
background2.images = {lvl2_2: "lvl2-2"};

moments.level1 = new moment();
moments.level1.start = function() {
	moments[currentMoment].spawnX = 65;
	moments[currentMoment].spawnY = 125;
	moments[currentMoment].noClip = false;
	player.x = moments[currentMoment].spawnX;
	player.y = moments[currentMoment].spawnY;
	player.mood = "happy";
	player.allowMove = true;
	player.whatTouchesLayer = "background";
	background.can.style.opacity = 1;
	background.image("lvl1", true);
	background.doRenderImage = true;
	background2.can.style.opacity = 0;
	background2.clear();
	background2.doRenderImage = false;
	robot.isText = false;
	moments.level1.render();
}
moments.level1.render = function() {
	background.renderImage();
	player.render();
	robot.render();
}

moments.level1.onkey = new defaultMoveKeys();
moments.level1.playerMove = function() {
	if (moments[currentMoment].noClip != true) {
		if (player.touching.indexOf("0,0,0") != -1) {
			player.death();
		}
		if (player.touching.indexOf("0,204,0") != -1 && player.touching.length == 1) {
			moments[currentMoment].noClip = true;
			setTimeout(function() {
				moments[currentMoment].noClip = false;
				player.allowMove = false;
				setTimeout(function() {
					startMoment("level2");
				}, 900);
			}, 100);
		}
	}
}

moments.level2 = new moment();
moments.level2.start = function() {
	moments[currentMoment].spawnX = 65;
	moments[currentMoment].spawnY = 125;
	player.x = moments[currentMoment].spawnX;
	player.y = moments[currentMoment].spawnY;
	player.mood = "happy";
	player.allowMove = true;
	player.whatTouchesLayer = "background";
	background.can.style.opacity = 1;
	background2.can.style.opacity = 0;
	background2.clear();
	robot.isText = false;

	background.image("lvl2_1", true);
	background2.doRenderImage = false;
	moments.level1.render();
}
moments.level2.render = function() {
	background.renderImage();
	background2.renderImage();
	player.render();
	robot.render();
}

moments.level2.onkey = new defaultMoveKeys();

moments.level2.playerMove = function() {
	if (moments[currentMoment].noClip != true) {
		if (player.touching.indexOf("0,0,0") != -1) {
			player.death();
		}
		if (player.touching.indexOf("0,204,0") != -1 && player.touching.length == 1) {
			moments[currentMoment].noClip = true;
			setTimeout(function() {
				moments[currentMoment].noClip = false;
				player.allowMove = false;
				setTimeout(function() {
					background2.image("lvl2_2", true);
					background2.opacityUp();
					setTimeout(function() {
						moments.level2.nextText();
					}, 500);
				}, 900)
			}, 100);
		}
	}
}

background2.opacityUp = function() {
	background2.can.style.opacity = parseFloat(background2.can.style.opacity) + 0.1;
	if (parseFloat(background2.can.style.opacity) <= 1) {
		setTimeout(background2.opacityUp, 50);
	}
}

moments.level2.onkey.d32 = function() {moments[currentMoment].playerClick()}
moments.level2.onkey.d69 = function() {moments[currentMoment].playerClick()}
moments.level2.onkey.d13 = function() {moments[currentMoment].playerClick()}

moments.level2.isOnText = false;
moments.level2.currentText = 0;

moments.level2.nextText = function() {
	switch (moments.level2.currentText) {
		case 0:
			moments.level2.isOnText = true;
			robot.showText("Oh No!\nYou are on backspace!", 350, 15, 25, "#cc0", 8, "#000", true);
			moments.level2.currentText++;
			break;
		case 1:
			robot.showText("It's deleting code!", 350, 15, 25, "#cc0", 8, "#000", true);
			video.play();
			moments.level2.currentText++;
			break;
		case 2:
			background2.clear();
			video.pause();
			background.image("lvl3", true);
			robot.showText("Move fast to undo button....", 350, 15, 25, "#cc0", 8, "#000", true);
			moments.level2.currentText++;
			break;
		case 3:
			robot.showText("or else the game gets...", 350, 15, 25, "#cc0", 8, "#000", true);
			moments.level2.currentText++;
			break;
		case 4:
			robot.showText("Out Of Control", 200, 30, 50, "#c00", 8, "#000", true);
			moments.level2.currentText++;
			break;
		case 5:
			robot.isText = false;
			robot.render();
			startMoment("level3");
			break;
	}
}

moments.level2.playerClick = function() {
	if (moments.level2.isOnText) {
		moments.level2.nextText();
	}
}

ctxForVideo = background2.ctx;
var video = document.getElementById("video");
video.addEventListener('play', function () {
    var $this = this; //cache
    (function loop() {
        if (!$this.paused && !$this.ended) {
            ctxForVideo.drawImage($this, 50, 100);
            setTimeout(loop, 1000 / 30); // drawing at 30fps
        }
    })();
}, 0);

moments.level3 = new moment();
moments.level3.start = function() {
	moments[currentMoment].spawnX = 540;
	moments[currentMoment].spawnY = 200;
	player.x = moments[currentMoment].spawnX;
	player.y = moments[currentMoment].spawnY;
	player.mood = "happy";
	player.allowMove = true;
	player.whatTouchesLayer = "background";
	background.can.style.opacity = 1;
	background2.can.style.opacity = 0;
	background2.clear();
	robot.isText = false;

	background.image("lvl3", true);
	background2.doRenderImage = false;
	moments.level1.render();
}
moments.level3.render = function() {
	background.renderImage();
	background2.renderImage();
	player.render();
	robot.render();
}
moments.level3.onkey = new defaultMoveKeys();

moments.level3.playerMove = function() {
	if (moments[currentMoment].noClip != true) {
		if (player.touching.indexOf("0,0,0") != -1) {
			player.death();
		}
		if (player.touching.indexOf("237,237,0") != -1 && player.touching.length == 1) {
			moments[currentMoment].noClip = true;
			setTimeout(function() {
				moments[currentMoment].noClip = false;
				player.allowMove = false;
				setTimeout(function() {
					
				}, 900);
			}, 100);
		}
	}
	if (200 < player.x && player.x < 420) {
		robot.showText("oops maze is broken", 350, 15, 25, "#cc0", 8, "#000", true);
	} else if (player.x < 100) {
		robot.showText("Use space key to click\n(click on undo button)", 350, 15, 25, "#cc0", 8, "#000", true);
	} else {
		robot.isText = false;
		robot.render();
	}
}

moments.level3.onkey.d32 = function() {moments[currentMoment].playerClick()}
moments.level3.onkey.d69 = function() {moments[currentMoment].playerClick()}
moments.level3.onkey.d13 = function() {moments[currentMoment].playerClick()}

moments.level3.isOnText = false;
moments.level3.currentText = 0;

moments.level3.nextText = function() {
	switch (moments.level2.currentText) {
		case 0:
			moments.level2.isOnText = true;
			robot.showText("Oh No!\nYou are on backspace!", 350, 15, 25, "#cc0", 8, "#000", true);
			moments.level2.currentText++;
			break;
		case 1:
			robot.showText("It's deleting code!", 350, 15, 25, "#cc0", 8, "#000", true);
			video.play();
			moments.level2.currentText++;
			break;
		case 2:
			background2.clear();
			video.pause();
			background.image("lvl3", true);
			robot.showText("Move fast to undo button....", 350, 15, 25, "#cc0", 8, "#000", true);
			moments.level2.currentText++;
			break;
		case 3:
			robot.showText("or else the game gets...", 350, 15, 25, "#cc0", 8, "#000", true);
			moments.level2.currentText++;
			break;
		case 4:
			robot.showText("Out Of Control", 200, 30, 50, "#c00", 8, "#000", true);
			moments.level2.currentText++;
			break;
		case 5:
			robot.isText = false;
			robot.render();
			startMoment("level1");
			break;
	}
}

moments.level3.playerClick = function() {
	if (moments.level2.isOnText) {
		moments.level2.nextText();
	}
}



function start() {
	startMoment("level3");
}

setTimeout(startRender, 1000);