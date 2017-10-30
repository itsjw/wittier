#!/usr/bin/env node
'use strict';

const program = require('commander');
const pj = require('./package.json');
const chalk = require('chalk');

program.version(pj.version);

program
  .command('profile')
  .description('testing the description')
  .option('-m, --migrate <oldprofile>', 'The user to authenticate as')
  .action(function(cmd){
    console.log(program);
    console.log("new profile: %s", cmd);
  });
program
  .command('brofile')
  .description('testing the description')
  .option('-m, --migrate <oldprofile>', 'The user to authenticate as')
  .action(function(cmd){
    console.log("new profile: %s", cmd);
  });

program.parse(process.argv);
