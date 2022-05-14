/// <reference types="cypress" />

const userName = "test@wp.pl";
const userPassword = "Test1234@";
let brandName = "Hot Dog DEV1";
let zoneCategory = "Zaznacz wszystkie" //Zaznacz wszystkie / Warszawa2 / Reszta Polski
let calendarDate = 11;

describe('create raports stickers on dish', () => {
    it('login', () => {
        cy.visit('/');
        cy.get('#email').type(userName);
        cy.get('#password').type(userPassword);
        cy.get('[type="submit"]').click();

        //przejście do raportów
        cy.contains('div', 'Raporty').click();
        cy.contains('div', 'Naklejki na dania').click();
        //choice brands
        cy.contains('label', 'Wybierz marki').parent('div').find('div').eq(1).click();
        cy.contains('label', brandName).click();
        cy.get('body').click('right');

        //choice zone category
        cy.contains('label', 'Wybierz kategorie stref').parent('div').find('div').eq(1).click();
        cy.contains('label', zoneCategory).click();
        cy.get('body').click('right');

        // show Calendar
        cy.contains('label', 'Wybierz datę').parent('div').find('div').eq(1).click();
        // choice day in actual month
     cy.get('.rdtDays>table>tbody>tr>td').not('.rdtOld').contains(calendarDate).click()
       
    //  generate pdf
        cy.get('button').contains('Generuj PDF').click()


// create file name 
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        let days = new Date().getDate();
        let hour = new Date().getHours();
        let newMinutes = new Date().getMinutes();
        let seccond = new Date().getSeconds();
        let minutes;

        if(newMinutes<10){
            minutes = "0" + newMinutes;
        }else {
            minutes = newMinutes;
        }

        if (seccond >= 50) {
            minutes++;
            cy.log(minutes)
        }


        // //jeszcze if jeżeli minuty są mniejsze niż 10
        // // jeżeli miesiąc jest mniejszy niż 10 to dodaje 0
        if (month < 10) {
            //  jeżeli dzień miesiąca jest mniejszy niż 10 to dodaje zero
            if (days < 10) {
                if (calendarDate < 10) {
                    cy.verifyDownload(`Naklejki_na_dania-${year}-0${month}-0${calendarDate}_(${year}-0${month}-0${days}_${hour}.${minutes}).pdf`)
                } else {
                    cy.verifyDownload(`Naklejki_na_dania-${year}-0${month}-${calendarDate}_(${year}-0${month}-0${days}_${hour}.${minutes}).pdf`)
                }
            } else {
                if (calendarDate < 10) {
                    cy.verifyDownload(`Naklejki_na_dania-${year}-0${month}-0${calendarDate}_(${year}-0${month}-${days}_${hour}.${minutes}).pdf`)
                } else {
                    cy.verifyDownload(`Naklejki_na_dania-${year}-0${month}-${calendarDate}_(${year}-0${month}-${days}_${hour}.${minutes}).pdf`)
                }
            }
        } else {
            // jeżeli miesiąc to listopad lub grudzień
            if (days < 10) {
                if (calendarDate < 10) {
                    cy.verifyDownload(`Naklejki_na_dania-${year}-${month}-0${calendarDate}_(${year}-${month}-0${days}_${hour}.${minutes}).pdf`)
                } else {
                    cy.verifyDownload(`Naklejki_na_dania-${year}-${month}-${calendarDate}_(${year}-${month}-0${days}_${hour}.${minutes}).pdf`)
                }
            } else {
                if (calendarDate < 10) {
                    cy.verifyDownload(`Naklejki_na_dania-${year}-${month}-0${calendarDate}_(${year}-${month}-${days}_${hour}.${minutes}).pdf`)
                } else {
                    cy.verifyDownload(`Naklejki_na_dania-${year}-${month}-${calendarDate}_(${year}-${month}-${days}_${hour}.${minutes}).pdf`)
                }
            }
        }

          cy.get('button').contains('Generuj excel (XLSX)').click()
        if (month < 10) {
            //  jeżeli dzień miesiąca jest mniejszy niż 10 to dodaje zero
            if (days < 10) {
                if (calendarDate < 10) {
                    cy.verifyDownload(`Naklejki_na_dania-${year}-0${month}-0${calendarDate}_(${year}-0${month}-0${days}_${hour}.${minutes}).xlsx`)
                } else {
                    cy.verifyDownload(`Naklejki_na_dania-${year}-0${month}-${calendarDate}_(${year}-0${month}-0${days}_${hour}.${minutes}).xlsx`)
                }
            } else {
                if (calendarDate < 10) {
                    cy.verifyDownload(`Naklejki_na_dania-${year}-0${month}-0${calendarDate}_(${year}-0${month}-${days}_${hour}.${minutes}).xlsx`)
                } else {
                    cy.verifyDownload(`Naklejki_na_dania-${year}-0${month}-${calendarDate}_(${year}-0${month}-${days}_${hour}.${minutes}).xlsx`)
                }
            }
        } else {
            // jeżeli miesiąc to listopad lub grudzień
            if (days < 10) {
                if (calendarDate < 10) {
                    cy.verifyDownload(`Naklejki_na_dania-${year}-${month}-0${calendarDate}_(${year}-${month}-0${days}_${hour}.${minutes}).xlsx`)
                } else {
                    cy.verifyDownload(`Naklejki_na_dania-${year}-${month}-${calendarDate}_(${year}-${month}-0${days}_${hour}.${minutes}).xlsx`)
                }
            } else {
                if (calendarDate < 10) {
                    cy.verifyDownload(`Naklejki_na_dania-${year}-${month}-0${calendarDate}_(${year}-${month}-${days}_${hour}.${minutes}).xlsx`)
                } else {
                    cy.verifyDownload(`Naklejki_na_dania-${year}-${month}-${calendarDate}_(${year}-${month}-${days}_${hour}.${minutes}).xlsx`)
                }
            }
        }

    })
})