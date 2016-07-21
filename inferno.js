'use strict';

var mobxInferno = require('mobx-inferno');

if (!mobxInferno) throw new Error('mobx-connect/inferno requires mobx-inferno to be installed');

var mobxConnect = require('./src/connect')(mobxInferno);

module.exports = mobxConnect;
