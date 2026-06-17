export class CheckoutPage {

    // Step 1
    visit() {
        cy.visit('/checkout-step-one.html');
    }

    fillInformation(firstName: string, lastName: string, postalCode: string) {
        cy.get('[data-test="firstName"]').type(firstName);
        cy.get('[data-test="lastName"]').type(lastName);
        cy.get('[data-test="postalCode"]').type(postalCode);
    }

    clickContinueButton() {
        cy.get('[data-test="continue"]').click();
    }

    getFirstNameField() {
        return cy.get('[data-test="firstName"]');
    }

    getLastNameField() {
        return cy.get('[data-test="lastName"]');
    }

    getZipPostalCodeField() {
        return cy.get('[data-test="postalCode"]');
    }


    // Step 2
    getInventoryItemName() {
        return cy.get('[data-test="inventory-item-name"]')
    }

    getInventoryItemPrice() {
        return cy.get('[data-test="inventory-item-price"]')
    }

    getSubTotalLabel() {
        return cy.get('[data-test="subtotal-label"]')
    }

    getTaxLabel() {
        return cy.get('[data-test="tax-label"]')
    }

    getTotalLabel() {
        return cy.get('[data-test="total-label"]')
    }

    clickFinishButton() {
        cy.get('[data-test="finish"]').click()
    }

    getSuccessMessage() {
        return cy.get('[data-test="complete-header"]')
    }










}