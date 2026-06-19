# Cypress + TypeScript Test Automation

UI and API test automation suite built with **Cypress** and **TypeScript**.
It covers a full e-commerce user journey on [SauceDemo](https://www.saucedemo.com)
and complete CRUD API testing against
[restful-booker](https://restful-booker.herokuapp.com), and runs automatically on
every push via GitHub Actions.

![CI](https://github.com/sumeyrademirtas/cypress-ts-saucedemo/actions/workflows/cypress.yml/badge.svg)

## Tech Stack

| Tool | Purpose |
|------|---------|
| Cypress | Test runner (UI + API) |
| TypeScript | Type-safe tests |
| @faker-js/faker | Dynamic test data |
| cypress-plugin-steps | Readable, numbered test steps (`cy.step`) |
| GitHub Actions | Continuous integration |

## What's Tested

### UI — End-to-End (SauceDemo)

- **Login** — valid and invalid credentials (positive + negative)
- **Cart** — adding a product, verifying the cart badge, and cart contents
- **Checkout** — the full purchase journey:
  information form → order overview (item, price, tax, total) → order confirmation

### API — Full CRUD (restful-booker)

| Method | Endpoint | What it verifies |
|--------|----------|------------------|
| GET | `/booking` | Returns a list of bookings (200, array) |
| GET | `/booking/:id` | Single booking with all expected fields (incl. nested) |
| POST | `/booking` | Creates a booking and returns an id |
| PUT | `/booking/:id` | Updates a booking (token authentication) |
| DELETE | `/booking/:id` | Deletes a booking, verified with a follow-up `404` |

## Key Patterns & Concepts

- **Page Object Model** — selectors and actions are isolated per page (`cypress/pages`),
  keeping tests readable and easy to maintain.
- **Custom commands** — `cy.login()` for UI sign-in and `cy.getToken()` for API
  authentication, both typed via TypeScript.
- **Fixtures + interfaces** — test data is separated from logic and strongly typed.
- **Faker** — realistic, dynamic test data on every run.
- **Token-based API auth** — requests are chained (authenticate → act → assert).
- **Readable steps** — `cy.step()` labels each phase of long tests in the command log.
- **Test pyramid** — the suite covers the API and E2E layers.

## Project Structure

```
cypress/
├── e2e/
│   ├── api/
│   │   └── booking.cy.ts      # API tests (full CRUD)
│   ├── login.cy.ts
│   ├── inventory.cy.ts
│   ├── cart.cy.ts
│   └── checkout.cy.ts
├── fixtures/
│   └── users.json             # test data
├── pages/                     # Page Objects
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
└── support/
    ├── commands.ts            # cy.login, cy.getToken
    ├── constants.ts           # API base URL
    └── types.ts               # shared interfaces
```

## Getting Started

### Prerequisites
- Node.js 18 or newer

### Install
```bash
git clone https://github.com/sumeyrademirtas/cypress-ts-saucedemo.git
cd cypress-ts-saucedemo
npm install
```

### Run the tests
```bash
# interactive mode — opens the Cypress UI
npx cypress open

# headless mode — runs the whole suite in the terminal
npx cypress run
```

## Continuous Integration

Every push and pull request to `main` triggers
[`.github/workflows/cypress.yml`](.github/workflows/cypress.yml),
which installs dependencies and runs the full suite on a GitHub-hosted runner.
The badge at the top of this page reflects the latest run.

---

_A hands-on learning project built to practice modern UI and API test automation
with Cypress and TypeScript._
