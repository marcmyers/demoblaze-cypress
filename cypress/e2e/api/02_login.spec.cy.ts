import { faker } from '@faker-js/faker';

describe('login endpoint', () => {
    it('should return 200 status code and an auth token when logging in with a valid user', () => {
        const randomEmail = faker.internet.email();
        const randomPassword = faker.internet.password();

        cy.postSignup(randomEmail, randomPassword).then(() => {
            cy.postLogin(randomEmail, randomPassword).then((postResp) => {
                expect(postResp.status).to.eq(200);
                expect(postResp.body).to.contain('Auth_token');
            });
        });
    });
});

// TODO: Attempt to login with a user that does not exist
// TODO: Attempt to login with a user that exists but with an incorrect password
// TODO: Attempt to login with empty credentials
