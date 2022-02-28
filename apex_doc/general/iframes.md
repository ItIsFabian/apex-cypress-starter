## Iframes
> Useful Links:
>- https://www.cypress.io/blog/2020/02/12/working-with-iframes-in-cypress/
### What Cypress offers

Nothing. Cypress does not support natively. But a custom command can be added inside `support/index.js` that makes working with iframes possible:
```js
Cypress.Commands.add('getIframe', () => {
    // get the iframe > document > body
    // and retry until the body element is not empty
    return cy
    .get('div[role=dialog] iframe', { log: false })
    .its('0.contentDocument.body', { log: false }).should('not.be.empty')
    // wraps "body" DOM element to allow
    // chaining more Cypress commands, like ".find(...)"
    // https://on.cypress.io/wrap
    .then(cy.wrap, { log: false })
  })
```
Usage:
```js
cy.getIframe().find("#submit_bttn").click()
```
For working with cross-domain iframes, chrome websecurity has to be disabled in the `cypress.json`:
```json
{
  "chromeWebSecurity": false
}
```
There is also a Plugin designed specifically for iframes in cypress: https://www.npmjs.com/package/cypress-iframe
It offers the benefit of being able to work with multiple iframes, for our use case the added command should suffice however. 

---
 ### APEX specifics
 The solution with the custom command works also with iframes used in an APEX context.

---
 ### Impact on existing LCT Code 

 In codeceptjs, using `I.switchContex('iframe')` will cause the following steps to be interpreted as belonging to the iframe context. With cypress, we need to define for every step in which context it should be evaluated. I suggest:
 - A JSON attribute `inIframe` that can be set in the UI when adding a step through a Switch-Button.
 - Each action helper needs to generate `.getIframeBody()` before the desired action 
 - Step generation needs to be modified for almost all helpers
 - Wizards for "Login" and "fillForm" need to be modified (UI and usage of new Step-JSON parameter)
 - All PL/SQL Step JSON generator packages have to be modified 
 - Page APIs for Pages that add steps need to be modified.
