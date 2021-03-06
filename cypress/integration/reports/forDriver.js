/// <reference types="cypress" />
import * as XLSX from "xlsx";

let actualDay = new Date().getDate() + 1;
const url = "for-driver";

describe("box labels", () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });
  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("login", () => {
    cy.login(url);
  });

  it("choice start day", () => {
    cy.get(".input-datetime--date").click();
    cy.get(".input-datetime--date>.rdtPicker>.rdtDays>table>tbody>tr>td")
      .not(".rdtOld")
      .contains(actualDay)
      .click();
  });

  it("choice delivery type", () => {
    cy.get(".input-select--delivery-type").eq(0).click();
    cy.get(".input-select--delivery-type__item").eq(0).click();
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
  it("verify download xlsx", () => {
    cy.intercept({
      method: "GET",
      url: "/reports/delivery*",
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
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        raw: true,
      });
      expect(jsonData).to.be.not.empty;
    });
  });

  it("choice delivery type", () => {
    cy.get(".input-select--delivery-type").eq(0).click();
    cy.get(".input-select--delivery-type__item").eq(1).click();
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

  it("verify download xlsx", () => {
    cy.intercept({
      method: "GET",
      url: "/reports/delivery*",
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
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        raw: true,
      });
      expect(jsonData).to.be.not.empty;
    });
  });
});
