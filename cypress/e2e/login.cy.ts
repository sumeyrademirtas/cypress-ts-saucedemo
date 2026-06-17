import { LoginPage } from '../pages/LoginPage'
import { Users } from '../support/types'


describe('Login', () => {
  const loginPage = new LoginPage()
  let users: Users

  beforeEach(() => {
    cy.fixture('users').then((data) => {
      users = data
    })

    loginPage.visit()
  })


  it('Should login with valid credentials', () => {
    loginPage.typeUsername(users.standard.username)
    loginPage.typePassword(users.standard.password)
    loginPage.clickLoginButton()
    cy.url().should('include', '/inventory.html')
  })

  it('Should show error message with invalid credentials', () => {
    loginPage.typeUsername(users.invalid.username)
    loginPage.typePassword(users.invalid.password)
    loginPage.clickLoginButton()
    loginPage.getErrorMessage().should('be.visible').and('have.text', 'Epic sadface: Username and password do not match any user in this service')

  })

})