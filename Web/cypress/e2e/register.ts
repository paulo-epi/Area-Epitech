import { find } from "./find";

export function register() {
  cy.visit("http://localhost:3000/register");
  cy.get("input[id=email]").type("marius.nowak54@gmail.com");
  cy.get("input[id=password]").type("Motdepasse");
  cy.get("input[id=confirmpassword]").type("Motdepasse");
  cy.get("button[type=submit]").click();
  find("Your account has been successfully created. You can log in.").should(
    "be.visible"
  );
  cy.contains("span", "OK").click();
}
