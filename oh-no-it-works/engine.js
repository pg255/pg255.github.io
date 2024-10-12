var layerWidth = 640; var layerHeight = 400;

var layerFormat;

var canvasX;
var canvasY;
var canvasW;
var canvasH;
var cans = [];

var started = false;

function startRender() {
	layerFormat = layerWidth / layerHeight;
	started = true;
	resize();
	start();
}
function resizeFunction() {
	if (started) {resize();}
	console.log("resizeFunction called");
}

function resize() {
	let screenWidth = window.innerWidth;
	let screenHeight = window.innerHeight;
	let screenFormat = screenWidth / screenHeight;
	if (screenFormat < layerFormat) {
		canvasW = screenWidth;
		canvasH = screenWidth / layerFormat;
		canvasY = (screenHeight - canvasH) / 2;
		canvasX = 0;
	} else {
		canvasH = screenHeight;
		canvasW = screenHeight * layerFormat;
		canvasX = (screenWidth - canvasW) / 2;
		canvasY = 0;
	}
	for (i in cans) {
		document.getElementById(cans[i]).width = layerWidth;
		document.getElementById(cans[i]).height = layerHeight;
		document.getElementById(cans[i]).style.width = canvasW + 'px';
		document.getElementById(cans[i]).style.height = canvasH + 'px';
		document.getElementById(cans[i]).style.left = canvasX + 'px';
		document.getElementById(cans[i]).style.top = canvasY + 'px';
	}
	console.log("Resized cans");
	if (currentMoment !== undefined) {
		moments[currentMoment].render();
	}
}

class layer {
	constructor(id) {
		this.id = id;
	}
	doRenderImage = true;
	tasks = {};
	images = {};
	image(id, delPrev, x, y, w, h) {
		this.doRenderImage = true;
		x = (x === undefined) ? 0 : x;
		y = (y === undefined) ? 0 : y;
		w = (w === undefined) ? layerWidth : w;
		h = (h === undefined) ? layerHeight : h;
		this.imageX = x;
		this.imageY = y;
		this.imageW = w;
		this.imageH = h;
		this.imageDelPrev = delPrev;
		this.currentImage = id;
		this.renderImage();
		
	}
	renderImage() {
		if (this.doRenderImage) {
			let ctx = this.ctx;
			if (this.imageDelPrev) {ctx.clearRect(0, 0, layerWidth, layerHeight);}
			ctx.drawImage(document.getElementById("i-" + this.images[this.currentImage]), this.imageX, this.imageY, this.imageW, this.imageH);
		} else {
			this.clear();
		}
	}
	clear() {
		let ctx = this.ctx;
		ctx.clearRect(0, 0, layerWidth, layerHeight);
	}
	get can() {
		return document.getElementById(this.id);
	}
	get ctx() {
		return document.getElementById(this.id).getContext('2d');
	}
}

class moment {
	start() {}
	render() {}
	playerMove() {}
	playerClick() {}

	onkey = {};
}

var moments = {};
var currentMoment;
function startMoment(id) {
	currentMoment = id;
	moments[id].start();
}


document.addEventListener('keydown', function(event) {
	if (moments[currentMoment].onkey["d" + event.keyCode] !== undefined) {
		moments[currentMoment].onkey["d" + event.keyCode]();
	}
	//console.log(event.keyCode);
});
document.addEventListener('keyup', function(event) {
	if (moments[currentMoment].onkey["u" + event.keyCode] !== undefined) {
		moments[currentMoment].onkey["u" + event.keyCode]();
	}
});