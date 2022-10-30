/* var debugDiv = document.createElement("div");

debugDiv.innerHTML = `
<div style="position:fixed;bottom:0;left:0;background:grey;width:200px;height:400px;">
<h1>Debug</h1>
<textarea id="logs" disabled style="resize:none;width:95%;height:50%;">
Logs Go Here
</textarea>
<input type="text"  style="resize:none;width:95%;height:20px;" id="runcmd">
</div>`;
document.body.appendChild(debugDiv);
var runcmd = document.getElementById("runcmd");
var logs = document.getElementById("logs");
window.logConsole = function (a) {
	logs.value += "\n"+a;
};
function runConsole(a) {
	try{
		eval(a);
	}catch(e){logs.value += "\n"+e;}
}
runcmd.onkeypress = function (e) {
	if (e.key == "Enter") {
		runConsole(runcmd.value)
		runcmd.value = "";
	}
} */