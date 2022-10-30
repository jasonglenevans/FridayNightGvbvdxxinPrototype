/*
	Oh Hey There!
	I Forgot To Tell You That My Code Is Very Messy, And Hard To Read,
	If You Want A Better Experience, Then Use External JS Files Instead Of Editing This Source,
	Mods Are Highly On The List Of My Engine.
*/

var gameShowing = false;
var bfProps = JSON.parse(loadFile("./assets/images/characters/bf-animations.json"));
var bfFrames = JSON.parse(loadFile("./assets/images/characters/bf.json"));
var bfAnimations = loadFrames(JSON.parse(loadFile("./assets/images/characters/bf.json")));
var bf = null;
var bfSinging = false;
var opProps = null;
var opFrames = null;
var opAnimations = null;
var op = null;
var opSinging = false;
var resKeys = [false,false,false,false];
var pressKeys = [false,false,false,false];
var bfAnimating = false;
var opAnimating = false;
/* var debugtool = {
	logs:[],
	addLog:(...msgs) => {
		for (var msg in msgs) {
			if (typeof msg == "object") {
				try{
					var data = 
				}
			} else {
				var data = msg;
			}
		}
	}
} */
(async function () {
	window.textToFile = {
		"a":"a",
		"b":"b",
		"c":"c",
		"d":"d",
		"e":"e",
		"f":"f",
		"g":"g",
		"h":"h",
		"i":"i",
		"j":"j",
		"k":"k",
		"l":"l",
		"m":"m",
		"n":"n",
		"o":"o",
		"p":"p",
		"q":"q",
		"r":"r",
		"s":"s",
		"t":"t",
		"u":"u",
		"v":"v",
		"w":"w",
		"x":"x",
		"y":"y",
		"z":"z",
		"1":"1",
		"2":"2",
		"3":"3",
		"4":"4",
		"5":"5",
		"6":"6",
		"7":"7",
		"8":"8",
		"9":"9",
		"0":"0",
		".":"dot",
		":":"dubbledot",
		"|":"bar",
		"%":"percent",
		">":"greaterthan",
		"<":"lessthan",
		"=":"equals",
		"+":"plus",
		"-":"minus",
		"!":"shockmark",
		"?":"question",
		"'":"q1",
		"\"":"q2"
	};
	function getFontData(f) {
		return loadUrl("./assets/fnt/"+f,"application/x-font-ttf");
	}
	window.getFonts = function () {
		window.FONTS = {
			'Sans Serif': getFontData('NotoSans-Medium.ttf'),
			'Serif': getFontData('SourceSerifPro-Regular.otf'),
			'Handwriting': getFontData('handlee-regular.ttf'),
			'Marker': getFontData('Knewave.ttf'),
			'Curly': getFontData('Griffy-Regular.ttf'),
			'Pixel': getFontData('Grand9K-Pixel.ttf'),
			'Scratch': getFontData('Scratch.ttf')
		};

		// For each Base 64 string,
		// 1. Replace each with a usable @font-face tag that points to a Data URI.
		// 2. Inject the font into a style on `document.body`, so measurements
		//    can be accurately taken in SvgRenderer._transformMeasurements.
		for (const fontName in FONTS) {
			const fontData = FONTS[fontName];
			FONTS[fontName] = '@font-face {' +
				`font-family: "${fontName}";src: url("data:application/x-font-ttf;charset=utf-8;base64,${fontData}");}`;
		}

		if (!document.getElementById('scratch-font-styles')) {
			const documentStyleTag = document.createElement('style');
			documentStyleTag.id = 'scratch-font-styles';
			for (const fontName in FONTS) {
				documentStyleTag.textContent += FONTS[fontName];
			}
			document.body.insertBefore(documentStyleTag, document.body.firstChild);
		}

		return FONTS;
	}
	//getFonts();
	for (var n of Object.keys(textToFile)) {
		var nameFile = textToFile[n];
		textToFile[n] = await renderer.createImage(loadUrl("./assets/images/font-normal/"+nameFile+".png","image/png"));
	}
})();
function drawText(startx,starty,t,scale) {
	var height = 29*scale;
	var addwidth = 30*scale;
	var x = startx;
	var outsprites = [];
	var text = t.toString();
	
	for (var letter of text) {
		if (letter == " ") {
			x += addwidth;
		} else {
			var width = textToFile[letter.toLowerCase()].width*scale;
			var sprite = new Sprite(x,starty,textToFile[letter.toLowerCase()],width,height);
			outsprites.push(sprite);
			x += addwidth;
		}
	}
	return outsprites;
}
function getTextLength(t,scale) {
	var text = t.toString();
	return 30*scale*text.length;
}


async function playAnimation(player,animation) {
	if (player.toLowerCase() == "bf" || player.toLowerCase() == "boyfriend") {
		var data = bfProps[animation];
		var speed = 3;
		camTo.x = 0-bfPos.x+150;
		camTo.y = 0-bfPos.y+100;
		bfAnimating = true;
		await animateFrame(bf,bfFrames,bfAnimations[data.name],data.speed,{changeSize:true,scaleFactor:bf.scaleFactor,startFrame:data.startFrame});
		bfAnimating = false;
	}
	if (player.toLowerCase() == "dad" || player.toLowerCase() == "op" || player.toLowerCase() == "opponent") {
		var data = opProps[animation];
		var speed = 3;
		camTo.x = 0-opPos.x-150;
		camTo.y = 0-opPos.y+100;
		bfAnimating = true;
		await animateFrame(op,opFrames,opAnimations[data.name],data.speed,{changeSize:true,scaleFactor:op.scaleFactor,startFrame:data.startFrame});
		bfAnimating = false;
	}
}
async function opSing(note) {
	
		opSinging = true;
		camTo.x = 0-opPos.x-150;
		camTo.y = 0-opPos.y+100;
		if (!(opAnimating)) {
			animateFrame(op,opFrames,opAnimations[opProps[note]],3,{changeSize:true,scaleFactor:op.scaleFactor});
		}
		for (var funct of window.onplayersing) {
			try{
				funct(note,false);
			}catch(e){window.alert("Uh oh!!\nYour Script Contains An Error\n"+e)}
		}
		await waitAsync(0.15);
		opSinging = false;
		camTo.x = 0;
		camTo.y = 0;
		var noteToNum = {
			"left":0,
			"down":1,
			"up":2,
			"right":3
		};
		window.barHealth += 3;
		window.notes[(noteToNum[note]+1).toString()].image = window.notesPressed[noteToNum[note]];
		window.notes[(noteToNum[note]+1).toString()].width = 52+5;
		window.notes[(noteToNum[note]+1).toString()].height = 52+5;
		var spr = window.notes[(noteToNum[note]+1).toString()];
		spr.flash = true;
		spr.width = window.notesPressed[noteToNum[note]].width/1.7;
		spr.height = window.notesPressed[noteToNum[note]].height/1.7;
		setTimeout(() => {
			if (spr.flash) {
				spr.image = window.notesPressed1[noteToNum[note]];
				spr.width = window.notesPressed1[noteToNum[note]].width/1.7;
				spr.height = window.notesPressed1[noteToNum[note]].height/1.7;
			}
		},200);
		setTimeout(() => {
			if (spr.flash) {
				spr.image = window.notes[(noteToNum[note]+1).toString()].noteog;
				spr.width = spr.ogwidth;
				spr.height = spr.ogheight;
				spr.flash = false;
			}
		},250);
}
async function bfSing(note) {
	
		bfSinging = true;
		camTo.x = 0-bfPos.x+150;
		camTo.y = 0-bfPos.y+100;
		if (!(bfAnimating)) {
			animateFrame(bf,bfFrames,bfAnimations[bfProps[note]],3,{changeSize:true,scaleFactor:bf.scaleFactor});
		}
		for (var funct of window.onplayersing) {
			try{
				funct(note,true);
			}catch(e){window.alert("Uh oh!!\nYour Script Contains An Error\n"+e)}
		}
		await waitAsync(0.15);
		bfSinging = false;
		camTo.x = 0;
		camTo.y = 0;
		var noteToNum = {
			"left":4,
			"down":5,
			"up":6,
			"right":7
		};
		window.barHealth -= 3;
		window.notes[(noteToNum[note]+1).toString()].image = window.notesPressed[noteToNum[note]];
		window.notes[(noteToNum[note]+1).toString()].width = 52+5;
		window.notes[(noteToNum[note]+1).toString()].height = 52+5;
		var spr = window.notes[(noteToNum[note]+1).toString()];
		spr.flash = true;
		spr.width = window.notesPressed[noteToNum[note]].width/1.7;
		spr.height = window.notesPressed[noteToNum[note]].height/1.7;
		setTimeout(() => {
			if (spr.flash) {
				spr.image = window.notesPressed1[noteToNum[note]];
				spr.width = window.notesPressed1[noteToNum[note]].width/1.7;
				spr.height = window.notesPressed1[noteToNum[note]].height/1.7;
			}
		},200);
		setTimeout(() => {
			if (spr.flash) {
				spr.image = window.notes[(noteToNum[note]+1).toString()].noteog;
				spr.width = spr.ogwidth;
				spr.height = spr.ogheight;
				spr.flash = false;
			}
		},250);
}
async function BFNotes() {
	if (!(window.bot)) {
		window.onkeydown = async function (e) {
			var key = null;
			var keynum = 0;
			if (e.key == "ArrowLeft") {
				key = "left";
				resKeys[0] = true;
			}
			if (e.key == "ArrowDown") {
				key = "down";
				resKeys[1] = true;
				keynum = 1;
			}
			if (e.key == "ArrowUp") {
				key = "up";
				resKeys[2] = true;
				keynum = 2;
			}
			if (e.key == "ArrowRight") {
				key = "right";
				resKeys[3] = true;
				keynum = 3;
			}
			if (key) {
				pressKeys[keynum] = true;
				setTimeout(() => {
					pressKeys[keynum] = false;
				},150)
			}
			
		};
		window.onkeyup = async function (e) {
			var key = null;
			var keynum = 0;
			if (e.key == "ArrowLeft") {
				key = "LEFT";
				resKeys[0] = false;
				keynum = 0;
			}
			if (e.key == "ArrowDown") {
				key = "DOWN";
				resKeys[1] = false;
				keynum = 1;
			}
			if (e.key == "ArrowUp") {
				key = "UP";
				resKeys[2] = false;
				keynum = 2;
			}
			if (e.key == "ArrowRight") {
				key = "RIGHT";
				resKeys[3] = false;
				keynum = 3;
			}
			pressKeys[keynum] = false;
		};
	}
	var beatTime = 0;
	var beatTimeFast = 0;
	var iconBounce = true;
	window.camBoom = 1;
	while (gameShowing) {
		if (gameShowing) {
			beatTime2 = Math.round(((daysSince2000()*86400)-startTime)/(120/songBPM));
			beatTimeFast2 = Math.round(((daysSince2000()*86400)-startTime)/(60/songBPM));
			if (!(beatTime == beatTime2)) {
				camBoom = 0-camBoom;
				if (camBoom>0) {
					camZoom += 0.05;
				}
				if (!(bfSinging) && !(bfAnimating)) {
					animateFrame(bf,bfFrames,bfAnimations[bfProps.idle],3,{changeSize:true,scaleFactor:bf.scaleFactor});
				} else {
					
				}
				if (!(opSinging) && !(opAnimating)) {
					animateFrame(op,opFrames,opAnimations[opProps.idle],3,{changeSize:true,scaleFactor:op.scaleFactor});
				} else {
					
				}
			}
			if (!(beatTimeFast == beatTimeFast2)) {
				try{
					iconBounce = !(iconBounce);
					if (window.bfIcon) {
						window.bfIcon.scale += 0.2;
						if (window.bouncyIcons) {
							if (iconBounce) {
								window.bfIcon.direction += 45;
							} else {
								window.bfIcon.direction -= 45;
							}
						}
					}
					if (window.opIcon) {
						window.opIcon.scale += 0.2;
						if (window.bouncyIcons) {
							if (iconBounce) {
								window.opIcon.direction -= 45;
							} else {
								window.opIcon.direction += 45;
							}
						}
					}
					if (window.botIcon) {
						window.botIcon.scale += 0.3;
					}
				}catch(e){}
			}
			beatTime = Math.round(((daysSince2000()*86400)-startTime)/(120/songBPM));
			beatTimeFast = Math.round(((daysSince2000()*86400)-startTime)/(60/songBPM));
		}
		await tickAsync();
	}
}
function waitUntilAudioLoad(src) {
	return new Promise((resolve,reject) => {
		var aud = document.createElement("audio");
		aud.onload = function () {
			console.log("loaded audio")
			resolve(aud);
		};
		aud.onerror = function () {
			reject("Failed To Load Audio.");
		};
		setTimeout(() => {
			aud.src = src;
			resolve(aud);
		},50)
	})
}
var notesOnscreen = [];
function addNote(spr) {
	spr.id2 = sprites.length;
	notesOnscreen.push(spr);
}
function removeNote(spr) {
	var v = [];
	for (var sprite of notesOnscreen) {
		if (sprite == spr) {
			
		} else {
			v.push(sprite);
		}
	}
	notesOnscreen = v;
}
var chartOffset = 0;
window.currentChart = null;
window.camX = 0;
window.camY = 0;
window.camZoom = 0;
var scrollSpeed = 1;
(async function () {
	window.badNote = await waitUntilAudioLoad(loadUrl("./assets/sounds/missnote1.ogg","audio/ogg"));
})();
var hitY = -130;
async function chartNotesScroller() {
	while (gameShowing) {
		if (notesOnscreen) {
			try{
			var time = ((daysSince2000()*86400)-startTime);
			await tickAsync();
			for (var notedata of notesOnscreen) {
				if (notedata){
					var y = (((notedata.data.time)-time)*(250*scrollSpeed))-(200*1)+30;
					//console.log(y-(window.notes["1"].y/2));
					notedata.sprite.realy = y;
					var ny = window.notes[(notedata.data.note).toString()].y;
					notedata.sprite.y = y;
					notedata.sprite.y -= -130 - window.notes[(notedata.data.note).toString()].y;
					
					if (notedata.isHold) {
						notedata.sprite.width = window.chartNotesHold[notedata.data.note-1].width;
						notedata.sprite.height = window.chartNotesHold[notedata.data.note-1].height;
					} else {
						notedata.sprite.width = window.chartNotes[notedata.data.note-1].width;
						notedata.sprite.height = window.chartNotes[notedata.data.note-1].height;
						notedata.sprite.direction = window.notes[(notedata.data.note).toString()].direction;
					}
					notedata.sprite.x = window.notes[(notedata.data.note).toString()].x;
				}
				if (notedata.sprite.realy < hitY) {
					if (notedata.data.note < 5) {
						if (!(notedata.isHold)) {voices.volume = 1;}
						opSing(({
							"1":"left",
							"2":"down",
							"3":"up",
							"4":"right"
						})[notedata.data.note.toString()]);
					}
					if ((notedata.data.note > 4 && window.bot)) {
						if (!(notedata.isHold)) {voices.volume = 1;HitNotes += 1;}
						
						bfSing(({
							"5":"left",
							"6":"down",
							"7":"up",
							"8":"right"
						})[notedata.data.note.toString()]);
					}
					if (notedata.data.note < 5 || window.bot) {
						removeSprite(notedata.sprite);
						removeNote(notedata);
					}
				}
				if (notedata.sprite.realy < (hitY+45)) {
					var noteOnBFKeys = notedata.data.note-5;
					
					if (notedata.isHold) {
						if (resKeys[noteOnBFKeys]) {
							voices.volume = 1;
							HitNotes += 1;
							bfSing(({
								"5":"left",
								"6":"down",
								"7":"up",
								"8":"right"
							})[notedata.data.note.toString()]);
							removeSprite(notedata.sprite);
							removeNote(notedata);
						}
					} else {
						
						if (pressKeys[noteOnBFKeys]) {
							voices.volume = 1;
							HitNotes += 1;
							bfSing(({
								"5":"left",
								"6":"down",
								"7":"up",
								"8":"right"
							})[notedata.data.note.toString()]);
							removeSprite(notedata.sprite);
							removeNote(notedata);
						}
					}
				}
				if (notedata.sprite.realy < (hitY-64)) {
					if (!(window.bot)) {
						if (notedata.data.note > 4) {
							if (!(notedata.isHold)) {
								voices.volume = 0.01; //if you do 0 then it desyncs the music, for some reason the audio api is trash at syncing when reseting on a note, so thats why its on 0.01
								window.badNote.currentTime=0;
								window.badNote.play();
								MissedNotes += 1;
								var missFrame = ({
									"5":"miss_left",
									"6":"miss_down",
									"7":"miss_up",
									"8":"miss_right"
								})[notedata.data.note.toString()];
								if (!(bfAnimating)) {
									//for lazy animators - like me - i might not make the miss animations, so then detect if they exist
									if (bfProps[missFrame]) {
										animateFrame(bf,bfFrames,bfAnimations[bfProps[missFrame]],3,{changeSize:true,scaleFactor:bf.scaleFactor});
									}
								}
							} 
							removeSprite(notedata.sprite);
							removeNote(notedata);
						}
					}
				}
			} }catch(e){console.log("The Note System Failed, Mostly Caused By Leaving Before The Song Is Finished",e);}
		}
	}
}
var startTime = 0;
async function waitUntilTimer(a) {
	while (gameShowing) {
		await tickAsync();
		var time = ((daysSince2000()*86400)-startTime);
		if(
		time
		>
		a
		){
			break;
		}
	};
}
window.chartNotes = [];
window.chartNotesHold = [];
window.chartNotesHoldEnd = [];
window.notesPressed = [];
window.notesPressed1 = [];
(async function () {
	var i = 1;
	while (i < 9) {
		window.chartNotes.push(await renderer.createImage(loadUrl("./assets/images/chart_notes/"+i+".svg","image/svg+xml")));
		window.chartNotesHold.push(await renderer.createImage(loadUrl("./assets/images/chart_notes/hold"+i+".svg","image/svg+xml")));
		window.chartNotesHoldEnd.push(await renderer.createImage(loadUrl("./assets/images/chart_notes/holdend"+i+".svg","image/svg+xml")));
		i += 1;
	}
	window.notesPressed.push(await renderer.createImage(loadUrl("./assets/images/shine_notes/left1.png","image/png")));
	window.notesPressed.push(await renderer.createImage(loadUrl("./assets/images/shine_notes/down1.png","image/png")));
	window.notesPressed.push(await renderer.createImage(loadUrl("./assets/images/shine_notes/up1.png","image/png")));
	window.notesPressed.push(await renderer.createImage(loadUrl("./assets/images/shine_notes/right1.png","image/png")));
	window.notesPressed.push(await renderer.createImage(loadUrl("./assets/images/shine_notes/left1.png","image/png")));
	window.notesPressed.push(await renderer.createImage(loadUrl("./assets/images/shine_notes/down1.png","image/png")));
	window.notesPressed.push(await renderer.createImage(loadUrl("./assets/images/shine_notes/up1.png","image/png")));
	window.notesPressed.push(await renderer.createImage(loadUrl("./assets/images/shine_notes/right1.png","image/png")));
	//2
	window.notesPressed1.push(await renderer.createImage(loadUrl("./assets/images/shine_notes/left2.png","image/png")));
	window.notesPressed1.push(await renderer.createImage(loadUrl("./assets/images/shine_notes/down2.png","image/png")));
	window.notesPressed1.push(await renderer.createImage(loadUrl("./assets/images/shine_notes/up2.png","image/png")));
	window.notesPressed1.push(await renderer.createImage(loadUrl("./assets/images/shine_notes/right2.png","image/png")));
	window.notesPressed1.push(await renderer.createImage(loadUrl("./assets/images/shine_notes/left2.png","image/png")));
	window.notesPressed1.push(await renderer.createImage(loadUrl("./assets/images/shine_notes/down2.png","image/png")));
	window.notesPressed1.push(await renderer.createImage(loadUrl("./assets/images/shine_notes/up2.png","image/png")));
	window.notesPressed1.push(await renderer.createImage(loadUrl("./assets/images/shine_notes/right2.png","image/png")));
})();
window.songBPM = 150;
async function holdNote(length,note,data,offset) {
	var stime = ((daysSince2000()*86400)-startTime);
	var releaseTime = (stime+(((length/1000)*songBPM)/240));
	//console.log(releaseTime);
	while (gameShowing) {
		var time = ((daysSince2000()*86400)-startTime);
		if(time>releaseTime){
			var ns = new Sprite(0,1000000,window.chartNotesHoldEnd[note]);
			var noteData = {
				data:{
					...data,
					time:((daysSince2000()*86400)-startTime)-offset
				},
				sprite:ns,
				isHold:true
			};
			addNote(noteData);
			addSprite(ns);
			break;
		}
		var ns = new Sprite(0,1000000,window.chartNotesHold[note]);
		var noteData = {
			data:{
				...data,
				time:((daysSince2000()*86400)-startTime)-offset
			},
			sprite:ns,
			isHold:true
		};
		addNote(noteData);
		addSprite(ns);
		await tickAsync();
	}
}
async function runNotes(map) {
	//currentChart = JSON.parse(loadFile("./assets/data/"+map+"/data.json"));
	var notes = currentChart.song.notes;
	var runI = 0;
	if (notes[0]) {
		if (notes[0].time > 1) {
			chartOffset = -1;
		} else {
			chartOffset = notes[0]*-2
		}
	}
	chartNotesScroller()
	while (gameShowing && runI < notes.length) {
		var ns = new Sprite(0,1000000,window.chartNotes[notes[runI].note-1]);
		var noteData = {
			data:notes[runI],
			sprite:ns,
			isHold:false
		};
		addNote(noteData);
		addSprite(ns);
		chartOffset = -1;
		await waitUntilTimer(notes[runI].time+chartOffset);
		if (notes[runI].holdLength > 1) {
			holdNote(notes[runI].holdLength,notes[runI].note-1,notes[runI],chartOffset)
		}
		runI += 1;
	}
}
/////////////////////////////////////////////////////////////////////////////////////
/* Direct Copy And Paste Of Days Since 2000 From The Scratch-VM (or scratch engine)*/
function daysSince2000 () {
	const msPerDay = 24 * 60 * 60 * 1000;
	const start = new Date(2000, 0, 1); // Months are 0-indexed.
	const today = new Date();
	const dstAdjust = today.getTimezoneOffset() - start.getTimezoneOffset();
	let mSecsSinceStart = today.valueOf() - start.valueOf();
	mSecsSinceStart += ((today.getTimezoneOffset() - dstAdjust) * 60 * 1000);
	return mSecsSinceStart / msPerDay;
}
/////////////////////////////////////////////////////////////////////////////////////
var camX = null;
window.bot = false;
window.putSprites = [];
function putSprite(spr) {
	addSprite(spr);
	putSprites.push(spr);
}
window.camZoom = 1;
async function barManager(bfIconFile,opIconFile) {
	window.healthBar = new Sprite(0,144,await renderer.createImage(loadUrl("./assets/images/healthbar.svg","image/svg+xml")),444,15);
	window.botIcon = new Sprite(0,-144,await renderer.createImage(loadUrl("./assets/images/bot.png","image/png")),107,19);
	window.filledbar = new Sprite(0,-162,await renderer.createImage(loadUrl("./assets/images/filledbar.png","image/png")),85,9);
	window.unfilledbar = new Sprite(0,-162,await renderer.createImage(loadUrl("./assets/images/unfilledbar.png","image/png")),85,9);
	addSprite(healthBar);
	addSprite(unfilledbar);
	addSprite(filledbar);
	if (window.bot){addSprite(botIcon);}
	window.bfIcon = new Sprite(37,144,await renderer.createImage(loadUrl("./assets/images/icons/"+bfIconFile+".png","image/png")),150/2,150/2);
	window.opIcon = new Sprite(-37,144,await renderer.createImage(loadUrl("./assets/images/icons/"+opIconFile+".png","image/png")),150/2,150/2);
	window.bfIcon.flipH = true;
	addSprite(bfIcon);
	addSprite(opIcon);
	
	var sprt = [];
	while (gameShowing) {
		await tickAsync();
		window.filledbar.width = inst.currentTime/inst.duration*85;
		bfIcon.scale += (1 - bfIcon.scale) / 9;
		opIcon.scale += (1 - opIcon.scale) / 9;
		botIcon.scale += (1 - botIcon.scale) / 9;
		bfIcon.direction += (90 - bfIcon.direction) / 7;
		opIcon.direction += (90 - opIcon.direction) / 7;
		window.filledbar.width = inst.currentTime/inst.duration*85;
		window.filledbar.x = window.filledbar.width/2;
		window.filledbar.x += -42.5;
		for (var spr of sprt) {
			removeSprite(spr);
		}
		var hudText = `<Notes Hit: ${HitNotes} | Notes Missed: ${MissedNotes} | ${Math.round(inst.currentTime/inst.duration*100)}% Complete>`;
		var songHud = drawText((getTextLength(currentChart.song.song,0.4)/-2)+5,-162,currentChart.song.song,0.4);
		var sprt = drawText(getTextLength(hudText,0.3)/-2,-173,hudText,0.3).concat(songHud);
		for (var spr of sprt) {
			addSprite(spr);
		}
		if (barHealth > 208) {
			barHealth = 208;
		}
		if (barHealth < -208) {
			barHealth = -208;
		}
		bfIcon.x = (barHealth+(bfIcon.scale*37));
		opIcon.x = (barHealth-(bfIcon.scale*37));
		bfIcon.imageLocation = {
			x:0,y:0,
			width:150,height:150
		};
		opIcon.imageLocation = {
			x:0,y:0,
			width:150,height:150
		};
		if (barHealth > 200) {
			bfIcon.imageLocation = {
				x:150,y:0,
				width:150,height:150
			};
			opIcon.imageLocation = {
				x:0,y:0,
				width:150,height:150
			};
		}
		if (barHealth < -200) {
			bfIcon.imageLocation = {
				x:0,y:0,
				width:150,height:150
			};
			opIcon.imageLocation = {
				x:150,y:0,
				width:150,height:150
			};
		}

	}
	removeSprite(bfIcon);
	removeSprite(opIcon);
	removeSprite(healthBar);
	removeSprite(botIcon);
	removeSprite(unfilledbar);
	removeSprite(filledbar);
	for (var spr of sprt) {
		removeSprite(spr);
	}
	sprt = [];
}
async function reloadIcons(bfIconFile,opIconFile) {
	window.bfIcon.image = await renderer.createImage(loadUrl("./assets/images/icons/"+bfIconFile+".png","image/png"));
	window.opIcon.image = await renderer.createImage(loadUrl("./assets/images/icons/"+opIconFile+".png","image/png"));
}
async function changeCharacter(player,file) {
	if (player.toLowerCase() == "bf" || player.toLowerCase() == "boyfriend") {
		bfProps = JSON.parse(loadFile("./assets/images/characters/"+file+"-animations.json"));
		bfAnimations = loadFrames(JSON.parse(loadFile("./assets/images/characters/"+file+".json")));
		bfFrames = JSON.parse(loadFile("./assets/images/characters/"+file+".json"));
		bf.image = await renderer.createImage(loadUrl("./assets/images/characters/"+bfProps.file+".png","imgage/png"));
		reloadIcons(bfProps["health_icon"],opProps["health_icon"])
	}
	if (player.toLowerCase() == "op" || player.toLowerCase() == "dad" || player.toLowerCase() == "d") {
		var p = JSON.parse(loadFile("./assets/images/characters/"+file+"-animations.json"));
		var img = await renderer.createImage(loadUrl("./assets/images/characters/"+p.file+".png","imgage/png"));
		opProps = p;
		opAnimations = loadFrames(JSON.parse(loadFile("./assets/images/characters/"+file+".json")));
		opFrames = JSON.parse(loadFile("./assets/images/characters/"+file+".json"));
		op.image = img;
		reloadIcons(bfProps["health_icon"],opProps["health_icon"])
	}
}
async function runEvent(data) {
	for (var funct of window.oneventfired) {
		try{
			funct(data.type,data.v1,data.v2);
		}catch(e){window.alert("Uh oh!!\nYour Script Contains An Error\n"+e)}
	}
	//console.log(data);
	if (data.type == "Add Camera Zoom") {
		camTo.zoom += Number(data.v1);
	}
	if (data.type == "Set Cam Zoom") {
		camTo.zoom = Number(data.v1);
	}
	if (data.type == "Change Character") {
		changeCharacter(data.v1,data.v2);
	}
	if (data.type == "Play Animation") {
		playAnimation(data.v2,data.v1);
	}
}
async function eventsSys(m) {
	if (fileExists("./assets/data/"+m+"/events.json")) {
		window.currentEvents = JSON.parse(loadFile("./assets/data/"+m+"/events.json"));
		var events = currentEvents.events;
		var runI = 0;
		for (var event of events) {
			await waitUntilTimer(event.eventFireTime/1000);
			for (var eventdat of event.events) {
				runEvent(eventdat);
			}
			runI += 1;
		}
	}
}
async function mainGame(mapLol,botplay,gameEndedCB) {
	window.oneventfired = [];
	window.HitNotes = 0;
	window.MissedNotes = 0;
	window.barHealth = 0; //center
	renderer.blackScreen = true;
	window.onplayersing = [];
	window.camTo = {x:0,y:0,zoom:1};
	window.scrollingSprites = [];
	window.onsongload = [];
	window.inst = await waitUntilAudioLoad(loadUrl("./assets/songs/"+mapLol+"/Inst.ogg","audio/ogg"));
	window.voices = await waitUntilAudioLoad(loadUrl("./assets/songs/"+mapLol+"/Voices.ogg","audio/ogg"));
	window.bot = botplay;
	window.bouncyIcons = false; //the "dave and bambi" style of the icons beat.
	window.levelCountdown = true; //im too lazy to add a count down. lol so this is "unused" but you can keep this in your js files	
	//menuBG = new Sprite(0,0,await renderer.createImage(loadUrl("./assets/images/menuBG.png","imgage/png")),1286,730);
	notesOnscreen = [];
	var leveldata = JSON.parse(loadFile("./assets/data/"+mapLol+"/characters.json"));
	var properties = JSON.parse(loadFile("./assets/data/"+mapLol+"/properties.json"));
	scrollSpeed = properties.scrollSpeed;
	if (properties.scripts) {
		for (var script of properties.scripts) {
			try{
				//console.log("Loaded Script: "+script+".js")
				eval("(async function () {\n"+loadFile("./assets/data/"+mapLol+"/"+script+".js")+"\n})();");
			}catch(e){window.alert("script error "+e)}
		}
	}
	if (properties.stage) {
		try{
			//console.log("Loaded Script: "+script+".js")
			eval("(async function () {\n"+loadFile("./assets/stages/"+properties.stage+".js")+"\n})();");
		}catch(e){window.alert("script error "+e)}
	}
	songBPM = properties.songBPM;
	bfProps = JSON.parse(loadFile("./assets/images/characters/"+leveldata.bf+"-animations.json"));
	bfFrames = JSON.parse(loadFile("./assets/images/characters/"+leveldata.bf+".json"));
	bfAnimations = loadFrames(JSON.parse(loadFile("./assets/images/characters/"+leveldata.bf+".json")));
	bf = new Sprite(212,97,await renderer.createImage(loadUrl("./assets/images/characters/"+bfProps.file+".png","imgage/png")),395,395);
	opProps = JSON.parse(loadFile("./assets/images/characters/"+leveldata.opponent+"-animations.json"));
	opFrames = JSON.parse(loadFile("./assets/images/characters/"+leveldata.opponent+".json"));
	opAnimations = loadFrames(JSON.parse(loadFile("./assets/images/characters/"+leveldata.opponent+".json")));
	op = new Sprite(-212,89,await renderer.createImage(loadUrl("./assets/images/characters/"+opProps.file+".png","imgage/png")),395,395);
	barManager(bfProps["health_icon"],opProps["health_icon"]);
	bf.scaleFactor = 4;
	op.scaleFactor = 4;
	startTime = daysSince2000()*86400;
	addSprite(bf);
	addSprite(op);
	gameShowing = true;
	BFNotes();
	currentChart = JSON.parse(loadFile("./assets/data/"+mapLol+"/data.json"));

	inst.play();
	voices.play();
	window.currentBGM = null;
	var noteScale = 1;
	async function createNoteSprite(x,id) {
		var img = await renderer.createImage(loadUrl("./assets/images/notes/"+id+".png","imgage/png"));
		var spr = new Sprite(x*(noteScale+0.005),-130,img,img.width/(noteScale+1),img.height/(noteScale+1));
		spr.noteog = img;
		spr.ogwidth = img.width/(noteScale+1);
		spr.ogheight = img.height/(noteScale+1);
		spr.image.name = "NoteNormal";
		return spr;
	}
	window.notes = {
		"1":await createNoteSprite(-210-50,1),
		"2":await createNoteSprite(-160-50,2),
		"3":await createNoteSprite(-110-50,3),
		"4":await createNoteSprite(-60-50,4),
		"5":await createNoteSprite(60+50,1),
		"6":await createNoteSprite(110+50,2),
		"7":await createNoteSprite(160+50,3),
		"8":await createNoteSprite(210+50,4)
	};
	for (var notename of Object.keys(notes)) {
		addSprite(notes[notename]);
	}
	runNotes(mapLol);
	inst.currentTime = 0;
	voices.currentTime = 0;
	startTime = daysSince2000()*86400;
	window.bfPos = {
		x: bf.x,
		y: bf.y,
		sprite: bf,
		factor:1,
		scale:1
	};
	scrollingSprites.push(bfPos);
	window.opPos = {
		x: op.x,
		y: op.y,
		sprite: op,
		factor:1,
		scale:1
	};
	scrollingSprites.push(opPos);
	camX = 0;
	camY = 0;
	window.camTo = {x:0,y:0,zoom:1};
	renderer.blackScreen = false;
	eventsSys(mapLol);
	inst.volume = 1;
	voices.volume = 1;
	inst.onended = function () {
		voices.remove();
		inst.remove();
		gameShowing = false;
	};
	for (var funct of window.onsongload) {
		try{
			funct();
		}catch(e){window.alert("Uh oh!!\nYour Script Contains An Error\n"+e)}
	}
	inst.currentTime = 0;
	voices.currentTime = 0;
	while (gameShowing) {
		await tickAsync();
		
		//the cam part
		for (var scrollInfo of scrollingSprites) {
			if (scrollInfo.factor > 0) {
				var cx = camX/scrollInfo.factor;
				var cy = camY/scrollInfo.factor;
			} else {
				var cx = 0;
				var cy = 0;
			}
			scrollInfo.sprite.x = (scrollInfo.x + cx )*window.camZoom;
			scrollInfo.sprite.y = (scrollInfo.y + cy )*window.camZoom;
			scrollInfo.sprite.scale = scrollInfo.scale*window.camZoom;
		}
		camX += (camX - camTo.x) / -70;
		camY += (camY - camTo.y) / -70;
		camZoom += (camZoom - camTo.zoom) / -40;
	}
	inst.pause();
	voices.pause()
	removeSprite(bf);
	removeSprite(op);
	for (var notename of Object.keys(notes)) {
		removeSprite(notes[notename]);
	}
	try{
		for (var notedata of notesOnscreen) {
			removeSprite(notedata.sprite);
		}
	}catch(e){}
	for (var sprite of window.putSprites) {
		removeSprite(sprite);
	}
	bgSprites = [];
	sprites = [];
	notesOnscreen = null;
	window.onkeydown = null;
	window.onkeyup = null;
	if (gameEndedCB) {
		gameEndedCB();
	}
}
function openGame(level,botplay,gameEndedCB) {
	gameShowing = false;renderer.blackScreen - true;setTimeout(() => {sprites = [];mainGame(level,botplay,gameEndedCB);},800);
}
function openGameAsync(level,botplay) {
	return new Promise((a) => {
		openGame(level,botplay,a)
	})
}
function stopGame() {
	gameShowing = false;sprites = [];bgSprites = [];
}
(async function () {
await openGameAsync('Pipe-Bomb',true)
})()