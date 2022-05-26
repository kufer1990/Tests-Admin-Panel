let firstName = "testtttt";
let lastName = "tertertert";
let phone = "665484230";
let role = "Raporty Testy Automatyczne"; // nazwa roli
let brand = "Hot Dog DEV1"; // nazwa marki
let userEmail = "test@wp.pl";
let password = "Test1234@";
// let urlAdress = 'https://admin.dev.caterings.nidev.pl/admin/recipes?selectedBrand=1';

describe("new person", () => {
  it("login admin panel", () => {
    cy.visit("/admin/recipes?selectedBrand=1");
    cy.get("#email").type("jakub.ferdek@caterings.pl");
    cy.get("#password").type("Ut3pa8c2@");
    cy.get("button[type=submit]").click();
  });

  it("add preson", () => {
    cy.get("div").contains("Moja firma").click();
    cy.get("div").contains("Pracownicy").click();
    cy.get("button").contains("Dodaj pracownika+").click();
    cy.get("input[name=firstName").type(firstName);
    cy.get("input[name=lastName").type(lastName);
    cy.get("input[type=tel").type(phone);
    cy.get("#select-selectedRoles").click();
    cy.get("li").contains(role).click();
    cy.get("body").click("right");
    cy.get("#select-selectedBrands").click();
    cy.get("li").contains(brand).click();
    cy.get("body").click("right");
    cy.get("input[name=email").type(userEmail);

    cy.get("input[name=plainPassword").type(password);
    cy.get("input[name=plainPasswordMatch").type(password);
    cy.get("button").contains("Zapisz").click();
  });
});

let test = document.querySelector("#select-selectedRoles");
console.log(test);
