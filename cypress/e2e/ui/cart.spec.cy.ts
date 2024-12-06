import { faker } from '@faker-js/faker';

describe('Cart', () => {
    beforeEach(() => {
        cy.intercept('POST', 'https://api.demoblaze.com/addtocart').as('addtocart');
        cy.intercept('POST', 'https://api.demoblaze.com/deleteitem').as('deleteitem');
        cy.intercept('GET', 'https://hls.demoblaze.com/about_demo_hls_*.ts').as('hls');
        cy.visit('/index.html');
    });

    describe('when not authenticated', () => {
        it('should allow a user to add an item', () => {
            cy.contains('Samsung galaxy s6').click();
            cy.contains('Add to cart').click();
            
            cy.on('window:alert', (alertText) => {
                expect(alertText).to.contain('Product added');
            });

            cy.wait('@addtocart');
            cy.contains('Cart').click();
            cy.get('.success > :nth-child(2)').should('contain', 'Samsung galaxy s6');
        });

        // ToDo: Do a headless post to /addtocart to add the item to the users cart
        it('should allow a user to delete an item', () => {
            cy.contains('Samsung galaxy s6').click();
            cy.contains('Add to cart').click();
            
            cy.on('window:alert', (alertText) => {
                expect(alertText).to.contain('Product added');
            });

            cy.wait('@addtocart');
            cy.contains('Cart').click();
            cy.contains('Delete').click();
            cy.wait('@deleteitem');

            cy.get('.success').should('not.exist');
        });
    });
 
    describe('when authenticated', () => {
        beforeEach(() => {
            cy.loginNewRandomUser();
        });

        it('should allow a user to add an item', () => {
            cy.contains('Samsung galaxy s6').click();
            cy.contains('Add to cart').click();

            cy.on('window:alert', (alertText) => {
                expect(alertText).to.contain('Product added');
            });

            cy.wait('@addtocart');
            cy.contains('Cart').click();
            cy.get('.success > :nth-child(2)').should('contain', 'Samsung galaxy s6');
        });

        // ToDo: Do a headless post to /addtocart to add the item to the users cart
        it('should allow a user to delete an item', () => {
            cy.contains('Samsung galaxy s6').click();
            cy.contains('Add to cart').click();
            
            cy.on('window:alert', (alertText) => {
                expect(alertText).to.contain('Product added');
            });

            cy.wait('@addtocart');
            cy.contains('Cart').click();
            cy.contains('Delete').click();
            cy.wait('@deleteitem');

            cy.get('.success').should('not.exist');
        });
    });
});