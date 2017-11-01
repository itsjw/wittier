'use strict';

const chalk = require('chalk');
const wt = require('wt-cli');
const prompt = require('inquirer');
const printProfile = require('../node_modules/wt-cli/lib/printProfile');

module.exports = function(program) {
  program
    .command('profile <command> [profileName]')
    .description('Quickly list or configure container Webtask profiles')
    .option('-m, --migrate [oldprofile]', 'Migrate from this profile to a new profile ' + chalk.red.bold('THIS REMOVES THE OLD PROFILE!'))
    .option('-t --show-token', 'Show the Webtask token when listing all profiles')
    .option('-d --show-default', 'Show the default Webtask profile as well')
    .action(async function (cmd, p) {
      /**
       * TODO: delve deeper into wt-cli API!
       */

      // Initialize here, use later.
      const c = cmd.toLowerCase();
      const init = chalk.bold('\nWittier profile management\n');

      if (c === 'a' || c === 'add'){

        console.log(init);

        if (typeof p !== 'string') {
          /**
           * TODO: prompt for profile name.
           */
          const r = await prompt.prompt([{
            type: 'input',
            name: 'profileName',
            message: 'Please give your new profile a name:'
          }]);

          p = r.profileName;

        }

        if (program.commands[0].migrate) {

          // Store in oldProfile for quick usage.
          const oldProfile = program.commands[0].migrate === true ? 'default' : program.commands[0].migrate;

          // Check if they be trolling.
          if (oldProfile !== p) {

            // CLI spinner voodoo
            console.log('Migrating from ' + chalk.blue.bold(oldProfile) + ' to ' + chalk.blue.bold(p) + '.\n' + chalk.red.bold('this will delete ' + oldProfile + '!'));

            /**
             * TODO: first migration use case = default. Access wt-cli api for default profile and save to a new profile with name newprofile.
             * TODO: migrations for oldprofile -> newprofile
             */
            console.log('');
            process.exit();
          } else {

            // Let the user know he's essentially asking wittier to do nothing.
            console.log(chalk.red.bold(`Can't migrate from and to the same profile!\n`));

            process.exit();
          }
        }

        // Let's manage some profiles then!
        /**
         * TODO: Prompt for url, container and token and configure as profile, wrap as wittier profile add <newprofile>
         */

        process.exit();

      } else if (c === 'l' || c === 'ls' || c === 'list'){
        /**
         * Note: this is a function created for completionist's sake.
         * If you're working with wittier to manage your profiles, it means you want a promptful approach to configuring Webtask profiles.
         * Thus, why not offer an ls command to list all existing profiles in your wt config file?
         *
         * Part of our opinionated cli this the abandon of default profiles for a structure similar to folders.
         * This is why default does NOT get printed by default.
         */

        console.log(chalk.bold('\nWittier: listing all wt-cli profiles:\n'));

        // Get profile list
        const cf = await wt.configFile().load();
        const keys = Object.keys(cf);

        if (keys.length > 0){
          keys.forEach(key => {
            if (key !== 'default' || (key === 'default' && program.commands[0].showDefault)){

              // Set profile name
              cf[key].name = key;

              // Print profile
              printProfile(cf[key], program.commands[0].showToken ? { token: true } : {} );

              // Spacing
              console.log('');
            }
          });

        } else console.log(chalk.red('No profiles found.'));

        process.exit();
      }
    });
};

