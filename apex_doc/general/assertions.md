## Assertions
> Cypress Documentation Link: 
>- Basics: https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Asserting-About-Elements
>- Advanced: https://docs.cypress.io/guides/references/assertions

### What Cypress offers
With assertions, it is possible to define a desired state for elements/requests in a given application.
Assertions are chained to the elements/requests obtained by `cy.get("#elem")`/`cy.request("/home")`:
```js 
cy.get("#elem").should("have.class", "active");
cy.request('/resetUsers').its('body').should('deep.eq', { functionResult: true });
```
Negative assertions are possible as well:
```js
 cy.get("#elem").should("not.have.class", "inactive");
```
Assertions are retried similarly to how `cy.get()` is retried. The timeout for assertions cannot be defined specifically but uses the same one that is defined for `cy.get()` or that was defined globally in `cypress.json`:
```js
cy.get("#elem", { timeout: 10000 }).should("have.class", "active"); // This timeout is applied to all chained assertions
```
Multiple Assertions can be applied to an element by using `.and()`:
```js
cy.get("#elem", { timeout: 10000 }).should("have.class", "active").and("contain", "Submit");
```
For a large number of assertions, it might be beneficial to use the following syntax:
```js
cy.get('#elem').should((elem) => {
  expect(elem).to.have.class('active')
  expect(elem).to.have.class('apex-ig-button')
  expect(elem).to.have.attr('data-action', 'save')
})
```
> Since `should()` will be retried, callback functions as in the previous example need to be retry-safe!
---
 ### APEX-Element specifics
 - None
---
 ### Impact on existing LCT Code
 In codecept, multiple different functions are exposed to make assertions on given elements (`I.seeAttributesOnElements()`, `I.seeTextEquals()` etc.), whereas cypress simply uses `.should()` and the desired assertion is passed in as parameter (`.should("have.class", "active")`). At the moment, except for `I.seeInCurrentUrl()` we do not have specific helpers for assertions.

 I suggest for assertions:
- Creating a single code generation module called "assertion"
    That module receives the desired assertions as an array of objects (`{ assertion: "have.class", value: "active" }`) 
    -> The code is then generated depending on the disered assertion
- In the frontend, there should also only be the "assertion" helper.
    There, an element is chosen in our standard way (from metadata or custom selector). A timeout can be provided optionally.
    Key/Value pairs can be defined for assertions and value. Those assertions can be chosen from a select list containing all our supported assertions. The goal should be to support all cypress assertions, however the focus should be on the most common ones: https://docs.cypress.io/guides/references/assertions#Common-Assertions
