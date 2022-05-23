const verifyDownloadXlsx = (reportUrl) => {
  cy.intercept({
    method: "GET",
    url: `/reports/${reportUrl}*`,
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
};

export default verifyDownloadXlsx;
