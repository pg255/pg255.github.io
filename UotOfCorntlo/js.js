var settings = {
	playerSpeed: 8,
	playerMoveDistance: 1
};

cans = ["background", "background2", "player", "robot"];

audio.audioNames = ["weLostControl", "weGotControl", "underControl", "outOfControl", "beeb", "beebs", "ohNo", "death", "yay", "moving", "kick"];

var background = new layer("background");
background.images = {lvl1: "lvl1", lvl2_1: "lvl2-1", lvl3: "lvl3", lvl4: "lvl4", error1: "error1", desktop1: "desktop1", desktop2: "desktop2", desktop3: "desktop3", desktop4: "desktop4", lvl6: "lvl6"};

var background2 = new layer("background2");
background2.images = {lvl2_2: "lvl2-2", trash: "trash", logoGlitched: "logoGlitched", glitch: "glitch"};


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
	audio.playMusic("underControl");
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
				audio.play("yay");
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
	moments.level2.render();
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
			audio.play("yay");
			audio.fadeOut(20, 0.025, "outOfControl");
			moments[currentMoment].noClip = true;
			setTimeout(function() {
				moments[currentMoment].noClip = false;
				player.allowMove = false;
				setTimeout(function() {
					audio.stop("yay");
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
			player.mood = "suprised";
			player.render();
			break;
		case 1:
			robot.showText("It's deleting code!", 350, 15, 25, "#cc0", 8, "#000", true);
			video.play();
			moments.level2.currentText++;
			player.mood = "sad";
			player.render();
			audio.play("beebs");
			break;
		case 2:
			background2.clear();
			video.pause();
			background.image("lvl3", true);
			robot.showText("Move fast to undo button....", 350, 15, 25, "#cc0", 8, "#000", true);
			moments.level2.currentText++;
			audio.play("beebs");
			break;
		case 3:
			robot.showText("or else the game gets...", 350, 15, 25, "#cc0", 8, "#000", true);
			moments.level2.currentText++;
			audio.play("beebs");
			break;
		case 4:
			robot.showText("Out Of Control", 200, 30, 50, "#c00", 8, "#000", true);
			moments.level2.currentText++;
			player.mood = "suprised";
			player.render();
			audio.play("ohNo");
			break;
		case 5:
			player.mood = "happy";
			player.render();
			robot.isText = false;
			robot.render();
			startMoment("level3");
			audio.play("beeb");
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
	moments[currentMoment].spawnX = player.x;
	moments[currentMoment].spawnY = player.y;
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
	moments.level3.render();
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
	switch (moments.level3.currentText) {
		case 0:
			moments.level3.isOnText = false;
			robot.showText("Undoing", 350, 15, 25, "#cc0", 8, "#000", true);
			moments.level3.currentText++;
			setTimeout(moments.level3.nextText, 1000);
			player.allowMove = false;
			audio.play("beeb");
			break;
		case 1:
			moments.level3.isOnText = false;
			robot.showText("Undoing.", 350, 15, 25, "#cc0", 8, "#000", true);
			moments.level3.currentText++;
			setTimeout(moments.level3.nextText, 1000);
			audio.play("beeb");
			break;
		case 2:
			moments.level3.isOnText = false;
			robot.showText("Undoing..", 350, 15, 25, "#cc0", 8, "#000", true);
			moments.level3.currentText++;
			setTimeout(moments.level3.nextText, 1000);
			audio.play("beeb");
			break;
		case 3:
			moments.level3.isOnText = false;
			robot.showText("Undoing...", 350, 15, 25, "#cc0", 8, "#000", true);
			moments.level3.currentText++;
			setTimeout(moments.level3.nextText, 1000);
			audio.play("beeb");
			break;
		case 4:
			moments.level3.isOnText = true;
			robot.showText("Undo done", 350, 15, 25, "#cc0", 8, "#000", true);
			moments.level3.currentText++;
			audio.play("beebs");
			break;
		case 5:
			robot.showText("Finally you can solve puzzles\nwihtout bugs!", 350, 15, 25, "#cc0", 8, "#000", true);
			audio.fadeOut(20, 0.025, "underControl");
			moments.level3.currentText++;
			audio.play("beebs");
			break;
		case 6:
			robot.showText("So lets start!!!!!!!", 350, 15, 25, "#cc0", 8, "#000", true);
			moments.level3.currentText++;
			audio.play("beebs");
			break;
		case 7:
			robot.showText("in a moment", 350, 15, 25, "#cc0", 8, "#000", true);
			moments.level3.currentText++;
			audio.play("beebs");
			break;
		case 8:
			robot.showText("wait", 350, 15, 25, "#cc0", 8, "#000", true);
			audio.play("beebs");
			moments.level3.currentText++;
			break;
		case 9:
			robot.showText("wait.", 350, 15, 25, "#cc0", 8, "#000", true);
			moments.level3.currentText++;
			audio.play("beeb");
			break;
		case 10:
			robot.showText(".", 350, 15, 25, "#cc0", 8, "#000", true);
			moments.level3.currentText++;
			audio.play("beeb");
			break;
		case 11:
			startMoment("level4");
			audio.play("beeb");
			break;
	}
}

moments.level3.playerClick = function() {
	if (moments.level3.isOnText) {
		moments.level3.nextText();
	} else if (player.x < 95 && player.x > 5 && player.y < 290 && player.y > 200 && moments.level3.currentText == 0) {
		moments.level3.nextText();
	}
}

moments.level4 = new moment();
moments.level4.start = function() {
	moments[currentMoment].spawnX = 65;
	moments[currentMoment].spawnY = 125;
	moments[currentMoment].noClip = false;
	player.x = moments[currentMoment].spawnX;
	player.y = moments[currentMoment].spawnY;
	player.mood = "happy";
	player.allowMove = true;
	player.whatTouchesLayer = "background";
	background.can.style.opacity = 1;
	background.image("lvl4", true);
	background.doRenderImage = true;
	background2.can.style.opacity = 0;
	background2.clear();
	background2.doRenderImage = false;
	robot.isText = false;
	moments.level4.render();
	settings.playerSpeed = 12;
}
moments.level4.render = function() {
	background.renderImage();
	player.render();
	robot.render();
}

moments.level4.onkey = new defaultMoveKeys();
moments.level4.playerMove = function() {
	if (moments[currentMoment].noClip != true) {
		if (player.touching.indexOf("0,0,0") != -1) {
			player.death();
		}
	}
	if (400 < player.x) {
		player.allowMove = false;
		moments.level4.nextText();
		console.log("aa");
	}
}

moments.level4.onkey.d32 = function() {moments[currentMoment].playerClick()}
moments.level4.onkey.d69 = function() {moments[currentMoment].playerClick()}
moments.level4.onkey.d13 = function() {moments[currentMoment].playerClick()}

moments.level4.isOnText = false;
moments.level4.currentText = 0;

moments.level4.nextText = function() {
	switch (moments.level4.currentText) {
		case 0:
			moments.level4.isOnText = true;
			robot.showText("Oh No... ", 350, 15, 25, "#cc0", 8, "#000", true);
			player.mood = "suprised";
			player.render();
			moments.level4.currentText++;
			audio.fadeOut(20, 0.025, "outOfControl");
			audio.play("beebs");
			break;
		case 1:
			robot.showText("theres bug.. ", 350, 15, 25, "#cc0", 8, "#000", true);
			moments.level4.currentText++;
			player.mood = "sad";
			audio.play("beebs");
			player.render();
			break;
		case 2:
			robot.isText = false;
			robot.render();
			moments.level4.isOnText = false;
			player.allowMove = true;
			moments.level4.noclip = true;
			background.image("error1", true);
			audio.play("beeb");
	}
}

moments.level4.playerClick = function() {
	if (moments.level4.isOnText) {
		moments.level4.nextText();
	} else if (player.touching.indexOf("147,0,0") != -1) {
		startMoment("level5");
	}
}

moments.level5 = new moment();
moments.level5.start = function() {
	moments[currentMoment].spawnX = 310;
	moments[currentMoment].spawnY = 50;
	moments[currentMoment].noClip = false;
	player.x = moments[currentMoment].spawnX;
	player.y = moments[currentMoment].spawnY;
	player.mood = "happy";
	player.allowMove = true;
	player.whatTouchesLayer = "background";
	background.can.style.opacity = 1;

	background.image("desktop1", true);
	background.doRenderImage = true;
	background2.can.style.opacity = 1;
	background2.image("trash", true);
	background2.doRenderImage = true;
	robot.isText = false;
	moments.level5.render();


	settings.playerSpeed = 8;
	moments.level5.nextText();
}
moments.level5.render = function() {
	background.renderImage();
	player.render();
	robot.render();
}

moments.level5.onkey = new defaultMoveKeys();
moments.level5.playerMove = function() {
	moments.level5.onMove();
}

moments.level5.onkey.d32 = function() {moments[currentMoment].playerClick()}
moments.level5.onkey.d69 = function() {moments[currentMoment].playerClick()}
moments.level5.onkey.d13 = function() {moments[currentMoment].playerClick()}

moments.level5.playerClick = function() {
	if (moments.level5.isOnText) {
		moments.level5.nextText();
	} else {
		moments.level5.onClick();
	}
}
moments.level5.onMove = function() {};
moments.level5.onClick = function() {}

moments.level5.isOnText = false;
moments.level5.textBlock = "b1";
moments.level5.currentText = {main: 0};

moments.level5.nextText = function() {
	if (moments.level5.textBlock == "b1") {
		switch (moments.level5.currentText.main) {
			case 0:
				moments.level5.isOnText = true;
				player.allowMove = false;
				robot.showText("oh NO!", 200, 15, 25, "#cc0", 8, "#000", true);
				moments.level5.currentText.main++;
				audio.play("beebs");
				break;
			case 1:
				robot.showText("bugs got", 200, 15, 25, "#cc0", 8, "#000", true);
				moments.level5.currentText.main++;
				audio.play("beebs");
				break;
			case 2:
				robot.showText("Out Of Control", 200, 30, 50, "#c00", 8, "#000", true);
				moments.level5.currentText.main++;
				audio.play("ohNo");
				break;
			case 3:
				robot.isText = false;
				robot.render();
				moments.level5.isOnText = false;
				setTimeout(moments.level5.nextText, 1000);
				moments.level5.currentText.main++;
				audio.play("beeb");
				break;
			case 4:
				audio.fadeOut(20, 0.025, "underControl");
				moments.level5.interval = setInterval(function() {
					background2.imageY -= 1;
					background2.renderImage();
					if (background2.imageY <= -70) {
						clearInterval(moments.level5.interval);
						setTimeout(function() {
							background.image("desktop2", true);
							audio.play("kick");
						}, 250);
						setTimeout(function() {
							moments.level5.interval = setInterval(function() {
								background2.imageY += 1;
								background2.renderImage();
								if (background2.imageY >= 0) {
									clearInterval(moments.level5.interval);
									background.image("desktop3", true);
									audio.play("kick");
									setTimeout(function() {
										moments.level5.currentText.main++;
										moments.level5.nextText();
									}, 1000);
								}
							}, 10);
						}, 500);
					}
				}, 10);
				break;
			case 5:
				moments.level5.isOnText = true;
				audio.fadeOut(20, 0.025, "outOfControl");
				robot.showText("oh NO!", 200, 15, 25, "#cc0", 8, "#000", true);
				moments.level5.currentText.main++;
				audio.play("beebs");
				break;
			case 6:
				robot.showText("trash can got", 200, 15, 25, "#cc0", 8, "#000", true);
				moments.level5.currentText.main++;
				audio.play("beebs");
				break;
			case 7:
				robot.showText("OUT OF CONTRLO", 200, 30, 50, "#c00", 8, "#000", true);
				moments.level5.currentText.main++;
				audio.play("ohNo");
				break;
			case 8:
				robot.showText("(trash can ate The Game)", 200, 15, 25, "#cc0", 8, "#000", true);
				moments.level5.currentText.main++;
				audio.play("beebs");
				break;
			case 9:
				robot.showText("What are we doing now??", 200, 15, 25, "#cc0", 8, "#000", true);
				moments.level5.currentText.main++;
				audio.play("beebs");
				break;
			case 10:
				robot.showText("Lets take the game\nout from trash!", 200, 15, 25, "#cc0", 8, "#000", true);
				moments.level5.currentText.main++;
				audio.play("beebs");
				break;
			case 11:
				audio.play("beeb");
				moments.level5.isOnText = false;
				player.allowMove = true;
				robot.isText = false;
				robot.render();
				moments.level5.onClick = function() {
					if (player.x > 60 && player.x < 120 && player.y > 132 && player.y < 210) {
						moments.level5.currentText.main++;
						moments.level5.nextText();
					}
				}
				break;
			case 12:
				moments.level5.onClick = function() {};
				moments.level5.isOnText = true;
				player.allowMove = false;
				robot.showText("good!", 200, 15, 25, "#cc0", 8, "#000", true);
				audio.play("beebs");
				moments.level5.onMove = function() {
					background2.image("logoGlitched", true, player.x - 10, player.y + 30, 40, 40);
				}
				moments.level5.playerMove();
				moments.level5.currentText.main++;
				break;
			case 13:
				robot.showText("hmm\nwhy there is weird texture??", 200, 15, 25, "#cc0", 8, "#000", true);
				audio.play("beebs");
				moments.level5.currentText.main++;
				break;
			case 14:
				robot.showText("I mean thats not important (:", 200, 15, 25, "#cc0", 8, "#000", true);
				audio.play("beebs");
				moments.level5.currentText.main++;
				break;
			case 15:
				robot.showText("Put the game to it's place", 200, 15, 25, "#cc0", 8, "#000", true);
				audio.play("beebs");
				moments.level5.currentText.main++;
				break;
			case 16:
				audio.play("beeb");
				moments.level5.isOnText = false;
				player.allowMove = true;
				robot.isText = false;
				robot.render();
				moments.level5.onClick = function() {
					if (player.x > 46 && player.x < 146 && player.y > 7 && player.y < 107) {
						moments.level5.currentText.main++;
						moments.level5.nextText();
					}
				}
				break;
			case 17:
				moments.level5.onMove = function() {}
				moments.level5.onClick = function() {};
				background2.clear();
				background.image("desktop4", true);
				moments.level5.isOnText = true;
				player.allowMove = false;
				robot.showText("good!", 200, 15, 25, "#cc0", 8, "#000", true);
				audio.play("beebs");
				moments.level5.currentText.main++;
				break;
			case 18:
				robot.showText("Lets Launch it!", 200, 15, 25, "#cc0", 8, "#000", true);
				audio.play("beebs");
				moments.level5.currentText.main++;
				break;
			case 19:
				audio.play("beeb");
				moments.level5.isOnText = false;
				player.allowMove = true;
				robot.isText = false;
				robot.render();
				moments.level5.onClick = function() {
					if (player.x > 46 && player.x < 146 && player.y > 7 && player.y < 107) {
						moments.level5.currentText.main++;
						moments.level5.nextText();
					}
				}
				break;
			case 20:
				moments.level5.onClick = function() {}
				background.image("lvl6", true);
				background2.can.style.opacity = 0.1;
				moments.level5.interval = setInterval(function() {
					background2.can.style.opacity = parseFloat(background2.can.style.opacity) + 0.01;
				}, 200);
				background2.image("glitch", true);
				audio.play("beeb");
				player.x = 65;
				player.y = 125;
				player.mood = "glitched";
				player.render();
				moments[currentMoment].noClip = false;
				moments.level5.currentText.main++;
				moments.level5.nextText();
				moments.level5.onkey.d87 = function() {player.keyDown("right");}
				moments.level5.onkey.u87 = function() {player.keyUp("right");}
				moments.level5.onkey.d65 = function() {player.keyDown("up");}
				moments.level5.onkey.u65 = function() {player.keyUp("up");}
				moments.level5.onkey.d68 = function() {player.keyDown("down");}
				moments.level5.onkey.u68 = function() {player.keyUp("down");}
				moments.level5.onkey.d83 = function() {player.keyDown("left");}
				moments.level5.onkey.u83 = function() {player.keyUp("left");}

				moments.level5.onMove = function() {
					if (moments[currentMoment].noClip != true) {
						if (player.touching.indexOf("0,0,0") != -1) {
							player.allowMove = false;
							player.render();
							audio.play("death");
							setTimeout(function() {
								player.x = 65;
								player.y = 125;
								player.allowMove = true;
								player.render();
								background2.can.style.opacity = 0.1;
							}, 1000);
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
				moments.level5.onClick = function() {
					if (player.touching.indexOf("149,149,149") != -1) {
						moments.level5.currentText.main++;
						moments.level5.nextText();
					}
				}
				
				break;
			case 21:
				moments.level5.isOnText = true;
				player.allowMove = false;
				robot.showText("oh no!", 200, 15, 25, "#cc0", 8, "#000", true);
				moments.level5.currentText.main++;
				audio.play("beebs");
				break;
			case 22:
				robot.showText("This game is", 200, 15, 25, "#cc0", 8, "#000", true);
				moments.level5.currentText.main++;
				audio.play("beebs");
				break;
			case 23:
				robot.showText("EXTREMLY", 200, 15, 25, "#cc0", 8, "#000", true);
				moments.level5.currentText.main++;
				audio.play("beebs");
				break;
			case 24:
				robot.showText("UOT OF CONTRLO", 200, 30, 50, "#c00", 8, "#000", true);
				moments.level5.currentText.main++;
				audio.play("ohNo");
				break;
			case 25:
				robot.showText("go to close button\nas fast as you can!!", 200, 15, 25, "#cc0", 8, "#000", true);
				moments.level5.currentText.main++;
				audio.play("beebs");
				break;
			case 26:
				robot.isText = false;
				robot.clear();
				player.allowMove = true;
				robot.isText = false;
			case 27:
				audio.play("beeb");
				break;
		}
	}
}


function start() {
	startMoment("level1");
}

