# Wittier
Wittier is a configuration and deploy tool for Auth0's Webtasks.

This serves in no way as a replacement for Serverless, 
but as a lightweight alternative that's dedicated to quickly deploying webtasks.

## Installation
`npm install wittier --save-dev` or `yarn add wittier -D`

Add this as a deploy script in your `package.json`, for example alongside nodemon to listen for changes:
``` json
{
  "wt": "wittier",
  "wt-listen": "nodemon --watch src -x \"wittier\""
}
```

Wittier will look for a `wittier.json` file that will hold the configuration for your deployments.

## wittier.json
The `wittier.json` is the full overview of your project.
It lists all webtasks needed to run your program and creates/updates them.

You can use the following example as a template when creating your `wittier.json` file.
```json
{
  "project": "projectName",
  "entry": "src",
  "webtasks": {
    "webtaskName": {
      "active": true,
      "created": true
    },
    ...
  },
  "secrets": {
    "secretName": "secretValue",
    ...
  }
}
```
### project
Since your webtask container is able to hold a large amount of webtasks,
splitting them in projects is a quick way to distinguish whether webtasks belong with eachother.

Webtasks will be prefixed with the project's name (in the case of our example, that's projectName-webtaskName).

### entry
Entry determines the folder where wittier will look for your webtasks.

### webtasks
The webtasks object is where all webtasks are stored.

`active` determines whether wittier will deploy them ("active": true) or not ("active": false).  
When wittier is initialized, it will list all active webtasks that will be created or updated.  
This has to be manually updated for now.

`created` determines whether wittier will invoke wt create ("created": false) or wt update ("created": true).  
Wittier will update this automatically, but right now you need to initialize it manually.

**REMEMBER: initialize your webtasks as "created": false**

### secrets
You can define global secrets that will be added to the creation of your webtasks.  
Wittier will call wt-cli when creating a webtask along with `--secret secretName=secretValue ` per secret.

## TODO's for v0.2.0
* Stop addressing updates as `deployed` but as `updated`
* Natively access the wt-cli instead of via child_process
* Access folder structure based on service/microservice name,
and name seperate sub-functions as different files  
(webtaskTest/index.js will be created as webtaskTest, webtaskTest/child.js as webtaskTest-child)
* Address sibling webtasks in a file via templating structure (f.e. mustache) that renames to the full webtask url on creation/deploy.
* Allow for webtask specific secrets.

## TODO's for v0.3.0
* Convert wittier to a cli that can parse commands
* CLI commands to activate/deactivate webtasks.  
`ACTIVE` = active,  
`IDLE` = created but not redeploying,  
`INACTIVE` = deleted.
* CLI command to initialize a wittier project.

## Codesponsor

