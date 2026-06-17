export class CartPage {
    visit() {
        cy.visit('/cart.html');
    }

    getInventoryItemName() {
        return cy.get('[data-test="inventory-item-name"]')
    }

    clickCheckoutButton() {
        cy.get('[data-test="checkout"]').click();
    }


}