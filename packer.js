var fs = require("fs");
var path = require("path");
var assetsFile = {files:{},directories:[]};
try{fs.rmSync("./web_dist",{recursive: true, force: true});}catch(e){}
try{fs.mkdirSync("./web_dist");}catch(e){}
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
var blockedStuff = [
	"package.json",
	"package-lock.json",
	"node_modules",
	"web_dist",
	"dist"
];
function scanDir(dir,odir) {
	fs.readdirSync(dir).forEach((file) => {
		console.log(path.join(dir,file))
		var absolute = path.join(dir,file);
		var normalized = absolute;
		var dirPaths = normalized.split("\\");
		//var odir = ".\\"+dirPaths.slice(1,dirPaths.length).join("\\");
		if (fs.statSync(absolute).isDirectory()) {
			if (!(blockedStuff.indexOf(file) > 1)) {
				try{fs.mkdirSync(path.join("web_dist",absolute));}catch(e){}
				assetsFile.directories.push(odir);
				scanDir(absolute);
			}
		} else {
			if (!(blockedStuff.indexOf(file) > 1)) {
				if (false) {
					fs.writeFileSync(
					path.join("web_dist",absolute),
					`eval(atob("${fs.readFileSync(absolute,{encoding:"Base64"})}"));`
					,{encoding:"UTF-8"})
				} else {
					fs.writeFileSync(
					path.join("web_dist",absolute),
					fs.readFileSync(absolute,{encoding:"Base64"})
					,{encoding:"Base64"})
				}
				assetsFile.files[parsePath(absolute)] = fs.readFileSync(absolute,{encoding:"Base64"});
			}
		}
	});
}
scanDir("./")
fs.rmSync("./web_dist/assets",{recursive: true, force: true});
fs.rmSync("./web_dist/package.json");
fs.rmSync("./web_dist/package-lock.json");
fs.rmSync("./web_dist/main.js");
fs.rmSync("./web_dist/preloader.js");
fs.rmSync("./web_dist/index.html");
fs.writeFileSync("./web_dist/data.dat","window.data = "+JSON.stringify(assetsFile,null,"\t")+";");