'use strict';

var mobxReact = require('mobx-react');

if (!mobxReact) throw new Error('mobx-connect requires mobx-react to be installed');

var mobxConnect = require('./src/connect')(mobxReact);

module.exports = mobxConnect;
