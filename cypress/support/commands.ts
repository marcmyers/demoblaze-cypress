/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

// Any generic commands that are used across multiple tests should be added here

// ToDo: Add headless login
Cypress.Commands.add('loginNewRandomUser', () => {
    cy.intercept('GET', 'https://hls.demoblaze.com/about_demo_hls_*.ts').as('hls');
    cy.intercept('POST', 'https://api.demoblaze.com/login').as('login');
    const randomEmail = faker.internet.email();
    const randomPassword = faker.internet.password();      

    cy.postSignup(randomEmail, randomPassword).then(() => {
        cy.get('[id="login2"]').click();
        cy.wait('@hls');
        cy.get('#loginusername').type(randomEmail, { force: true });
        cy.get('#loginpassword').type(randomPassword, { force: true });
        cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click();
        cy.wait('@login');
        cy.wait('@hls');
    });
});