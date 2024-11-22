# DemoBlaze E-commerce Website Testing

This project contains automated tests for the DemoBlaze e-commerce website using Cypress. The tests cover both UI and API functionalities, focusing on authentication processes such as signup and login.

## Test Target

The tests are designed to verify the functionality of the DemoBlaze website (https://www.demoblaze.com/), which is a demo e-commerce platform. The main areas covered by the tests include:

1. User Registration (Signup)
2. User Authentication (Login)
3. API endpoints for Signup and Login

## Prerequisites

Before running the tests, ensure you have the following installed:

- Node.js (v12 or higher)
- npm (Node Package Manager)

## Setup

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install the dependencies by running:

   ```
   npm install
   ```

## Running the Tests

To run the tests, use the following commands:

1. Open Cypress Test Runner:

   ```
   npx cypress open
   ```

   This will open the Cypress Test Runner, where you can select and run individual test files.

2. Run all tests headlessly:

   ```
   npx cypress run
   ```

   This will run all tests in headless mode and generate a report.

## Test Structure

The tests are organized into two main categories:

1. UI Tests (`cypress/e2e/ui/`)
   - `auth.spec.cy.ts`: Tests for signup and login functionality through the user interface.

2. API Tests (`cypress/e2e/api/`)
   - `signup.spec.cy.ts`: Tests for the signup API endpoint.
   - `login.spec.cy.ts`: Tests for the login API endpoint.

## Custom Commands

Custom Cypress commands have been created to simplify common operations:

- `cy.postSignup(email, password)`: Sends a POST request to the signup endpoint.

These commands are defined in `cypress/support/api-commands.ts`.

## Faker.js Integration

The tests use Faker.js to generate random user data, ensuring that each test run uses unique credentials.

## TODO

- Move repetitive UI actions to Cypress commands for better maintainability.
- Add tests for signup attempts with existing users.
- Add tests for login attempts with correct usernames but incorrect passwords.
- Store API and HLS URLs in `cypress.env.json` file for easier configuration management.

## Contributing

Feel free to contribute to this project by submitting pull requests or creating issues for any bugs or improvements you identify.
