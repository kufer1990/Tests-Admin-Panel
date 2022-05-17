import * as XLSX from "xlsx";

it("REPORTS", () => {
  cy.visit("https://admin.dev.caterings.nidev.pl/");
  // cy.get("#email").type("adam.zawadzki@caterings.pl");
  // cy.get("#password").type("Test123!");
  // cy.get(".sc-fKVqWL").click();

  cy.visit(
    "https://admin.dev.caterings.nidev.pl/admin/reports/checklist-dishes?selectedBrand=1"
  );

  cy.get(
    ":nth-child(1) > .css-1pcexqc-container > .css-ydgf5a-control > .css-1hwfws3"
  ).click();
  cy.get("#react-select-2-option-0").click();

  cy.get(
    ":nth-child(3) > .css-1pcexqc-container > .css-ydgf5a-control > .css-1hwfws3"
  ).click();
  cy.get("#react-select-3-option-0").click();

  cy.get(
    ":nth-child(4) > .css-1pcexqc-container > .css-ydgf5a-control > .css-1hwfws3"
  ).click();
  cy.get("#react-select-4-option-0").click();

  cy.get(":nth-child(5) > .jss516 > .rdt > .form-control").click();
  cy.get(
    ':nth-child(5) > .jss516 > .rdt > .rdtPicker > .rdtDays > table > tbody > :nth-child(1) > [data-value="1"]'
  ).click();

  cy.get(":nth-child(6) > .jss516 > .rdt > .form-control").click();
  cy.get(
    ":nth-child(6) > .jss516 > .rdt > .rdtPicker > .rdtDays > table"
  ).click();

  // get endpoint with file(ArrayBuffer) as waiterXhr
  cy.intercept({
    method: "GET",
    url: "/reports/checklist-dishes*",
  }).as("xslsReport");

  cy.get('[style="display: flex;"] > :nth-child(1) > .jss320').click();

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
