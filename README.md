# rg_motifs_kmer
RG's utility for motif search.

Example usage:

var mot2kmer = require('rg_motifs_kmer');
var file = "./test/teszt.xml";

var motifs = [];

// Needed if motif needs to be encoded. This is only a dummy method. BinaryEncoder shold be used.
var dummyEncoder = function(motif) {
	return motif;
}
function onData(motif) {
	motifs.push(motif);
	console.log(motif.label);
}

mot2kmer.process(file, dummyEncoder).on('error', onERR).on('data', onData).on('end', done);

 function done(){
	console.log('done');
 }
 function onERR(e) {
	console.log("error: " + e);
 }
