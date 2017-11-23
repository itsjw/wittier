const chalk = require('chalk');
const { exec } = require('child_process');
const fs = require('fs');

function initFile(file) {
  return new Promise ((resolve) => {
    fs.readFile(file, (err, data) => {
      if (err) resolve(undefined);
      resolve(JSON.parse(data));
    });
  });
}

function globalSecrets(secrets) {
  let secretString = '';
  const secretNames = Object.keys(secrets);
  secretNames.forEach(secret => {
    secretString += `--secret ${secret}=${secrets[secret]} `;
  });
  return secretString;
}

async function create(webtasksToCreate, path, project, wt, globalSecrets, file) {
  await webtasksToCreate.forEach((w) => {
    // Spawn child process
    exec(`wt create ${path}/${w}/${w}.js -n ${project}-${w} ${globalSecrets}`, async (error, stdout, stderr) => {
      if (error) {
        console.log(chalk.red(stderr));
      } else {
        // Log
        console.log(chalk.blue(`*  ${project}-${w} [CREATED]`));
        // Write to file
        wt.webtasks[w].created = true;
        fs.writeFile(file, JSON.stringify(wt, null, 2), (err) => {
          if (err) console.log(err);
        });
      }
    });
  });
}

async function deploy(webtasksToDeploy, path, project) {
  await webtasksToDeploy.forEach((w) => {
    // Spawn child process
    exec(`wt update ${project}-${w} ${path}/${w}/${w}.js`, async (error, stdout, stderr) => {
      if (error) {
        console.log(chalk.red(stderr));
      } else {
        console.log(chalk.blue(`*  ${project}-${w} [DEPLOYED]`));
      }
    });
  });
}

module.exports = {
  initFile,
  globalSecrets,
  create,
  deploy
};
