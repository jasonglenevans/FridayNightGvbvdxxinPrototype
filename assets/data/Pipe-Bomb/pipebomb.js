window.onsongload.push(async () => {
	bf.trs = 0;
	op.trs = 0;
	bfPos.x = 0;
	bfPos.y = 0;
	opPos.x = 0;
	opPos.y = 0;
	var img = await renderer.createImage(loadUrl("./assets/images/TheDancingDuo.png","imgage/png"));
	window.map1 = new Sprite(0,0,img,img.width,img.height);
	var frames = JSON.parse(loadFile("./assets/images/TheDancingDuo.json"));
	var animations = loadFrames(frames);
	addBGSprite(map1);
	scrollingSprites.push({
		x:0,y:0,sprite:map1,factor:0,scale:0.5
	});
	window.bouncyIcons = true;
	(async function () {
		//await animateFrame(map1,frames,animations["TheDancingDuo Dancee"],5,{changeSize:true,scaleFactor:1});
		while (gameShowing) {
			await animateFrame(map1,frames,animations["TheDancingDuo Dancee"],7,{changeSize:true,scaleFactor:1});
		}
	})();
});