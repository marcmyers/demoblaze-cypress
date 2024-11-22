import { faker } from '@faker-js/faker';

describe('signup endpoint', () => {
    it('should return a success message when signing up with a new user', () => {
        const randomEmail = faker.internet.email();
        const randomPassword = faker.internet.password();

        cy.postSignup(randomEmail, randomPassword).then((postResp) => {
            expect(postResp.status).to.eq(200);
            expect(postResp.body.errorMessage).to.be.undefined;
        });
    });

    it('should return an error message when attempting sign up with a pre-existing user', () => {
        const randomEmail = faker.internet.email();
        const randomPassword = faker.internet.password();

        cy.postSignup(randomEmail, randomPassword).then(() => {
            cy.postSignup(randomEmail, randomPassword).then((postResp) => {
                expect(postResp.status).to.eq(200);
                expect(postResp.body.errorMessage).to.contain('This user already exist');
            });
        });
    });


    it('should return a 500 status code when attempting sign up with empty credentials', () => {
        cy.postSignup('', '').then((postResp) => {
            expect(postResp.status).to.eq(500);
        });
    });
});

//TODO: Write a test where username is empty and password is not empty, vice versa
