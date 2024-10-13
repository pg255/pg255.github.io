var player = new layer("player");
player.images = {happy: "cursorHappy", sad: "cursorSad", mad: "cursorMad", suprised: "cursorSuprised"};
player.moving = 0;
player.up = false;
player.down = false;
player.left = false;
player.right = false;
player.move = function() {
	if (player.allowMove) {
		if (player.up && player.left && player.x > 1 && player.y > 1) {
			player.x -= settings.playerMoveDistance;
			player.y -= settings.playerMoveDistance;
		} else if (player.down && player.left && player.x > 1 && player.y < layerHeight - 5) {
			player.x -= settings.playerMoveDistance;
			player.y += settings.playerMoveDistance;
		} else if (player.down && player.right && player.y < layerHeight - 5 && player.x < layerWidth - 5) {
			player.x += settings.playerMoveDistance;
			player.y += settings.playerMoveDistance;
		} else if (player.up && player.right && player.y > 1 && player.x < layerWidth - 5) {
			player.x += settings.playerMoveDistance;
			player.y -= settings.playerMoveDistance;
		} else if (player.left && player.x > 1) {
			player.x -= settings.playerMoveDistance;
		} else if (player.down && player.y < layerHeight - 5) {
			player.y += settings.playerMoveDistance;
		} else if (player.right && player.x < layerWidth - 5) {
			player.x += settings.playerMoveDistance;
		} else if (player.up && player.y > 1) {
			player.y -= settings.playerMoveDistance;
		}
		player.render();
		player.whatTouches();
		moments[currentMoment].playerMove();
	}
}

player.keyDown = function(way) {
	if (player.moving == 0) {
		player.interval = setInterval(player.move, settings.playerSpeed);
	}
	if (!player[way]) {
		player[way] = true;
		player.moving++;
	} 
}
player.keyUp = function(way) {
	if (player.moving == 1) {
		clearInterval(player.interval);
	}
	if (player[way]) {
		player[way] = false;
		player.moving--;
	}
}
player.whitePixels = [0, 1, 2, 20, 22, 23, 24, 40, 44, 45, 46, 60, 61, 66, 67, 68, 81, 88, 89, 90, 101, 110, 111, 112, 121, 122, 132, 133, 134, 142, 154, 155, 156, 162, 176, 177, 178, 182, 183, 198, 199, 203, 219, 223, 238, 239, 243, 244, 258, 264, 278, 284, 297, 298, 304, 305, 316, 317, 325, 337, 345, 346, 352, 353, 354, 355, 358, 366, 369, 370, 371, 372, 376, 379, 386, 387, 388, 389, 397, 398, 399];
player.touching = [];
player.whatTouches = function() {
	let imgData = window[player.whatTouchesLayer].can.getContext("2d", {willReadFrequently: true}).getImageData(player.x, player.y, 20, 20);
	player.touching = [];
	for (i in player.whitePixels) {
		let colorString = imgData.data[player.whitePixels[i] * 4] + "," + imgData.data[player.whitePixels[i] * 4 + 1] + "," + imgData.data[player.whitePixels[i] * 4 + 2];
		if (player.touching.indexOf(colorString) == -1) {
			player.touching.push(colorString);
		}
	}
}
player.render = function() {
	player.image(player.mood, true, player.x, player.y, 20, 20);
}

player.death = function() {
	player.mood = "sad";
	player.allowMove = false;
	player.render();
	setTimeout(function() {
		player.x = moments[currentMoment].spawnX;
		player.y = moments[currentMoment].spawnY;
		player.allowMove = true;
		player.mood = "happy";
		player.render();
	}, 1000);
}


class defaultMoveKeys {
	d87() {player.keyDown("up");}
	u87() {player.keyUp("up");}
	d65() {player.keyDown("left");}
	u65() {player.keyUp("left");}
	d68() {player.keyDown("right");}
	u68() {player.keyUp("right");}
	d83() {player.keyDown("down");}
	u83() {player.keyUp("down");}
}