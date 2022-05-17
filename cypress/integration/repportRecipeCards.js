/// <reference types="cypress" />

const userName = "test@wp.pl";
const userPassword = "Test1234@";
// let actualDay = new Date().getDate();
let actualDay = 30;
let endDateCreateReport = actualDay + 4

describe('Recipe list', () => {
    beforeEach(() => {
        cy.restoreLocalStorage();
    });
    afterEach(() => {
        cy.saveLocalStorage();
    });
    
    it('login', () => {
        cy.visit('/admin/reports/recipe-cards');
        cy.get('#email').type(userName);
        cy.get('#password').type(userPassword);
        cy.get('[type="submit"]').click();
    })

    it('choice brand', () => {
        cy.get('.css-1hwfws3').eq(0).click();
        cy.get("#react-select-2-option-0").click();
    })

    it('choice paramarks', () => {
        cy.get('.css-1hwfws3').eq(1).click();
        cy.get("#react-select-3-option-0").click();
        cy.get('body').click('right');
    })

    it('choice start day', () => {
        cy.wait(1000);
        cy.get('.rdt').eq(0).click();
        cy.get('.rdtDays>table>tbody>tr>td').not('.rdtOld').contains(actualDay).click()
    })
    it('change month', () => {
        console.log(endDateCreateReport)
        if (endDateCreateReport > 31) {
            cy.get('.rdt').eq(1).click();
            cy.get('.rdtNext').eq(1).click();
            endDateCreateReport = endDateCreateReport - actualDay
        }
    })
    it('choice end day', () => {
        cy.get('.rdt').eq(1).click();
        cy.get(`:nth-child(6) > .jss528 > .rdt > .rdtPicker > .rdtDays > table > tbody > tr > [data-value="${endDateCreateReport}"]`).not('.rdtOld').not('.rdtNew').click()
    })

    it('generate report', () => {
        cy.get('button[tabindex="0"][type=button]').contains('PDF').click();
    })

    it('verify download file', () => {
        cy.task('getDownload').then(fileName => {
            console.log('Downloaded file:', fileName);
        });

    })

    it('test',()=>{
        // cy.verifyDownload('1xKarty-przepisów-2022-05-30-2022-06-04_(2022-05-17_11.27).pdf');



        const path = require("path");
    //    let fileNames = "1xKarty-przepisów-2022-05-30-2022-06-04_(2022-05-17_11.27).pdf";

   const downloadsFolder = "cypress/downloads/";
   cy.readFile(path.join(downloadsFolder + fileName)).should("exist");

    })




})