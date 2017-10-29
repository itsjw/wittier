# Wittier
Wittier is: *Profile and Configuration management for Auth0 Webtask and Extend*

## The wittier manifesto
The **goal** is to create a workflow that allows you to quickly work with Auth0 Webtask/Extend.  
This is, firstly, achieved by defaulting to the adoption of profiles.
Wittier will treat these profiles as root folders for the webtasks, essentially creating a folder structure.

To simplify the difference between Webtask and a user's webtasks, we will define  
**Webtask** as the platform and  
**functions** as the individual webtasks a user will create.  
A **service** is a collection of functions that are combined into a, *you guessed it*, service.  
(CRUD operations, endpoints of a collective backend, ...)

Wittier does not replace `wt-cli` but serves as a user-friendly wrapper.  
In the end, we want to be able to:
* Quickly configure container profiles from Extend 
`wittier profile`
* Migrate default profiles from Webtask to their own dedicated 
`wittier migrate`
* List existing webtasks, all or profile specific, allowing them to be edited in the web editor. 
`wittier edit` / `wittier edit <profile>` / `wittier edit <profile>/<function>`
* Configure functions together into a service via a `wittier.yml` file  
and deploy/update all of them from the project folder via `wittier deploy`
* ... Let me think of other stuff to add :wink:

### wittier.yml
*A work in progress*

### Learning from serverless.com
*Another work in progress.*

### Nice to haves
* A browseable response by `wittier edit` (so we can choose via arrow keys + enter)
* Tab suggest/autocomplete of profiles or functions, coolest thing there is if you ask me