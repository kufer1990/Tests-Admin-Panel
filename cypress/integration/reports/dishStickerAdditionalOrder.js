/// <reference types="cypress" />
import * as XLSX from "xlsx";

let actualDay = new Date().getDate();
const url = "overprod-dish-stickers";

describe("dishStickerAdditionalOrder", () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });
  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("login", () => {
    cy.login(url);
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
      url: "/reports/overproduction-dish-stickers*",
    }).as("xslsReport");
    cy.get(".btn--generate-xslx").click();
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
});
