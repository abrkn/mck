/* global describe, it */
var expect = require('expect.js')
, mock = require('./index')

describe('mock', function() {
	it('counts invokes', function() {
		var i = 0

		var log = mock(console, 'log', function(n) {
			expect(++i).to.be(n)
			return i
		})

		expect(console.log(1)).to.be(1)
		expect(console.log(2)).to.be(2)
		expect(console.log(3)).to.be(3)

		expect(log.invokes).to.be(3)

		log.restore()
	})

	it('should only increase invokes when condition is met', function() {
		var thrice = mock(Math, 'sqrt', function(n) {
			return n + 1;
		}, function(n) {
			return thrice.invokes < 3
		});

		expect(Math.sqrt(100)).to.be(101);
		expect(Math.sqrt(25)).to.be(26);
		expect(Math.sqrt(9)).to.be(10);

		expect(thrice.invokes).to.be(3);

		expect(Math.sqrt(100)).to.be(10);
		expect(Math.sqrt(25)).to.be(5);
		expect(Math.sqrt(9)).to.be(3);

		expect(thrice.invokes).to.be(3);

		thrice.restore();
	})
})

describe('restore', function() {
	it('resotres', function() {
		var sqrt = mock(Math, 'sqrt', function() {
			return 1
		})

		expect(Math.sqrt(25)).to.be(1)
		sqrt.restore()
		expect(Math.sqrt(25)).to.be(5)
	})
})

describe('once', function() {
	it('mocks only once', function() {
		mock.once(Math, 'sqrt', function() {
			return 1
		})

		expect(Math.sqrt(25)).to.be(1)
		expect(Math.sqrt(25)).to.be(5)
	})

})
