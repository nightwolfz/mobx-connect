'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

try {
    var mobxBinding = require('mobx-react');
    var mobxConnect = require('./src/connect')(mobxBinding);
} catch(e) {
    console.error(e.toString())
    console.error('WARNING: You need to have `mobx-react` installed.\n',
    'Example: npm install mobx-react --save\n',
    'If you are using Inferno, use `mobx-connect/inferno` instead')
}

exports.default = mobxConnect;
module.exports = exports['default'];
