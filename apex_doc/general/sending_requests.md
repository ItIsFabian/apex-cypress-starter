## Sending Requests
> * Cypress Documentation Link: https://docs.cypress.io/api/commands/request
>* More Examples can be found in `cypress/integration/0.2-advanced-examples/network_requests.spec.js`
### What Cypress offers
Sending REST-Requets with Cypress is similar to the way our sendRestRequest-Helper works.
We allow the user to specify a request method, a target url, a request body. Whereas we support the 5 standard methods ( GET, POST, PUT, DELETE ), cypress offers a lot more:
* PATCH
* HEAD
* OPTIONS
* TRACE
* COPY
* LOCK
* MKCOL
* MOVE
* PURGE
* PROPFIND
* PROPPATCH
* UNLOCK
* REPORT
* MKACTIVITY
* CHECKOUT
* MERGE
* M-SEARCH
* NOTIFY
* SUBSCRIBE
* UNSUBSCRIBE
* SEARCH
* CONNECT

For us, I do not immediately see a use case for them but it would be nice to have them nevertheless.
Example requests:
```js
cy.request('https://jsonplaceholder.typicode.com/posts/1'); // Will by default make GET-Request to url
cy.request('POST', 'https://jsonplaceholder.typicode.com/posts', 
    {
    title: 'APEX and Cypress',
    body: '...work surprisingly well together',
    userId: 17,
    }
).then((response) => {
    expect(response.body).to.contain({
        title: 'APEX and Cypress'
    })
});// Make a POST Req and expect the response to have a certain property with a pecific value
```
We can also pass an __options__-Object Literal where the url, the body, headers, encoding etc can be specified:
```js
const options = {
    url: 'https://jsonplaceholder.typicode.com/posts'
    method: 'POST',
    headers: {'Content-type': 'application/json; charset=UTF-8'}
    body: {
        title: 'APEX and Cypress',
        body: '...work surprisingly well together',
        userId: 17,
    },
    log: true,
    encoding: 'utf8',
}
cy.request(req_obj).then((response) => {
    expect(response.body).to.contain({
        body: '...work surprisingly well together'
    })
});
```
More options can be found at: https://docs.cypress.io/api/commands/request#Arguments

---
 ### APEX specifics
 - None
---
 ### Impact on existing LCT Code 
 There should be almost no impact on existing LCT code for offering the same functionality as the sendRestRequest-Helper. To make it work, we could use the same parameters. 

 It might however be useful to support the various possibilities that the __options__-Object offers. So offering the possibility in the frontend to pass such an object or to create it in the background an pass values to the specific properties in the frontend makes sense. That would mean changes to the step creation UI and to the packages that create the corresponding JSON.

---
 ### REST Requests and authentication
 Sending REST-Requests via `cy.request()` and then working with the response is also the basis of logging in with authentication approaches that differ from the standard APEX Login, like __Single Sign On__.
 How this can be done is documented at:
 * https://docs.cypress.io/examples/examples/recipes#Logging-In
 * https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/logging-in__single-sign-on/cypress/integration/logging-in-single-sign-on-spec.js (Single Sign On)