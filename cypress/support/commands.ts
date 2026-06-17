/// <reference types="cypress" />

import { LoginPage } from "../pages/LoginPage"

// ***********************************************

Cypress.Commands.add('login', (username: string, password: string) => {
  const loginPage = new LoginPage()
  loginPage.visit()
  loginPage.typeUsername(username)
  loginPage.typePassword(password)
  loginPage.clickLoginButton()
})

declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>;
    }
  }
}   

export {}