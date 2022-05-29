// import _ from "cypress/types/lodash";

const login = (url) => {
  const { brandName } = Cypress.env();
  cy.fixture(`${brandName}.json`).then((data) => {
    cy.visit(`${data.visitOnInstances}/admin/reports/${url}`);
    cy.wait(4000);
    cy.get("body").then((body) => {
      if (body.text().includes(" Automatyczny")) {
        console.log("zalogowane");
      } else {
        console.log("nie zalogowany");
        cy.get("#email").type(data.login);
        cy.get("#password").type(data.paswword);
        cy.get('[type="submit"]').click();
      }
    });
  });
};

export default login;
