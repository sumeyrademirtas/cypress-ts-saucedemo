import { Users } from '../support/types'
import { CartPage } from '../pages/CartPage'
import { InventoryPage } from '../pages/InventoryPage'

describe('Cart', () => {
    let users: Users

    beforeEach(() => {
        cy.fixture('users').then((data) => {
            users = data
            cy.login(users.standard.username, users.standard.password)
        })
    })


    it('Should display the number in the shopping cart badge after adding an item to the cart', () => {
        const inventoryPage = new InventoryPage()
        inventoryPage.addToCartSauceLabsBackpack()
        inventoryPage.getShoppingCartBadge().should('have.text', '1')
    })

    it('Should navigate to the cart page', () => {
        const inventoryPage = new InventoryPage()
        inventoryPage.clickCartIcon()
        cy.url().should('include', '/cart.html')
    })

    it('Should display the correct item in the cart', () => {
        const inventoryPage = new InventoryPage()
        inventoryPage.addToCartSauceLabsBackpack()
        inventoryPage.clickCartIcon()
        const cartPage = new CartPage()
        cartPage.getInventoryItemName().should('have.text', 'Sauce Labs Backpack')

    })

 
})