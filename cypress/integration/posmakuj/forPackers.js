/// <reference types="cypress" />
const userName = "test@wp.pl";
const userPassword = "Test1234@";
let actualDay = new Date().getDate();

describe("forPackers", () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });
  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("login", () => {
    cy.fixture("posmakuj.json")
      .as("visitOnInstances")
      .then((visitOnInstances) => {
        cy.visit(
          `${visitOnInstances["visitOnInstances"]}/admin/reports/packers`
        );
      });
    cy.fixture("posmakuj.json")
      .as("login")
      .then((userName) => {
        cy.get("#email").type(userName["login"]);
      });
    cy.fixture("posmakuj.json")
      .as("paswword")
      .then((userPassword) => {
        cy.get("#password").type(userPassword["paswword"]);
      });
    cy.get('[type="submit"]').click();
    cy.wait(4000);
  });

  it("choice brand", () => {
    cy.get(".input-select--brand").click();
    cy.get("#react-select-2-option-0").click();
  });

  it("choice start day", () => {
    cy.get(".input-datetime--date").click();
    cy.get(".input-datetime--date>.rdtPicker>.rdtDays>table>tbody>tr>td")
      .not(".rdtOld")
      .contains(actualDay)
      .click();
  });

  it("generate report pdf", () => {
    cy.get(".btn--generate-pdf").click();
  });

  it("verify download file pdf", () => {
    cy.task("getDownload").then((fileName) => {
      console.log("Downloaded file:", fileName);
      const path = require("path");
      const downloadsFolder = "cypress/downloads/";
      cy.readFile(path.join(downloadsFolder + fileName)).should("exist");
    });
  });
});
