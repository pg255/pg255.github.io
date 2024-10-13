var robot = new layer("robot");
robot.showText = function(text, y, fontSize, lineHeight, color, strokeWidth, strokeColor, delPrev) {
	robot.isText = true;
	robot.text = text;
	robot.y = y;
	robot.fontSize = fontSize;
	robot.lineHeight = lineHeight;
	robot.color = color;
	robot.strokeWidth = strokeWidth;
	robot.strokeColor = strokeColor;
	robot.delPrev = delPrev;
	robot.render();
}
robot.render = function() {
	if (robot.isText) {
		let lines = robot.text.split("\n");
		let ctx = robot.ctx;
		if (robot.delPrev) {ctx.clearRect(0, 0, layerWidth, layerHeight);}
		ctx.font = robot.fontSize + "px PressStart2P";
		ctx.strokeStyle = robot.strokeColor;
		ctx.lineWidth = robot.strokeWidth;
		ctx.fillStyle = robot.color;
		ctx.textAlign = "center";
		for (i in lines) {
			ctx.strokeText(lines[i], layerWidth / 2, robot.y + (i * robot.lineHeight));
			ctx.fillText(lines[i], layerWidth / 2, robot.y + (i * robot.lineHeight));
		}
	} else {
		this.clear();
	}
}