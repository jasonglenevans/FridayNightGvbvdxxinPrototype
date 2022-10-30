window.currentBGM = null;
var freakyMenu = new Audio(loadUrl("./assets/music/freakyMenu.ogg","audio/ogg"));
var bgms = {
	"freakyMenu":freakyMenu
};
//var menuBG = null;

function loadFrames(json) {
	var animations = {};
	for (var frameName of Object.keys(json)) {
		var frame = json[frameName];
		var numberStrings = {
			"0":"0",
			"1":"1",
			"2":"2",
			"3":"3",
			"4":"4",
			"5":"5",
			"6":"6",
			"7":"7",
			"8":"8",
			"9":"9",
			".":"."
		};
		var realName = "";
		var frameNumber = "";
		for (var character of frame.name) {
			if (numberStrings[character]) {
				frameNumber += character;
			} else {
				realName += character;
			}
		}
		if (animations[realName]) {
			animations[realName].frames.push(frame.name);
		} else {
			animations[realName] = {
				frames:[
					frame.name
				]
			};
		}
	}
	return animations;
}
//some stuff i don't need rn in this file.
//var bfProps = JSON.parse(loadFile("./assets/images/characters/bf-animations.json"));
//var bfFrames = JSON.parse(loadFile("./assets/images/characters/bf.json"));
//var bfAnimations = loadFrames(JSON.parse(loadFile("./assets/images/characters/bf.json")));
//var bf = null;
var sprites = [];
var bgSprites = [];
function addSprite(spr) {
	spr.id = sprites.length;
	sprites.push(spr);
}
function addBGSprite(spr) {
	spr.id = sprites.length;
	bgSprites.push(spr);
}
function removeSprite(spr) {
	var v = [];
	for (var sprite of sprites) {
		if (sprite == spr) {
			
		} else {
			v.push(sprite);
		}
	}
	sprites = v;
}
function removeBGSprite(spr) {
	var v = [];
	for (var sprite of bgSprites) {
		if (sprite == spr) {
			
		} else {
			v.push(sprite);
		}
	}
	bgSprites = v;
}
(async function () {
	//menuBG = await new Sprite(0,0,await renderer.createImage(loadUrl("./assets/images/menuBG.png","imgage/png")),1286,730);
	//bf = await new Sprite(0,0,await renderer.createImage(loadUrl("./assets/images/characters/"+bfProps.file+".png","imgage/png")),395,395);
	//bf.imageLocation = null;
	while (true) {
		await tickAsync();
		if (currentBGM) {
			if (bgms[currentBGM]) {
				bgms[currentBGM].play();
			}
		} else {
			for (var bgm of Object.keys(bgms)) {
				bgms[bgm].pause();
			}
		}
		
		renderer.drawSprites(bgSprites.concat(sprites));
	}
})();
async function animateFrame(sprite,frames,animation,speed,options) {
	try{
		sprite.animation = animation;
		var frameIndex = 0;
		if (options.startFrame) {
			frameIndex = options.startFrame;
		}
		while (frameIndex < animation.frames.length) {
			try{
				var frameName = animation.frames[frameIndex];
				var i = 0;
				if (!(sprite.animation == animation)) {
					break;
				}
				while (i < speed) {
					await tickAsync();
					i += 1;
				}
				var frame = frames[frameName];
				if (options) {
					if (options.changeSize) {
						if (options.scaleFactor) {
							sprite.width = frame.width/options.scaleFactor;
							sprite.height = frame.height/options.scaleFactor;
						} else {
							sprite.width = frame.width;
							sprite.height = frame.height;
						}
					}
				}
				sprite.imageLocation = frame;
			}catch(e){console.log(`[animateFrame]: animation failure.`);break;}
			frameIndex += 1;
		}
	}catch(e){console.log(`[animateFrame]: animation failure.`);}
}

//animateFrame(bf,bfFrames,bfAnimations["BF idle dance"],5);