var renderer = new GRenderer(document.getElementById("game"));
window.tickAsync = function () {
	return new Promise((a) => {
		setTimeout(a,1);
	})
};
window.waitAsync = function (secs) {
	return new Promise((a) => {
		setTimeout(a,secs*1000);
	})
};
var otherscale = null;
var cvs = renderer.canvas;
setInterval(() => {
	var scale = window.innerHeight/360;
	if (!(otherscale == scale)) {
		cvs.width = scale*600;
		cvs.height = scale*360;
		cvs.style.width = scale*600+"px";
		cvs.style.height = scale*360+"px";
		cvs.style.marginLeft = scale*600/-2+"px";
		renderer.scaleX = scale;
		renderer.scaleY = scale;
		otherscale = scale;
	}
	//document.body.onclick = function () {document.body.children[0].requestFullscreen();};
},1);
navigator.mediaSession.setActionHandler('play', function() { /* Code excerpted. */ });
navigator.mediaSession.setActionHandler('pause', function() { /* Code excerpted. */ });
navigator.mediaSession.setActionHandler('seekbackward', function() { /* Code excerpted. */ });
navigator.mediaSession.setActionHandler('seekforward', function() { /* Code excerpted. */ });
navigator.mediaSession.setActionHandler('previoustrack', function() { /* Code excerpted. */ });
navigator.mediaSession.setActionHandler('nexttrack', function() { /* Code excerpted. */ });