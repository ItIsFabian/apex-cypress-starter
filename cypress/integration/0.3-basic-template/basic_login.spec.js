describe('Sample Database APEX App', () => {

    it('can login', () => {
        cy.visit('https://apex.generationcode.de/ords/f?p=100:LOGIN_DESKTOP');
        cy.get('#P101_USERNAME').type('user');
        cy.get('#P101_PASSWORD').type('password');
        cy.get('#P101_LOGIN').click();
    })
  
})
  