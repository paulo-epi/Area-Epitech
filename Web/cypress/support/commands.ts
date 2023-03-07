/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("start", () => {
  it("should visit website", () => {
    cy.visit("http://localhost:3000");
  });
})


// const user = JSON.parse(persistRoot.user ?? { data: {} });
// user.data = res;
// persistRoot.user = JSON.stringify(response.body.success);
// localStorage.setItem("persist:root", JSON.stringify(persistRoot));

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

export {}
