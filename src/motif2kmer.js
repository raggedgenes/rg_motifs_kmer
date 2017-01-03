;(function() {
	'use strict'
	var fs = require('fs'),
		events = require('events'),
		flow = require('xml-flow');
	var rg = new events.EventEmitter();
	rg.test = function (tosay) {
			console.log(tosay);
		}
	rg.process = function(mfile, encoderFunction) {
		var inFile = fs.createReadStream(mfile);
		var xmlStream = flow(inFile);
		var motifs = new Array();
		xmlStream
		.on('error', (err) => {rg.emit('error', err)})
		.on('tag:entry', function(entry) {
			entry.motif = transformRegExp(entry.motif);
			entry.binary = ((marray) => {
				var m = 0;
				var ret = new Array(marray.length);
				while (marray[m]) {
					ret[m] = encoderFunction(marray[m]);
					m++;
				}
				return ret;
			})(entry.motif);
			motifs.push(entry);
			rg.emit('data', entry);
		})
		.on('end', () => {
			rg.emit('end');
		});
		return this;
	}
		
	function transformRegExp(regex) {
		var ret = [" "]; //javítani kell, ha ez a kezdeti space zavaró lenne
		var arr = regex.split("|");
		var t = 0;
		var tmp;
		var branch = false;
		var currindex = 0;
		arr.forEach((regex) => {
			while(regex[t]) {
				switch (regex[t]) {
					case '[': branch = true; tmp = ret; ret = []; break;
					case ']': branch = false; break;
					default: {
						var z = 0;
						if (branch) {
							var l;
							while(tmp[z]) { 
								ret.push(tmp[z] + regex[t]);
								z++;
							}
						} else {
							while (ret[z]) { 
								(ret[z] == " ") ? ret[z] = regex[t] : ret[z] += regex[t];
								z++;
							}
						}
					};
					break;
				}
				t++;
			}
		})
		return ret;
	}
	
	module.exports = rg;

}).call(this)