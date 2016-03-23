'use strict';

var mobxReact = require('mobx-react');
var defaultContextTypes = {
    router: function() {},
    state: function() {},
    store: function() {},
    cache: function() {}
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

function composeWithContext(args, makeObservable) {
    if (args && args.length) {

        // @connect / The first argument is the component.
        if (typeof args[0] === 'function') {
            args[0].contextTypes = defaultContextTypes;
            return makeObservable ? mobxReact.observer(args[0]) : args[0]
        }

        // @connect('store', 'state', ''...) / Custom context
        return function(component) {
            component.contextTypes = createContextTypes(args);
            return makeObservable ? mobxReact.observer(component) : component
        }

    } else {

        // @connect() / Use default context
        return function(component) {
            component.contextTypes = defaultContextTypes;
            return makeObservable ? mobxReact.observer(component) : component
        }
    }
}

/**
 * Decorate components with context and observable
 * @param args {Component|...String}
 * @returns {Function|Class}
 */
function connect() {
    return composeWithContext(Array.prototype.slice.call(arguments), true)
}

/**
 * Grant components access to store and state without making observable
 * @param args {Component|...String}
 * @returns {Component|Object}
 */
function provide() {
    return composeWithContext(Array.prototype.slice.call(arguments), false)
}

exports.connect = connect;
exports.provide = provide;
exports.contextTypes = defaultContextTypes;
