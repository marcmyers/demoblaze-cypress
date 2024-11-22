import { faker } from '@faker-js/faker';

describe('Authentication on the homepage', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://hls.demoblaze.com/about_demo_hls_*.ts').as('hls');
    cy.visit('/index.html');
  });

  describe('When clicking the Sign Up button', () => {
    beforeEach(() => {
      cy.intercept('POST', 'https://api.demoblaze.com/signup').as('signup');
      cy.get('[id="signin2"]').click();
      cy.wait('@hls');
    });

    it('should display the sign up form', () => {
      cy.get('[id="signInModal"]').should('be.visible');
      cy.get('[id="sign-username"]').should('be.visible');
      cy.get('[id="sign-password"]').should('be.visible');
    });

    it('and using a new valid e-mail and password should display a success message', () => {
      const randomEmail = faker.internet.email();
      const randomPassword = faker.internet.password();

      cy.get('#sign-username').type(randomEmail, { force: true });
      cy.get('#sign-password').type(randomPassword, { force: true });
      cy.get('#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click();
      cy.wait('@signup');
      cy.get('[id="signInModal"]').should('not.be.visible');
      cy.on('window:alert', (alertString) => {
        expect(alertString).to.contain('Sign up successful');
      });
    });
  });

  describe('When clicking the Log In button', () => {
    beforeEach(() => {
      cy.intercept('POST', 'https://api.demoblaze.com/login').as('login');
      cy.get('[id="login2"]').click();
      // TODO: Store hls url in cypress.env.json file
      cy.wait('@hls');
    });

    it('should display the login form', () => {
      cy.get('[id="logInModal"]').should('be.visible');
      cy.get('[id="loginusername"]').should('be.visible');
      cy.get('[id="loginpassword"]').should('be.visible');
    });

    it('and using a valid e-mail and password should authenticate the user', () => {
      const randomEmail = faker.internet.email();
      const randomPassword = faker.internet.password();      

      // TODO: Store api url in cypress.env.json file
      cy.postSignup(randomEmail, randomPassword).then(() => {
        cy.get('#loginusername').type(randomEmail, { force: true });
        cy.get('#loginpassword').type(randomPassword, { force: true });
        cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click();
        cy.wait('@login');
        cy.wait('@hls');
        cy.get('[id="logInModal"]').should('not.be.visible');
        cy.get('#nameofuser').should('contain', randomEmail);
        cy.get('#logout2').should('be.visible');
      });
    });
  });
});

// TODO: Move repetitive ui actions to cypress commands
// TODO: Add tests for signup with existing user
// TODO: Add test for correct user but incorrect password
// TODO: Add tests for empty fields for both modals
