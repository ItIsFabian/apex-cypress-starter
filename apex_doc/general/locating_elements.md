## Locating Elements
> Cypress Documentation Link: https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Querying-Elements

### What Cypress offers

Cypress' quering functionality uses jquery as base. That means selecting DOM Elements is quite similar.
- Obtaining one ore more DOM elements by using the `cy.get()`-function. This function accepts CSS-Selectors in the same way `$()` does, e. g.:
    - `cy.get("#submit_bttn")` - Obtains element with static id 'submit_bttn'
    - `cy.get("#customer_ig button[data-action=save]")` - Obtains Button with attribute 'data-action' and value 'save' with element found by id 'customer_ig' as parent
    - The `get()` function can additionally be passed an options object `cy.get(element, options)`. For more info on the options object: https://docs.cypress.io/api/commands/get#Arguments

- Query results obtained by `cy.get()` can be filtered further by using `filter()` like so:
    - `cy.get("#customer_ig").filter("button[data-action=save]"")` -    Obtains Button with attribute 'data-action' and value 'save' within element found by id 'customer_ig'. 

- Obtaining elements by text content using `cy.contains()` like so: `cy.contains("Submit")` - Get Element with text "Submit"

- Using Xpath-expressions is also possible but requires adding `require("cypress-xpath")` to `support/index.js`. 

    Usage:
    - `cy.xpath("//ul[@class="todo-list"]//li")` - Get list item with unordered list with CSS class "todo-list" as parent.
    - `cy.xpath("//*[@id="submit_bttn"]")` - Get element with id "submit_bttn"

- To obtain the currently focused element, `cy.focused()` can be used

> __Countering Flakiness__:
>
>In order to deal with flakiness due to for example slow internet conntections, `cy.get()`/`cy.get().find()`/`cy.contains()` are retried multiple times, if an element is not found. The retries can be limited locally (per element) by passing a timeout value (`cy.get("#submit_bttn", { timeout: 10000 })`) or globally by changing the __defaultCommandTimeout__-option in __cypress.json__.
>
>- https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#When-Elements-Are-Missing
>- https://docs.cypress.io/guides/references/configuration#Timeouts

---
 ### APEX specifics
 - None
 ---
 ### Impact on existing LCT Code 
  - In codecept, it is autmatically recognized wether an CSS-, XPath- or semantic selector is passed to e.g. `I.click()`. With Cypress, different code needs to be generated depending on the selector. We now need:
    - Either Indicators as JSON parameters, e. g. `{"isXpath": true}`
        -> Have to be set by the user when adding a step.
    - Or we parse the input for the given element and try what it is.
- Timeouts: 
    - Settings have to be adapted to incorporate __defaultCommandTimeout__-Setting
    - When adding a step, it should be possible to define a custom timeout for that element/ adding a __timeout-Object__ as described before  
- Our __context__-parameter can remain and, if not null should generate the following code:
```js 
    cy.get("#context_elem").find("#elem"); // find #elem within #context_elem
    cy.get("#context_elem").contains("Save"); //find element with text " Save" within #context_elem 
```
- Xpath-module should be included by default in our __cypress.json__
- In custom code, like in our test_util.js it is important __NOT__ to assign the result of `cy.get()` to a variable like so: 
    ```js 
    const cyElement = cy.get('.element'); //No No
    ```  
    The element is, because of the retry functionality not returned synchronously.
    https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Cypress-is-Not-Like-jQuery

