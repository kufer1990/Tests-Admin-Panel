const verifyDownloadPdf = () => {
  cy.task("getDownload").then((fileName) => {
    console.log("Downloaded file:", fileName);
    const path = require("path");
    const downloadsFolder = "cypress/downloads/";
    cy.readFile(path.join(downloadsFolder + fileName)).should("exist");
  });
};

export default verifyDownloadPdf;
