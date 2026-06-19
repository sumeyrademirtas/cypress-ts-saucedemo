/// <reference types="cypress" />

import { LoginPage } from "../pages/LoginPage"
import { API_URL } from './constants'

// ***********************************************

Cypress.Commands.add('login', (username: string, password: string) => {
  const loginPage = new LoginPage()
  loginPage.visit()
  loginPage.typeUsername(username)
  loginPage.typePassword(password)
  loginPage.clickLoginButton()
})


Cypress.Commands.add('getToken', () => {
  return cy.request({
    method: 'POST',
    url: `${API_URL}/auth`,
    body: { username: 'admin', password: 'password123' },
    headers: { 'Content-Type': 'application/json' }
  }).then((res) => res.body.token)
})

declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>;
      getToken(): Chainable<string>;
    }
  }
}   

export {}