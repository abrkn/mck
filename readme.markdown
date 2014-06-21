mck
===

Basic mocking library.

[![Build Status](https://travis-ci.org/abrkn/mck.png)](https://travis-ci.org/abrkn/mck)

Installation
---

`npm install mck`

Dependencies
---

None

Usage
---

```javascript
var mock = require('mck')

mock.once(console, 'log', function(msg) {
	process.stdout.write('hello ')
})
console.log('goodbye')
console.log('world')

// hello world
```

```javascript
var mock = require('mck')

var sqrt = mock(Math, 'sqrt', function() {
	return 42
})

console.log(Math.sqrt(42))

// The real Math.sqrt
console.log(typeof sqrt.real)
// function

console.log(sqrt.invokes)
// 1

sqrt.restore()

console.log(Math.sqrt(1764))
// 42
```

Author
---

Andreas Brekken &lt;a@abrkn.com&gt;

Alternatives
---

- [SinonJS](http://sinonjs.org/)

License
---

MIT
