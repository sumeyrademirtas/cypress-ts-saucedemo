export class LoginPage {
    visit() {
        cy.visit('/'); // Base URL is set in cypress.config.ts
    }

    typeUsername(username: string) {
        cy.get('[data-test="username"]').type(username);
    }

    typePassword(password: string) {
        cy.get('[data-test="password"]').type(password);
    }

    clickLoginButton() {
        cy.get('[data-test="login-button"]').click();
    }

    getErrorMessage() {
        return cy.get('[data-test="error"]');
    }
}