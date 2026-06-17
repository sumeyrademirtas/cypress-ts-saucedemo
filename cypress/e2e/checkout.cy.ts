import { LoginPage } from '../pages/LoginPage'
import { Users } from '../support/types'
import { CartPage } from '../pages/CartPage'
import { InventoryPage } from '../pages/InventoryPage'
import { CheckoutPage } from '../pages/CheckoutPage'
import { faker } from '@faker-js/faker'


describe('Checkout', () => {
    let users: Users

    beforeEach(() => {
        cy.fixture('users').then((data) => {
            users = data
            cy.login(users.standard.username, users.standard.password)

        })
    })

    it('Should navigate to the checkout page step one', () => {
        const inventoryPage = new InventoryPage()
        inventoryPage.addToCartSauceLabsBackpack()
        inventoryPage.clickCartIcon()
        const cartPage = new CartPage()
        cartPage.clickCheckoutButton()
        cy.url().should('include', '/checkout-step-one.html')
    })

    it('Should fill the form', () => {
        const inventoryPage = new InventoryPage()
        inventoryPage.addToCartSauceLabsBackpack()
        inventoryPage.clickCartIcon()
        const cartPage = new CartPage()
        cartPage.clickCheckoutButton()
        const checkoutPage = new CheckoutPage()
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
        const postalCode = faker.location.zipCode()
        checkoutPage.fillInformation(firstName, lastName, postalCode)
        checkoutPage.getFirstNameField().should('have.value', firstName)
        checkoutPage.getLastNameField().should('have.value', lastName)
        checkoutPage.getZipPostalCodeField().should('have.value', postalCode)
    })

    // Step 2

    it('Should navigate to the checkout page step two', () => {
        const inventoryPage = new InventoryPage()
        inventoryPage.addToCartSauceLabsBackpack()
        inventoryPage.clickCartIcon()
        const cartPage = new CartPage()
        cartPage.clickCheckoutButton()
        const checkoutPage = new CheckoutPage()
        checkoutPage.fillInformation(
            faker.person.firstName(),
            faker.person.lastName(),
            faker.location.zipCode()
        )
        checkoutPage.clickContinueButton()
        cy.url().should('include', '/checkout-step-two.html')

    })

    it('Should get the info and prices', () => {
        const inventoryPage = new InventoryPage()
        inventoryPage.addToCartSauceLabsBackpack()
        inventoryPage.clickCartIcon()
        const cartPage = new CartPage()
        cartPage.clickCheckoutButton()
        const checkoutPage = new CheckoutPage()
        checkoutPage.fillInformation(
            faker.person.firstName(),
            faker.person.lastName(),
            faker.location.zipCode()
        )
        checkoutPage.clickContinueButton()

        checkoutPage.getInventoryItemName().should('have.text', 'Sauce Labs Backpack');
        checkoutPage.getInventoryItemPrice().should('have.text', '$29.99')

        checkoutPage.getSubTotalLabel().should('contain.text', '$29.99')
        checkoutPage.getTaxLabel().should('contain.text', '$2.40')
        checkoutPage.getTotalLabel().should('contain.text', '$32.39')

    })

    it('Should navigate to Checkout Complete page', () => {
        const inventoryPage = new InventoryPage()
        inventoryPage.addToCartSauceLabsBackpack()
        inventoryPage.clickCartIcon()
        const cartPage = new CartPage()
        cartPage.clickCheckoutButton()
        const checkoutPage = new CheckoutPage()
        checkoutPage.fillInformation(
            faker.person.firstName(),
            faker.person.lastName(),
            faker.location.zipCode()
        )
        checkoutPage.clickContinueButton()
        checkoutPage.clickFinishButton()
        cy.url().should('include', 'checkout-complete.html')
    });

    it('Should shown Confirmation Message', () => {
              const inventoryPage = new InventoryPage()
        inventoryPage.addToCartSauceLabsBackpack()
        inventoryPage.clickCartIcon()
        const cartPage = new CartPage()
        cartPage.clickCheckoutButton()
        const checkoutPage = new CheckoutPage()
        checkoutPage.fillInformation(
            faker.person.firstName(),
            faker.person.lastName(),
            faker.location.zipCode()
        )
        checkoutPage.clickContinueButton()
        checkoutPage.clickFinishButton()
        checkoutPage.getSuccessMessage().should('have.text', 'Thank you for your order!')
    });










})