'use strict';

var mobxConnect;
var mobxInferno;
var mobxReact;

try {
    mobxInferno = require('mobx-inferno');
    mobxConnect = require('./src/connect')(mobxInferno);
} catch(e) {}

try {
    mobxReact = require('mobx-react');
    mobxConnect = require('./src/connect')(mobxReact);
} catch(e) {}

if (mobxInferno && mobxReact)
    throw new Error('It looks like you are using both Inferno and React. This can lead to unexpected behavior.\n' +
    'Perhaps you can fix this by aliasing in your webpack/browserify configuration.')

module.exports = mobxConnect;
