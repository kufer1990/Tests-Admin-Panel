/// <reference types="cypress" />
import * as XLSX from "xlsx";

let actualDay = new Date().getDate();
let endDateCreateReport = actualDay + 1;
const url = "checklist-recipes";

describe("Recipe list", () => {
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

  it("generate report pdf", () => {
    cy.get(".btn--generate-pdf").click();
  });

  it("verify download file", () => {
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
      url: "/reports/checklist-recipes*",
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
