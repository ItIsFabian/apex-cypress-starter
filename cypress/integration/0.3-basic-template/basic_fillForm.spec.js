describe('Sample Database APEX App', () => {
    beforeEach(() => {
        cy.visit('https://apex.generationcode.de/ords/f?p=100:LOGIN_DESKTOP');
        cy.get('#P101_USERNAME').type('user'); // change to your user
        cy.get('#P101_PASSWORD').type('*******', { log: false }); // change to your pw, hides pw in log 
        cy.get('#P101_LOGIN').click();
    })

    it('can add customer', () => {
        cy.get('h1[class=t-HeroRegion-title]').should('have.text', 'Sample Database Application');
        cy.xpath('//div[@id="t_TreeNav"]//a[text()="Customers "]').click(); //Trigger Nav to 'Customers'-Page
        cy.url().should('include', 'f?p=100:2:') //Verify Navigation to correct page

        // Fill required Form elements
        cy.get('#B7334948467925292808').click(); //Trigger Modal 
        cy.getIframe().find('#P7_CUST_FIRST_NAME').type('Test');
        cy.getIframe().find('#P7_CUST_LAST_NAME').type('Testermann');
        cy.getIframe().find('#P7_CUST_STATE').select('Hawaii');
        cy.getIframe().find('#P7_CUST_POSTAL_CODE').type('35005');
        cy.getIframe().find('#P7_CREDIT_LIMIT').type('5000');
        //cy.iframe().xpath("//button/span[text()='Add Customer']").click({ force: true }); 

        //Check Grid for added Customer
        //Search added Customer
        cy.get('#customer_ir_ig_toolbar_search_field').type('Testermann, Test');
        cy.get('button[data-action=search]').click();

        // Check searchresult
        cy.get('#customer_ir').within(() => {
            cy.get('tr[data-id="0"] a').should('have.text', 'Testermann, Test');
        });

    })
  
})
  