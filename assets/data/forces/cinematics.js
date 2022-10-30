var cinematics = new Sprite(0,0,await renderer.createImage(loadUrl("./assets/images/cinematics.png","imgage/png")),600,360);
window.oneventfired.push(async (type,v1,v2) => {
	//console.log(`[Events]: Event ${type} Fired With Values ${v1} And ${v2}`);
	if (type == "Cinematics") {
		addSprite(cinematics);
		cinematics.height = 650;
		var inI = 650;
		while (inI > 360) {
			await tickAsync();
			cinematics.height -= 10;
			inI -= 10;
		}
		if (Number(v1)) {
			await waitAsync(Number(v1));
		} else {
			await waitAsync(Number(v2));
		}
		var inI = 650;
		while (inI > 360) {
			await tickAsync();
			cinematics.height += 10;
			inI -= 10;
		}
		removeSprite(cinematics);
	}
});
while (gameShowing) {
	await tickAsync();
}
removeSprite(cinematics); //this does not throw an error if it is already removed, so no try and catch is needed