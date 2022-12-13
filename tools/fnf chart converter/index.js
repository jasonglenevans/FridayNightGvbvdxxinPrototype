console.log(importEvents);

var json = null;
var res = [];
var notes = [];
function load(jsn) {
	json = jsn;
	var sections = json.song.notes;
	res = [];
	notes = [];
	//this looks like a bunch of mess, but in reality its easy to set up... at least for me.
	//this is to make it easier to understand for me.
	console.log("load")
	
	for (var section of sections) {
		for (var note of section.sectionNotes) {
			notes.push({d:note,hit:section.mustHitSection});
		}
	}
	notes.sort((a,b) => a.d[0]-b.d[0])
	//this stuff is to convert the events
	var text = "";
	var simpleJSON = {
		song:{
			song:json.song.song,
			notes:[]
		},
		madeBy:"GvbvdxxChartConverter"
	};
	for (var note of notes) {
		var sorts = {
			"0,false":1,
			"1,false":2,
			"2,false":3,
			"3,false":4,
			"0,true":5,
			"1,true":6,
			"2,true":7,
			"3,true":8,
			"4,true":1,
			"5,true":2,
			"6,true":3,
			"7,true":4,
			"4,false":5,
			"5,false":6,
			"6,false":7,
			"7,false":8
		};
		var n = sorts[note.d[1]+","+note.hit];
		var custom = "";
		if (note.d[3]){
			custom = note.d[3];
		}
		simpleJSON.song.notes.push({
			time:note.d[0]/1000,
			mustHitSection:note.hit,
			custom:custom,
			note:n,
			holdLength:note.d[2]
		})
		text += "\n"+`{${note.d[0]/1000}}: {${n+1}}: {${custom}}: {${note.d[2]}}`;
	}
	out.value = text;
	simple.value = JSON.stringify(simpleJSON,null,"\t");
}
importEvents.onchange = function () {
	if (importEvents.files[0]) {
		var reader = new FileReader();
		reader.onload = function () {
			load(JSON.parse(reader.result));
		};
		reader.readAsText(importEvents.files[0]);
		importEvents.value = "";
	}
};