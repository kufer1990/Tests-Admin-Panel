/// <reference types="cypress" />
import * as XLSX from "xlsx";
const userName = "test@wp.pl";
const userPassword = "Test1234@";
let actualDay = new Date().getDate();
// let actualDay = 30;
let endDateCreateReport = actualDay + 1;

describe("Shopping List", () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });
  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("login", () => {
    cy.fixture("mpk.json")
      .as("visitOnInstances")
      .then((visitOnInstances) => {
        cy.visit(
          `${visitOnInstances["visitOnInstances"]}/admin/reports/shopping`
        );
      });
    cy.fixture("mpk.json")
      .as("login")
      .then((userName) => {
        cy.get("#email").type(userName["login"]);
      });
    cy.fixture("mpk.json")
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

  it("choice paramarks", () => {
    cy.get(".input-select--subbrand").click();
    cy.get("#react-select-3-option-0").click();
    cy.get("body").click("right");
  });

  it("choice start day", () => {
    cy.get(".input-datetime--date-from").click();
    cy.get(".input-datetime--date-from>.rdtPicker>.rdtDays>table>tbody>tr>td")
      .not(".rdtOld")
      .contains(actualDay)
      .click();
  });

  it("change month", () => {
    console.log(endDateCreateReport);
    if (endDateCreateReport > 31) {
      cy.get(".input-datetime--date-to").click();
      cy.get(
        ".input-datetime--date-to > .rdtPicker > .rdtDays > table > thead > :nth-child(1) > .rdtNext > span"
      ).click();
      endDateCreateReport = endDateCreateReport - actualDay;
    }
  });
  it("choice end day", () => {
    cy.get(".input-datetime--date-to").click();
    cy.get(
      `.input-datetime--date-to > .rdtPicker > .rdtDays > table > tbody > tr > [data-value="${endDateCreateReport}"]`
    )
      .not(".rdtOld")
      .not(".rdtNew")
      .click();
  });

  it("verify download xlsx", () => {
    cy.intercept({
      method: "GET",
      url: "/reports/shopping*",
    }).as("xslsReport");
    cy.get(".btn--generate-xlsx").click();
    cy.wait("@xslsReport").then(({ response }) => {
      const data = new Uint8Array(response.body);
      const workbook = XLSX.read(data, {
        type: "array",
      });

      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });

      expect(jsonData).to.be.not.empty;
    });
  });
});
