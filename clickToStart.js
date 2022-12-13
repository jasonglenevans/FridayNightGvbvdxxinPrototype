function parsePath(path) {
	var a = path.replaceAll("\\","/").toLowerCase();
	if (a[0] == "." && a[1] == "/") {
		var i = 2;
		var parsedPath = "";
		while (i < a.length) {
			parsedPath += a[i];
			i += 1;
		}
	} else {
		var i = 0;
		var parsedPath = "";
		while (i < a.length) {
			parsedPath += a[i];
			i += 1;
		}
	}
	return parsedPath;
}
function loadUrl(src,type) {
	console.log(`[FS Replacement]: get data url at ${src}`);
	return "data:"+type+";charset=utf-8;base64,"+window.data.files[parsePath(src)];
}
function loadFile(src,type) {
	var path = src;
	console.log(`[FS Replacement]: get text at ${src}`);
	return atob(window.data.files[parsePath(src)]);
}
function fileExists(src) {
	console.log(`[FS Replacement]: checking existance at ${src}`);
	if (window.data.files[parsePath(src)]) {
		return true;
	}
	return false;
}
document.onmousedown = function () {
	document.onmousedown = null;
	document.write(`<body style="background:black;font-family:Arial;"><div>
<canvas id="game" style="position:fixed;top:0;left:50%;background:white;" width=600 height=360></canvas>
</div><script src="rend.js?n=1"></script>
<script src="index.js?n=1"></script>
<script src="game/game.js?n=1"></script>
<script src="game/menu.js?n=1"></script>
<script src="game/main.js?n=1"></script><script src="game/debugger.js?n=1"></script></body>`);
};