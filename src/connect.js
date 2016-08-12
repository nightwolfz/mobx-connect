'use strict';

var mobxBinding;
var defaultContextTypes = {
    router: function() {},
    state: function() {},
    store: function() {}
}

module.exports = function(bindings) {
    mobxBinding = bindings;

    return {
        connect: connect,
        provide: provide,
        observer: mobxBinding.observer,
        contextTypes: defaultContextTypes
    }
}


/**
 * Create contextTypes object from an array of strings.
 * @param ctxTypes {Array}
 * @returns {Object}
 */
function createContextTypes(ctxTypes) {
    return ctxTypes.reduce(function(obj, ctxItem) {
        obj[ctxItem] = function() {}
        return obj
    }, {});
}

function composeWithContext(args) {
    if (args && args.length) {

        // @connect / The first argument is the component.
        if (typeof args[0] === 'function') {
            args[0].contextTypes = defaultContextTypes;
            return mobxBinding.observer(args[0])
        }

        // @connect('store', 'state', ''...) / Custom context
        return function(component) {
            component.contextTypes = createContextTypes(args);
            return mobxBinding.observer(component)
        }

    } else {

        // @connect() / Use default context
        return function(component) {
            component.contextTypes = defaultContextTypes;
            return mobxBinding.observer(component)
        }
    }
}

/**
 * Decorate components with context and observable
 * @param args {Component|...String}
 * @returns {Function|Class}
 */
function connect() {
    return composeWithContext(Array.prototype.slice.call(arguments))
}

/**
 * Grant components access to store and state without making observable
 * @param args {Component|...String}
 * @returns {Component|Object}
 */
function provide() {
    if (console) console.warn('@provide is now deprecated. Use @connect instead');
    return composeWithContext(Array.prototype.slice.call(arguments))
}
