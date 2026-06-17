export class InventoryPage {
    visit() {
        cy.visit('/inventory.html');
    }

    addToCartSauceLabsBackpack() {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    }

    getShoppingCartBadge() {
        return cy.get('[data-test="shopping-cart-badge"]');
    }

     clickCartIcon() {
        cy.get('[data-test="shopping-cart-link"]').click();
    }

}
