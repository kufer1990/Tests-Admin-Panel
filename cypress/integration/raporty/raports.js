/// <reference types="cypress" />

const userName = "jakub.ferdek@caterings.pl";
const userPassword = "Ut3pa8c2@";
let brandName = "Hot Dog DEV1";
let zoneCategory = "Zaznacz wszystkie" //Zaznacz wszystkie / Warszawa2 / Reszta Polski
let calendarDate = 15;
// const monthArray = [`styczeń ${year}`,`luty ${year}`,`marzec ${year}`,`kwiecień ${year}`,`maj ${year}`,`czerwiec ${year}`,`lipiec ${year}`,`sierpień ${year}`,`listopad ${year}`,`grudzień ${year}`,`styczeń ${year}`,`styczeń ${year}`]


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



        cy.contains('label', 'Wybierz datę').parent('div').find('div').eq(1).click();
        cy.contains('15').click()

        // cy.wait(5000);
        cy.get('button').contains('Generuj PDF').click()
        // cy.get('button').contains('Generuj excel (XLSX)').click()

        // cy.verifyDownload('.pdf', {
        //     contains: true
        // });

    // })

    // it.only('time', () => {
        // cy.verifyDownload('.pdf', { contains: true });
        const year = new Date().getFullYear()
        const month = new Date().getMonth() +1
        const days = new Date().getDate()
        const hour = new Date().getHours()
        const minutes= new Date().getMinutes()

        // jeżeli miesiąc jest mniejszy niż 10 to dodaje 0
        if (month < 10) {
            //  jeżeli dzień miesiąca jest mniejszy niż 10 to dodaje zero
            if (days < 10) {
                cy.verifyDownload(`Naklejki_na_dania-${year}-0${month}-0${calendarDate}_(${year}-0${month}-0${days}_${hour}.${minutes}).pdf`)
            } else {
                cy.verifyDownload(`Naklejki_na_dania-${year}-0${month}-${calendarDate}_(${year}-0${month}-${days}_${hour}.${minutes}).pdf`)
            }
        } else {
            // jeżeli miesiąc to listopad lub grudzień
            if (days < 10) {
                cy.verifyDownload(`Naklejki_na_dania-${year}-${month}-0${calendarDate}_(${year}-${month}-0${days}_${hour}.${minutes}).pdf`)
            } else {
                cy.verifyDownload(`Naklejki_na_dania-${year}-${month}-${calendarDate}_(${year}-${month}-${days}_${hour}.${minutes}).pdf`)
            }
        }

  
        // cy.verifyDownload('Naklejki_na_dania-2022-05-15_(2022-05-13_12.44).pdf');
    })
})