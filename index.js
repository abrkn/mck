var assert = require('assert')

module.exports = exports = function(target, name, fake) {
    assert(target, 'target is null')
    var real = target[name]
    , wrapper = function() {
        wrapper.invokes++
        return fake ? fake.apply(this, arguments) : null
    }

    wrapper.real = real
    wrapper.invokes = 0
    wrapper.restore = function() {
        target[name] = real;
        delete wrapper.restore;
        delete wrapper.real
    }

    target[name] = wrapper
    return wrapper
}

exports.once = function(target, name, fake) {
    var wrapper = exports(target, name, function() {
        var result = fake ? fake.apply(this, arguments) : null
        wrapper.restore()
        return result
    })
    return wrapper
}
