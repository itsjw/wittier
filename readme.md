# Wittier
Wittier is: *Profile and Configuration management for Auth0 Webtask and Extend*

## The wittier manifesto
The **goal** is to create a workflow that allows you to quickly work with Auth0 Webtask/Extend.  
This is, firstly, achieved by defaulting to the adoption of profiles.
Wittier will treat these profiles as root folders for the webtasks, essentially creating a folder structure.

To simplify the difference between Webtask and a user's webtasks, we will define  
**Webtask** as the Webtask platform  
**functions** as the individual webtasks a user will create  
**service** as a collection of functions that are combined into a, *you guessed it*, service.  
(CRUD operations, endpoints of a collective backend, ...)

Wittier does not replace `wt-cli` but serves as a wrapper around the existing CLI and keeps using it in the background.  
In the end, we want to be able to
* quickly configure container profiles from Extend 
`wittier profile`
* migrate default profiles from Webtask to their own dedicated 
`wittier migrate`
* list existing webtasks, all or profile specific, allowing them to be edited in the web editor. 
`wittier edit` / `wittier edit <profile>` / `wittier edit <profile>/<function>`
* configure functions together into a service via `wittier.yml`
and deploy/update all of them from the project folder via `wittier deploy`
* ... let me think of other stuff to add :wink:

### Learning from serverless.com
Right off the bat, the biggest advantage of serverless is the integration of multiple FaaS providers into one platform.
It's an amazing abstraction of vendors if you're in need of one, but wittier is built to focus solely on Webtask.

The adoption of Webtask in the serverless platform is now taking its first steps, 
so I'm confident that documentation, examples and functionality will improve over time

Storing the configuration of functions and services in a `.yml` or `.json` file *vastly* improves
the serverless development experience by providing abstraction and structure.
The importance demonstrated by the serverless.com team is the reason why
wittier will use a configuration file as well in the form of `wittier.yml`.

### (Other) Must haves
* Quickly initialize new functions and services without a hitch
* Address child functions through Mustache or Handlebars, 
following the naming structure specified in `wittier.yml`
* Provide an abstraction in the cron scheduler similar to serverless.com

### Should haves
* A browseable response by `wittier edit` (so we can choose via arrow keys + enter)
* Determine whether node package management outside of package.json is necessary (possibly via `wittier.yml`)
* Provide deployment of subservices through defining master and child `wittier.yml` files per function

### Could haves
* Slack messaging syntax and formatting in templates

### Want to haves
* Tab suggest/autocomplete of profiles or functions, coolest thing there is if you ask me, but hard to implement

## wittier.yml
*A work in progress*

## Codesponsor
<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/SXH7ZmV8YYXzxLZF9dCVxN6W/jeroenptrs/wittier'>
  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/SXH7ZmV8YYXzxLZF9dCVxN6W/jeroenptrs/wittier.svg' />
</a>
