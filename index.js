'use strict';

var mobxInferno;
var mobxReact;

try {
    mobxInferno = require('mobx-inferno');
} catch(e) {}

try {
    mobxReact = require('mobx-react');
} catch(e) {}


if (mobxInferno && mobxReact) {
    throw new Error('It looks like you are using both Inferno and React. This can lead to unexpected behavior.\n' +
    'Perhaps you can fix this by aliasing in your webpack/browserify configuration.')
}

if (!mobxInferno && !mobxReact) {
    throw new Error('You need to have either `mobx-react` or `mobx-inferno` installed.\n' +
    'Example: npm install mobx-react --save')
}

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = require('./src/connect')(mobxInferno || mobxReact);
module.exports = exports['default'];
