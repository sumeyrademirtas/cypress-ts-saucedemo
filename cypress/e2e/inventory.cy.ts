import { Users } from '../support/types'
import { InventoryPage } from '../pages/InventoryPage'

describe('Inventory', () => {
    let users: Users

    beforeEach(() => {
        cy.fixture('users').then((data) => {
            users = data
            cy.login(users.standard.username, users.standard.password)
        })
    })

    it('Should display inventory items after login', () => {
        cy.url().should('include', '/inventory.html')
    })

    it('Should display the number in the shopping cart badge after adding an item to the cart', () => {
        const inventoryPage = new InventoryPage()
        inventoryPage.addToCartSauceLabsBackpack()
        inventoryPage.getShoppingCartBadge().should('have.text', '1')
    })

    
})