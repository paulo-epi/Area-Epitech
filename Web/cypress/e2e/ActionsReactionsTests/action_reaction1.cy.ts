import { login } from "../login";
import { find } from "../find";

describe("homePageContent.cy.ts", () => {
  before(() => {
    login();
    find("Chargement en cours...").should("not.exist");
    find("Action").should("be.visible");
  });

  it("should action bad weater and reaction mail to marius.nowak@epitech.eu", () => {
    cy.get("#PlusButton").should("be.visible");
    cy.wait(500);
    cy.get("#PlusButton").click();
    cy.wait(500);
    cy.get('span[title="detect weather"]').click();
    cy.contains("div", "new github issue").click();
    find("a new issue has appeared on a set github repo").should("be.visible");
    cy.get('input[id="input-Name of the repository-7"]').type(
      "MariusNWK/ReactWebApp"
    );
    cy.get('input[id="input-Mail address-0"]').type("marius.nowak@epitech.eu");
    cy.get('input[id="input-Subject-0"]').type("New github issue");
    cy.get('input[id="input-Message-0"]').type(
      "You have a new github issue, message wrote with cypress"
    );
    cy.contains("span", "Enable").click();
  });
});
