## Performing Actions on Elements
> * Cypress Documentation Link: https://docs.cypress.io/guides/core-concepts/interacting-with-elements#Actionability
> * Detailed doc of the methods mentioned below: https://docs.cypress.io/api/commands/

Cypress offers a variety of actions to be performed on an element:
* `.click()`
* `.dblclick()`
* `.rightclick()`
* `.type()`
* `.clear()`
* `.check()`
* `.uncheck()`
* `.select()`
* `.trigger()`
* `.selectFile()`
They roughly map their codecept counterparts, e. g. `.fillField()` <-> `.type()`. The difference is however that the element to be interacted with is not passed as a parameter. The action is chained to the element obtained by `cy.get()`/`cy.find()`/`cy.xpath()`:
```js
cy.get('#P101_USERNAME').type('Max Mustermann');
```
Also, cypress performs various checks on actionable elements before triggering the specific event (e.g. click-envent):
* element is scrolled into view
    * only done for action commands, __not__ for `cy.get()`/`cy.find()` 
* element is not hidden
* element is not detached
* element is not readonly
* element is not animating
* element is not covered

More on those checks can be found here: https://docs.cypress.io/guides/core-concepts/interacting-with-elements#Visibility

---
 ### APEX specifics
 During the experimentation with cypress and APEX, it often happened that actions could not be performed because cypress often considered elements to be detached from the DOM, particularly when clicking an entry in the APEX Side Navigation Menu or when interacting with PopUp LOVs and Interactive Grid Cells.

 This was fixed by forcing cypress to perform the action:
 ```js
 cy.xpath('//div[@id="t_TreeNav"]//a[text()="Customers "]').click({ force: true });
 ```
 In that case, none of the above checks are performed and the event is triggered no matter what.
 For us, I suggest make the forcing the default but offering the option in the UI at step creation to include the checks (basically an Opt-Out-Solution).

 ---
### Impact on existing LCT Code 
The action commands take almost the exact same parameters as their corresponding codecept variants (except for the element). From a JSON generation standpoint we might have to add parameters here and there as for example the `.type()`-Command also accepts certain keyboard keys as params (`{shift}` etc.) but in order to offer the same functionality almost nothing has to be changed.

Since actions and assertions can be chained in cypress, we might need to offer the possibility to add assertions to the element that has been interacted with. This is useful if the interaction is supposed to change properties of the element, like disabling it. In the UI that could look like an additional element to select an assertion from a List and a an element to input the expected value. 
> List of availlable assertions/assertion styles: https://docs.cypress.io/guides/references/assertions#BDD-Assertions