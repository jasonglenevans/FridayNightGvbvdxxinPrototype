onplayersing.push((note,isBF) => {
	if (note == "left") {
		camTo.x += 0-(-20);
	}
	if (note == "right") {
		camTo.x += 0-(20);
	}
	if (note == "up") {
		camTo.y += (20);
	}
	if (note == "down") {
		camTo.y += (-20);
	}
});