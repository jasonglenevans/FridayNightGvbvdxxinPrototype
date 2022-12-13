var selectIMG = document.getElementById("selectIMG");
var selectXML = document.getElementById("selectXML");
var startRip = document.getElementById("startRip");
var imgFile = document.createElement("img");
var xmlFile = document.createElement("div");

function loadIMG() {
	var file = selectIMG.files[0];
	if (file) {
		var reader = new FileReader();
		reader.onload = function () {
			imgFile.src = reader.result;
		};
		reader.readAsDataURL(file);
	}
}
function loadXML() {
	var file = selectXML.files[0];
	if (file) {
		var reader = new FileReader();
		reader.onload = function () {
			xmlFile.innerHTML = reader.result;
		};
		reader.readAsText(file);
	}
}

selectIMG.onchange = loadIMG;
selectXML.onchange = loadXML;

function splitImgs(img,xmlDiv) {
	var cvs1 = document.createElement("canvas");
	var ctx = cvs1.getContext("2d");
	//document.body.appendChild(cvs1);
	var outJSON = {}
	var result = [];
	function scan(thingy) {
		var i = 0;
		var items = thingy.children;
		for (var i in items) {
			var item = items[i];
			if (item) {
				try{
				if (item.getAttribute("name")) {
					var dataURL = "";
					var dataInfo = {
						name:item.getAttribute("name"),
						width:Number(item.getAttribute("width")),
						height:Number(item.getAttribute("height")),
						x:Number(item.getAttribute("x")),
						y:Number(item.getAttribute("y"))
					};
					cvs1.width = Number(item.getAttribute("width"));
					cvs1.height = Number(item.getAttribute("height"));
					ctx.clearRect(0, 0, cvs1.width, cvs1.height);
					outJSON[dataInfo.name] = {name:dataInfo.name,width:dataInfo.width,height:dataInfo.height,x:dataInfo.x,y:dataInfo.y};
					ctx.drawImage(img,dataInfo.x,dataInfo.y,dataInfo.width,dataInfo.height,0,0,dataInfo.width,dataInfo.height);
					dataURL = cvs1.toDataURL();
					result.push({
						name:dataInfo.name,
						dataURL:dataURL,
						width:dataInfo.width,
						height:dataInfo.height,
						x:dataInfo.x,
						y:dataInfo.y
					})
					scan(item);
				} else {
					scan(item)
				}
				}catch(e){console.log("found error: "+e)}
			} else {
				console.log("Ripper found undefined object")
			}
		}
	}
	scan(xmlDiv);
	document.getElementById("outJSON").value = JSON.stringify(outJSON,null,"\t");
	return result;
}
function dataURLBase64(dataURL) {
	return dataURL.split(",").pop();
}
var zip = null;
var imgFolder = null;
startRip.onclick = function () {
	var a = splitImgs(imgFile,xmlFile);
	zip = new JSZip();
	zip.file("README.txt", "This Was Ripped By Gvbvdxx's FNF Ripper");
	imgFolder = zip.folder("images");
	for (var i in a) {
		imgFolder.file(a[i].name+".png", dataURLBase64(a[i].dataURL), {base64: true});
	}
	zip.generateAsync({type:"blob"})
	.then(function(content) {
		var a = document.createElement("a");
		a.download = "Ripped Character.zip";
		a.href = URL.createObjectURL(content);
		a.click();
	});
};

//chart maker


var chartjsonFile = null;

var chartSelect = document.getElementById("selectChart");
var convertedChart = document.getElementById("convertedChart");
var chartMap = {
	"n0":1,
	"n1":2,
	"n2":3,
	"n3":4,
	"n4":5,
	"n5":6,
	"n6":7,
	"n8":8,
	"n9":9
};
function makeSSSChartStamp(time,noteid,type,holdnotelength) {
	convertedChart.innerHTML += `{${time}}: {${noteid}}: {${type}}: {${holdnotelength}}`+"<BR>";
	return `{${time}}: {${noteid}}: {${type}}: {${holdnotelength}}`;
}
function loadChart(json) {
	convertedChart.innerHTML = "";
	console.log(json);
	//i was going to do hole charts, but its very hard
/* 	for (var i in json.song.notes) {
		var data = json.song.notes[i];
		console.log(data);
		//fun fact: time in fnf is the same as scratch but its devided by 1000, cool ya know, so its very easy to make this part.
		for (var iNote in data.sectionNotes) {
			try{
				var note = data.sectionNotes[iNote];
				if (data.mustHitSection) {
					var noteId = note[1]+5;
				} else {
					var noteId = note[1]+1;
				}
				makeSSSChartStamp(note[0]/1000,chartMap["n"+note[1]],"",note[2]);
			}catch(e){console.log("catched error",e)}
		}
	} */
}
chartSelect.onchange = function () {
	var file = chartSelect.files[0];
	if (file) {
		var reader = new FileReader();
		reader.onload = function () {
			try{
				chartjsonFile = JSON.parse(reader.result);
				loadChart(chartjsonFile);
			}catch(e){window.alert(":\\ hmm... it cannot be loaded for some reason... is it corrupt?")}
		};
		reader.readAsText(file);
	}
};