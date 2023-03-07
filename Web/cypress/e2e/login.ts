import { find } from "./find";

export function login() {
  cy.visit("http://localhost:3000/login");
  cy.get("input[id=email]").type("marius.nowak54@gmail.com");
  cy.get("input[id=password]").type("Okducoup");
  cy.get("button[type=submit]").click();
}
