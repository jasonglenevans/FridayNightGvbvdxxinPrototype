var menuShowing = false;
var menuBG = null;
async function menu() {
	menuBG = new Sprite(0,0,await renderer.createImage(loadUrl("./assets/images/menuBG.png","imgage/png")),1286,730);
	addSprite(menuBG);
	//addSprite(bf);
	//addSprite(bf);
	menuShowing = true;
	window.currentBGM = null;
	while (menuShowing) {
		await tickAsync();
		
	}
	removeSprite(menuBG);
	//removeSprite(bf);
}

//menu();