'use strict';

var mobxConnect;

try {
    var mobxReact = require('mobx-react');
    mobxConnect = require('./src/connect')(mobxReact);
} catch(e) {
    var mobxInferno = require('mobx-inferno');
    mobxConnect = require('./src/connect')(mobxInferno);
}

module.exports = mobxConnect;
