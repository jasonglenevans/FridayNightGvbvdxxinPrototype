class GRenderer {
	constructor (canvas,disableimageSmoothing) {
		if (canvas) {
			this.ctx = canvas.getContext("2d");
			this.canvas = canvas;
			if (disableimageSmoothing) {
				this.imageSmoothingEnabled = false;
			} else {
				this.imageSmoothingEnabled = true;
			}
			this.scaleX = 1;
			this.scaleY = 1;
			this.gameScreenWidth = 600;
			this.gameScreenHeight = 360;
			this.blackScreen = false;
		} else {
			throw Error("No canvas was specified, please use validly: new GRenderer(canvasElement)");
		}
	}
	drawSprites (sprList) {
		this.ctx.fillStyle = "white";
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.ctx.imageSmoothingEnabled = this.imageSmoothingEnabled;
		var i = 0;
		for (var sprite of sprList) {
			this.ctx.save();
			try{
				this.ctx.translate((sprite.x+this.gameScreenWidth/2)*this.scaleX,(sprite.y+this.gameScreenHeight/2)*this.scaleY);
				var offsetx = 0;
				var offsety = 0;
				if (sprite.centerImage) {
					offsetx += sprite.width/-2;
					offsety += sprite.height/-2;  
				}
				var offscreen = false;
				//console.log(i);
				//console.log(offscreen);
				this.ctx.globalAlpha = sprite.trs;
				this.ctx.rotate((sprite.direction-90)*Math.PI/180);
				if (sprite.flipH) {
					this.ctx.scale(-1,1);
				} else {
					this.ctx.scale(1,1);
				}
				if (!(offscreen)) {
					if (sprite.imageLocation) {
						//spritesheet support!!!
						var imageLocation = sprite.imageLocation;
						this.ctx.drawImage(sprite.image,imageLocation.x,imageLocation.y,imageLocation.width,imageLocation.height,offsetx*this.scaleX*sprite.scale,offsety*this.scaleY*sprite.scale,sprite.width*this.scaleX*sprite.scale,sprite.height*this.scaleY*sprite.scale);
					} else {
						this.ctx.drawImage(sprite.image,offsetx*this.scaleX*sprite.scale,offsety*this.scaleY*sprite.scale,sprite.width*this.scaleX*sprite.scale,sprite.height*this.scaleY*sprite.scale);
					}
				}
			}catch(e){}
			i+=1;
			this.ctx.restore();
		}
		if (this.blackScreen) {
			this.ctx.fillStyle = "black";
			this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}
	createImage (src,name) {
		return new Promise((resolve,reject) => {
			var image = document.createElement("img");
			image.name = "no_name";
			if (name) {
				image.name = name;
			}
			//console.log(`[GRenderer]: Loading Image ${src}`);
			image.onload = function () {
				//console.log(`[GRenderer]: Loaded Image ${src}`);
				resolve(image);
			};
			image.onerror = function () {
				//console.log(`[GRenderer]: Failed To Load Image ${src}`);
				reject();
			};
			image.src = src;
		});
	}
}
class Sprite {
	constructor (x,y,image,width,height) {
		this.x = 0;
		this.y = 0;
		this.image = document.createElement("img");
		this.image.name = "no_name";
		this.imageLocation = null;
		this.centerImage = true;
		this.width = 32;
		this.height = 32;
		this.direction = 90;
		this.trs = 1;
		this.scale = 1;
		this.flipH = false;
		if (width) {this.width = width;}
		if (height) {this.height = height;}
		if (image) {this.image = image;}
		if (x) {this.x = x;}
		if (y) {this.y = y;}
	}
	changeXBy (moveX) {
		this.x += moveX;
	}
	changeYBy (moveY) {
		this.y += moveY;
	}
	gridSetX (x,y,gridWidth,gridHeight) {
		this.x = (Math.round(x/gridWidth)*gridWidth);
		this.y = (Math.round(y/gridWidth)*gridHeight);
	}
}