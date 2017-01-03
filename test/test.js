var RG = require('rg_motifs_kmer');
var assert = require('assert');

var motifs = [];

var file = './test/teszt.xml';

var dummyEncoder = function(motif) {
	return motif;
}

describe('RG', function() {
	describe('.process', () => {
		it('sould read without error', (done) => {
			function onData(motif) {
				motifs.push(motif);
			}

			 function onERR(e) {
				console.log("error: " + e);
			 }
			RG.process(file, dummyEncoder).on('error', onERR).on('data', onData).on('end', done);
		});
		it('should look like a valid output', () => {
			assert.notStrictEqual(motifs, validData);
		})
	})
});

var validData = [ 
  { '$name': 'entry',
    motif: [ 'ATCTGAACCTTT' ],
    label: 'teszt',
    color: '1327112',
    binary: [ 'ATCTGAACCTTT' ] },
  { '$name': 'entry',
    motif: [ 'CCATTCATTGGTTGCTAGCAAATTTGTTTAGAAATGGAA' ],
    label: 'teszt2',
    color: '1327112',
    binary: [ 'CCATTCATTGGTTGCTAGCAAATTTGTTTAGAAATGGAA' ] },
  { '$name': 'entry',
    motif: [ ' GCGTGTAAAGTAAATTTACAAC', ' ACGTGTAAAGTAAATTTACAAC' ],
    label: '23BPZM27KDAZEIN',
    color: '4165633',
    binary: [ ' GCGTGTAAAGTAAATTTACAAC', ' ACGTGTAAAGTAAATTTACAAC' ] },
  { '$name': 'entry',
    motif: 
     [ 'TCCGCCACTTGTATTCGTTGCGTTGAA',
       'TCCGCCTCTTGTATTCGTTGCGTTGAA',
       'TCCGCCACTTGTATTCGTTGCGTTGCA',
       'TCCGCCTCTTGTATTCGTTGCGTTGCA' ],
    label: '27BPDRCONSENSUSPS25S',
    color: '1327112',
    binary: 
     [ 'TCCGCCACTTGTATTCGTTGCGTTGAA',
       'TCCGCCTCTTGTATTCGTTGCGTTGAA',
       'TCCGCCACTTGTATTCGTTGCGTTGCA',
       'TCCGCCTCTTGTATTCGTTGCGTTGCA' ] } ];