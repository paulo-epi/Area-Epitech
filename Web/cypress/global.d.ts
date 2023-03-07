/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * visit http://localhost:3000
     */
    start(): Chainable<any>;
  }
}
