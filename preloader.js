var fs = require("fs");
var fsp = require("fs/promises");
var path = require("path");

function loadUrl(src,type) {
	try{
		logConsole("GET "+src);
	}catch(e){}
	return "data:"+type+";charset=utf-8;base64,"+fs.readFileSync(src,{encoding:"Base64"});
}
function loadFile(src,type) {
	try{
		logConsole("GET "+src);
	}catch(e){}
	return fs.readFileSync(src,{encoding:"UTF-8"});
}
function fileExists(src) {
	try{
		logConsole("CHECK "+src);
	}catch(e){}
	return fs.existsSync(src);
}