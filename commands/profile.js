'use strict';

const chalk = require('chalk');
const ora = require('ora');
const wt = require('wt-cli');
const fs = require('fs');

module.exports = function(program) {
  program
    .command('profile <command> <newprofile>')
    .description('testing the description')
    .option('-m, --migrate <oldprofile>', 'The user to authenticate as')
    .option('-l, --list', 'List profiles')
    .action(function (cmd) {
      console.log(arguments);

      // Initialize here, use later.
      const init = chalk.blue.bold('Wittier profile management');

      // It's redundant, but store in newProfile for logic's sake.
      const newProfile = cmd;

      if (program.commands[0].migrate) {

        // Store in oldProfile for quick usage.
        const oldProfile = program.commands[0].migrate;

        // Check if they be trolling.
        if (oldProfile !== newProfile) {
          console.log(init);
          const spinner = ora().clear();
          spinner.color = 'blue';
          spinner.text = 'Migrating from ' + chalk.blue.bold(oldProfile) + ' to ' + chalk.blue.bold(cmd) + '\n';
          spinner.start();

          /**
           * TODO: first migration use case = default. Access wt-cli api for default profile and save to a new profile with name newprofile.
           * TODO: migrations for oldprofile -> newprofile
           */
          process.exit();
        } else {

          // Let the user know he's essentially asking wittier to do nothing.
          console.log(chalk.red.bold("Can't migrate from and to the same profile!"));

          process.exit();
        }
      }

      // Let's manage some profiles
      console.log(init);
      /**
       * TODO: Prompt for url, container and token and configure as profile, wrap as wittier profile add <newprofile>
       */

      /**
       * TODO: Wrap into wittier profile ls
       */
      const configPath = wt.configFile().configPath;
      var cf = JSON.parse(fs.readFileSync(configPath));

      process.exit();
    });
};

