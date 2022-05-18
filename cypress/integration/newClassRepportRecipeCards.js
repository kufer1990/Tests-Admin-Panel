/// <reference types="cypress" />

const userName = "test@wp.pl";
const userPassword = "Test1234@";
let actualDay = new Date().getDate();
// let actualDay = 30;
let endDateCreateReport = actualDay + 1

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
        cy.get('.input-select--brand').click();
        cy.get("#react-select-2-option-0").click();

    })

    it('choice paramarks', () => {
        cy.get('.input-select--subbrand').click();
        cy.get("#react-select-3-option-0").click();
        cy.get('body').click('right');
    })

    it('choice start day', () => {
        cy.get('.input-datetime--date-from').click();
        cy.get('.input-datetime--date-from>.rdtPicker>.rdtDays>table>tbody>tr>td').not('.rdtOld').contains(actualDay).click()
    })

    it('change month', () => {
        console.log(endDateCreateReport)
        if (endDateCreateReport > 31) {
            cy.get('.input-datetime--date-to').click();
            cy.get('.input-datetime--date-to > .rdtPicker > .rdtDays > table > thead > :nth-child(1) > .rdtNext > span').click();
            endDateCreateReport = endDateCreateReport - actualDay
        }
    })
    it('choice end day', () => {
        cy.get('.input-datetime--date-to').click();
        cy.get(`.input-datetime--date-to > .rdtPicker > .rdtDays > table > tbody > tr > [data-value="${endDateCreateReport}"]`).not('.rdtOld').not('.rdtNew').click()
    })

    it('generate report', () => {
        cy.get('.btn--generate-pdf').click();
    })

    it('verify download file', () => {
        cy.task('getDownload').then(fileName => {
            console.log('Downloaded file:', fileName);
            const path = require("path");
            const downloadsFolder = "cypress/downloads/";
            cy.readFile(path.join(downloadsFolder + fileName)).should("exist");

        });

    })

})


// function getFileSize(url)
// {
//     var fileSize = '';
//     var http = new XMLHttpRequest();
//     http.open('HEAD', url, false); // false = Synchronous

//     http.send(null); // it will stop here until this http request is complete

//     // when we are here, we already have a response, b/c we used Synchronous XHR

//     if (http.status === 200) {
//         fileSize = http.getResponseHeader('content-length');
//         console.log('fileSize = ' + fileSize);
//     }


//     return fileSize;
// }

// // getFileSize()