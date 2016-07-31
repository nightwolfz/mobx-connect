'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var mobxConnect;
var mobxInferno;
var mobxReact;

try {
    mobxInferno = require('mobx-inferno');
    exports.default = require('./src/connect')(mobxInferno);
} catch(e) {}

try {
    mobxReact = require('mobx-react');
    exports.default = require('./src/connect')(mobxReact);

} catch(e) {
    console.error('WARNING:',
    'You need to have either `mobx-react` or `mobx-inferno` installed.\n',
    'Example: npm install mobx-react --save')
}

if (mobxInferno && mobxReact) {
    console.error('WARNING:',
    'It looks like you are using both Inferno and React. This can lead to unexpected behavior.\n',
    'Perhaps you can fix this by aliasing in your webpack/browserify configuration.')
}

module.exports = exports['default'];
