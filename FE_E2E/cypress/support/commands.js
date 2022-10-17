// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//https://blog.mimacom.com/e2e-tests-with-cypress/

Cypress.Commands.add('login', () => {
  cy.visit('https://qa.yesaccount.com/login')

  cy.xpath('/html/body/fiducial-root/fiducial-erp-login/div/div/p-card/div/div/div/fiducial-erp-login-form/form/div[1]/fiducial-input/div/input')
    .type('fiducial@fiducial.net');

  cy.xpath('/html/body/fiducial-root/fiducial-erp-login/div/div/p-card/div/div/div/fiducial-erp-login-form/form/fiducial-input/div/input')
    .type('1234');

  cy.xpath('/html/body/fiducial-root/fiducial-erp-login/div/div/p-card/div/div/div/fiducial-erp-login-form/form/div[2]/button')
    .click();

})

Cypress.Commands.add('expandAndOpenTab', (index, confirm) => {
  let expand = cy.xpath('(//fiducial-status-card-expandable//div)[' + index + ']');
  expand.click();
  cy.get('fiducial-status-card-expandable-item div span')
    .each((element) => {
      cy.get(element).click();
      cy.get(confirm).click();
      expand.click();
    })
})

Cypress.Commands.add('accessMenu', (menuItem) => {
  cy.get("ul li a span").contains(menuItem).click();
})

Cypress.Commands.add('login', (data) => {
  cy.visit('/')
  cy.get("input[type='text']").type(data.credential.email)
  cy.get("input[type='password']").type(data.credential.password)
  cy.get("button[type='submit']").click()
  return cy.get("div[class^='companies'] button span");
})








