/// <reference types="cypress" />
import * as XLSX from "xlsx";
const userName = "test@wp.pl";
const userPassword = "Test1234@";
let actualDay = new Date().getDate();
// let actualDay = 30;
let endDateCreateReport = actualDay + 1;

describe("dish stickers", () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });
  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("login", () => {
    cy.fixture("minutaOsiem.json")
      .as("visitOnInstances")
      .then((visitOnInstances) => {
        cy.visit(
          `${visitOnInstances["visitOnInstances"]}/admin/reports/dish-labels`
        );
      });
    cy.fixture("minutaOsiem.json")
      .as("login")
      .then((userName) => {
        cy.get("#email").type(userName["login"]);
      });
    cy.fixture("minutaOsiem.json")
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

  it("verify download xlsx", () => {
    cy.intercept({
      method: "GET",
      url: "/reports/dish-stickers*",
    }).as("xslsReport");
    cy.get(".btn--generate-xlsx").click();
    // wait on response
    // 1. convert ArrayBuffer to Uint8Array
    // 2. convert Uint8Array by lib XSLX to workbox
    // 3. donvert workbox to jsonData
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
