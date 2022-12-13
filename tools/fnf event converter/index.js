console.log(importEvents);

var json = null;
var res = [];
function load(jsn) {
	json = jsn;
	var events = json.song.events;
	res = [];
	//this looks like a bunch of mess, but in reality its easy to set up... at least for me.
	//this is to make it easier to understand for me.
	for (var event of events) {
		var eventTime = event[0];
		var ranEvents = [];
		for (var eventRan of event[1]) {
			ranEvents.push({
				type:eventRan[0],
				v1:eventRan[1],
				v2:eventRan[2]
			})
		}
		res.push({
			eventFireTime:eventTime,
			events:ranEvents
		});
	}
	//this stuff is to convert the events
	var text = "";
	var outJSON = {
		events:[
			
		]
	};
	for (var event of res) {
		outJSON.events.push(event);
		for (var e of event.events) {
			text += "\n"+`{${event.eventFireTime/1000}}: {${e.type}}: {${e.v1}}: {${e.v2}}`;
		}
	}
	out.value = text;
	outJSON.events.sort((a,b) => {return a.eventFireTime-b.eventFireTime});
	outJSONA.value = JSON.stringify(outJSON,null,"\t")
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