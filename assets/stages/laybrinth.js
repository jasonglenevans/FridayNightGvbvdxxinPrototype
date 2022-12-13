var img = await renderer.createImage(loadUrl("./assets/images/lbBG2.png","imgage/png"));
var map1 = new Sprite(0,0,img,img.width,img.height);
addBGSprite(map1);
map1.scale = 0.5;
scrollingSprites.push({
	x:0,y:0,sprite:map1,factor:4,scale:1.2
})
var img = await renderer.createImage(loadUrl("./assets/images/lbBG.png","imgage/png"));
var map1 = new Sprite(0,0,img,img.width,img.height);
addBGSprite(map1);
scrollingSprites.push({
	x:0,y:0,sprite:map1,factor:1,scale:1.2
})
window.onsongload.push(async () => {
	opPos.y -= 20;
	opPos.x += 20;
	bfPos.y += 17;
	var a = 0;
	var e = 0;
	var b = 0;
	while (gameShowing) {
		await tickAsync();
		a += 1;
		e = Math.cos(a/150)*9;
		b = Math.sin(a/150)*9;
		var i = 8;
		for (var nn of Object.keys(notes)) {
			notes[nn].direction = e;
			function degrees_to_radians(degrees)
				{
				  var pi = Math.PI;
				  return degrees * (pi/180);
				}
			//notes[nn].x += Math.sin(degrees_to_radians(notes[nn].direction-90))*1;
			//notes[nn].y += Math.cos(degrees_to_radians(notes[nn].direction-90))*1;
			notes[nn].direction = notes[nn].x+notes[nn].y;
			notes[nn].x += b/i;
			if (notes[nn].x > 300) {
				notes[nn].x = -300;
			}
			if (notes[nn].x < -300) {
				notes[nn].x = 300;
			}
			notes[nn].y += e/i;
			if (notes[nn].y > 200) {
				notes[nn].y = -200;
			}
			if (notes[nn].y < -200) {
				notes[nn].y = 200;
			}
			i -= 1;
		}
	}
})