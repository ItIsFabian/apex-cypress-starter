# Cypress starter for Oracle Apex 

Empty Cypress project with documentation folder to be extended with code examples for interacting with Oracle APEX Components.

## Usage 

```sh
npm install
```

Test files are created within `cypress/integration/custom_folder`. `*.spec.js` file ending needed.

Run specific test:

```sh
npm run cy:run:spec cypress/integration/custom_folder/test.spec.js
```

For additional run options, see `scripts` section of `package.json`

## Configuration

Configurations can be changed in `cypress.json`. All values entered there are default ones and have only been included to show the available options.

## Documentation for working with Oracle APEX

This project will be extended with `*.md` files giving information on how to interact with APEX components/elements/concepts. 
The files will be placed in the `apex_doc/` directory.

## Custom Commands

A custom command to interact with iframes has been added to the `index.js` file in `cypress/support/`.

Also, in order to work with xpath expressions, `cypress-xpath`has been added as dev dependency and as custom command.
It can be used similarly to the `get()`-method:
```js
cy.get('#el_id');
cy.xpath('//element[@id='el_id']);
```
