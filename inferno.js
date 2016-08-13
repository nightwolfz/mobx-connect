'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

try {
    var mobxBinding = require('mobx-inferno');
    var mobxConnect = require('./src/connect')(mobxBinding);
} catch(e) {
    console.error(e.toString())
    console.error('WARNING: You need to have `mobx-inferno` installed.\n',
    'Example: npm install mobx-inferno --save')
}

exports.default = mobxConnect;
module.exports = exports['default'];
