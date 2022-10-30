//the main job is to display text that the event value has inputed
window.lbft = [];
window.onsongload.push(() => {window.lbft = [];});
window.oneventfired.push(async (type,v1,v2) => {
	//console.log(`[Events]: Event ${type} Fired With Values ${v1} And ${v2}`);
	if (type == "Lyrics Bf Side") {
		if (lbft) {
			for (var spr of lbft) {
				removeSprite(spr);
			}
		}
		lbft = drawText(20+getTextLength(v1,1)/-2,150,v1,1);
		if (lbft) {
			for (var spr of lbft) {
				addSprite(spr);
			}
		}
		var trs = 0;
		while (trs < 1 && gameShowing) {
			await tickAsync();
			trs += 0.05;
			for (var letter of lbft) {
				letter.trs = trs;
			}
		}
		await waitAsync(v2);
		var trs = 1;
		while (trs > 0 && gameShowing) {
			await tickAsync();
			trs -= 0.05;
			for (var letter of lbft) {
				letter.trs = trs;
			}
		}
		if (lbft) {
			for (var spr of lbft) {
				removeSprite(spr);
			}
		}
	}
});
while (gameShowing) {await tickAsync();}
if (lbft) {
	for (var spr of lbft) {
		removeSprite(spr);
	}
}
lbft = null;