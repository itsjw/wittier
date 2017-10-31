#!/usr/bin/env node
'use strict';

const client = require('..');
let wittier;

wittier = client.cli.parse(process.argv);
