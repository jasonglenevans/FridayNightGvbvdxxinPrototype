var img = await renderer.createImage(loadUrl("./assets/images/stageback.png","imgage/png"));
var map1 = new Sprite(0,0,img,img.width,img.height);
addBGSprite(map1);
map1.scale = 0.9;
scrollingSprites.push({
	x:0,y:0,sprite:map1,factor:0.9,scale:0.4
})
var img = await renderer.createImage(loadUrl("./assets/images/stagefront.png","imgage/png"));
var map1 = new Sprite(0,0,img,img.width,img.height);
addBGSprite(map1);
map1.scale = 0.4;
scrollingSprites.push({
	x:0,y:180,sprite:map1,factor:0.9,scale:0.4
})
window.onsongload.push(async function () {
	opPos.y += -30;
	opPos.x += 60;
	bfPos.x -= 60;
	var modchartTick = 0
	while (gameShowing) {
		await tickAsync();
	/* 	for (var n of Object.keys(window.notes)) {
			var note = window.notes[n];
			note.direction += 0.05;
			if (note.direction > 360) {
				note.direction = 0;
			}
			function degrees_to_radians(degrees)
				{
				  var pi = Math.PI;
				  return degrees * (pi/180);
				}
			note.x += Math.sin(degrees_to_radians(note.direction-90))*0.05;
			note.y += Math.cos(degrees_to_radians(note.direction-90))*0.05;
		}
		modchartTick += 1; */
	}
})
var img = await renderer.createImage(loadUrl("./assets/images/stagecurtains.png","imgage/png"));
var map1 = new Sprite(0,0,img,img.width,img.height);
addBGSprite(map1);
map1.scale = 0.4;
scrollingSprites.push({
	x:0,y:120,sprite:map1,factor:1,scale:0.5
})