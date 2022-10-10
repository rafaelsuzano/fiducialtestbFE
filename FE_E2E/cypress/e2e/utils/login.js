import loginPage from "../../pages/loginPage2";
import dashboardPage from "../../pages/DashboardPage";

Cypress.Commands.add('login', (data) => {
    cy.visit('/')
    loginPage.usernameInput().type(data.username)
    loginPage.passwordInput().type(data.password)
    loginPage.loginBtn().click()
    dashboardPage.fiducialConsulting().contains(data.loginPassed)
})