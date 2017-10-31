'use strict';

const chalk = require('chalk');
const ora = require('ora');
const wt = require('wt-cli');
const fs = require('fs');

module.exports = function(program) {
  program
    .command('profile <command>')
    .description('Quickly list or configure container Webtask profiles')
    .option('-m, --migrate <oldprofile>', 'Migrate from this profile to a new profile ' + chalk.red.bold('THIS REMOVES THE OLD PROFILE!'))
    .option('-t --show-token', 'Show the Webtask token when listing all profiles')
    .option('-d --show-default', 'Show the default Webtask profile as well')
    .action(function (cmd, p) {

      // Initialize here, use later.
      const c = cmd.toLowerCase();
      const init = chalk.blue.bold('Wittier profile management');

      if (c === 'add'){
        if (program.commands[0].migrate) {

          // Store in oldProfile for quick usage.
          const oldProfile = program.commands[0].migrate;

          // Check if they be trolling.
          if (oldProfile !== p) {

            // CLI spinner voodoo
            console.log(init);
            const spinner = ora().clear();
            spinner.color = 'blue';
            spinner.text = 'Migrating from ' + chalk.blue.bold(oldProfile) + ' to ' + chalk.blue.bold(p) + '\n';
            spinner.start();

            /**
             * TODO: first migration use case = default. Access wt-cli api for default profile and save to a new profile with name newprofile.
             * TODO: migrations for oldprofile -> newprofile
             */

            process.exit();
          } else {

            // Let the user know he's essentially asking wittier to do nothing.
            console.log(chalk.red.bold(`Can't migrate from and to the same profile!`));

            process.exit();
          }
        }

        // Let's manage some profiles then!
        console.log(init);
        /**
         * TODO: Prompt for url, container and token and configure as profile, wrap as wittier profile add <newprofile>
         */

        process.exit();

      } else if (c === 'ls' || c === 'list'){
        /**
         * Note: this is a function created for completionist's sake.
         * If you're working with wittier to manage your profiles, it means you want a promptful approach to configuring Webtask profiles.
         * Thus, why not offer an ls command to list all existing profiles in your wt config file?
         * This did mean, however, that we needed to access said file instead of just piping `wt profile ls (--show-token)`
         * since it renders a non-coloured output.
         *
         * Part of our opinionated cli this the abandon of default profiles for a structure similar to folders.
         * This is why default does NOT get printed by default.
         */

        /*const { exec } = require('child_process');
        if (program.commands[0].showToken){
          exec('wt profile ls --show-token', (error, stdout) => {

            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }

            console.log(`${stdout}`);
          });
        } else {

          exec('wt profile ls', (error, stdout) => {

            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }

            console.log(`${stdout}`);
          });
        }*/

        console.log(chalk.bold('Listing all wt-cli profiles:'));

        const configPath = wt.configFile().configPath;
        const cf = JSON.parse(fs.readFileSync(configPath));
        const keys = Object.keys(cf);
        if (keys.length > 0){
          keys.forEach(key => {
            if (key !== 'default'){
              console.log(chalk.blue('Profile:      ') + chalk.green(key));
              console.log(chalk.blue('URL:          ') + cf[key].url);
              console.log(chalk.blue('Container:    ') + cf[key].container);
              console.log(program.commands[0].showToken ? chalk.blue('Token:        ') + cf[key].token + '\n' : '');
            }
          });
        }

        process.exit();
      }
    });
};

