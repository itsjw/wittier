'use strict';

const program = require('commander');
const pj = require('./package.json');

program.version(pj.version);

var client = { cli: program };
require('./commands')(client);

module.exports = client;
