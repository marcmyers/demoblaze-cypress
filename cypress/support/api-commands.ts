/// <reference types="cypress" />

Cypress.Commands.add('postSignup', (email, password) => {
    const encodedPassword = Buffer.from(password).toString('base64');
    return cy.request({
        method: 'POST',
        url: 'https://api.demoblaze.com/signup',
        failOnStatusCode: false,
        body: {
            username: email,
            password: encodedPassword
        }
    });
})

Cypress.Commands.add('postLogin', (email, password) => {
    const encodedPassword = Buffer.from(password).toString('base64');
    return cy.request({
        method: 'POST',
        url: 'https://api.demoblaze.com/login',
        failOnStatusCode: false,
        body: {
            username: email,
            password: encodedPassword
        }
    });
})
