var img = await renderer.createImage(loadUrl("./assets/images/sky.png","imgage/png"));
var map1 = new Sprite(0,0,img,img.width,img.height);
addBGSprite(map1);
map1.scale = 0.5;
scrollingSprites.push({
	x:0,y:0,sprite:map1,factor:4,scale:0.5
})
var img = await renderer.createImage(loadUrl("./assets/images/mountains2.png","imgage/png"));
var map1 = new Sprite(0,0,img,img.width,img.height);
addBGSprite(map1);
scrollingSprites.push({
	x:0,y:90,sprite:map1,factor:2,scale:0.5
})
var img = await renderer.createImage(loadUrl("./assets/images/mountainsNOwater.png","imgage/png"));
var map1 = new Sprite(0,0,img,img.width,img.height);
addBGSprite(map1);
scrollingSprites.push({
	x:0,y:0,sprite:map1,factor:1.4,scale:0.5
})
var img = await renderer.createImage(loadUrl("./assets/images/greenHill.png","imgage/png"));
var map1 = new Sprite(0,0,img,img.width,img.height);
addBGSprite(map1);
scrollingSprites.push({
	x:0,y:0,sprite:map1,factor:1,scale:0.5
})