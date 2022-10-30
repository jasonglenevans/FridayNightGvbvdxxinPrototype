//require modules.
var electron = require("electron"); //main module - does all the work for running the desktop app, WE NEED THIS!
var app = electron.app; //tell when its ready - if we run it as soon as it runs the code, it will throw an error.
var Menu = electron.Menu; //to remove the electron template menu.
var BrowserWindow = electron.BrowserWindow //to do all the window, and loading the game maker.

//remove the menu options
Menu.setApplicationMenu(Menu.buildFromTemplate([]));

//make window when ready
function makePlainWindow() {
	var window = new BrowserWindow({
		title:"Gvbvdxx Game Engine",
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		},
		width:1000,
		height:500
	});
	//load the page.
	window.loadFile("./index.html");
	//enable the contents to be able to do desktop stuff
	window.openDevTools();
}
//run as soon as the app is ready to load the window.
app.on('ready',makePlainWindow);